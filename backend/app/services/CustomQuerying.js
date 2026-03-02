const Chat = require('./Chat')
const dotenv = require('dotenv');
const { getAdminSetting } = require('../init/redisUtils')
const { GoogleGenAI } = require("@google/genai");
const { BigQuery } = require("@google-cloud/bigquery");
const { createLogger } = require('../init/logger');


dotenv.config();

const projectId = process.env.GOOGLE_PROJECT_ID;
const bigqueryLocation = process.env.BIGQUERY_LOCATION;
const datasetId =process.env.BIGQUERY_DATASET_ID;
const aiModelId = process.env.BIGQUERY_AI_MODEL_ID;
const tableId = process.env.BIGQUERY_TABLE;

const genAI = new GoogleGenAI({
  vertexai: true,
  project: projectId,   
  location: bigqueryLocation,     
});
const bigquery = new BigQuery();

let logger;

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER_NAME,
        password: process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : '',
        database: process.env.DATABASE_NAME,
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci'
    }
});

class CustomQuerying {

    constructor(dbConnection) {
        this.dbConnection = dbConnection
    }

    async storeUsedToken(chatId, token) {
        return new Promise((resolve, reject) => {
            const dateTime = new Date()
            this.dbConnection("tokens_used")
                .insert({
                    chatId,
                    token,
                    created: dateTime
                })
                .then((tokenId) => {
                    resolve(tokenId[0])
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    async isFlaggedContent(userQuery) {
        if (!logger) {
            logger = await createLogger();
        }

        const sqlQuery = `
        SELECT *
        FROM ML.GENERATE_TEXT(
          MODEL \`${datasetId}.${aiModelId}\`,
          (
            SELECT
              CONCAT(
                "Please classify the following text for policy violations. Respond ONLY with valid JSON in this format: { \\"flagged\\": true } or { \\"flagged\\": false }.\\n\\nText: ",
                @userQuery
              ) AS prompt
          ),
          STRUCT(
            0.0 AS temperature,
            256 AS max_output_tokens,
            FALSE AS flatten_json_output
          )
        )
        `;

        logger.info("Checking if the content is flagged under BigQuery policy");

        try {
            const [job] = await bigquery.createQueryJob({
                query: sqlQuery,
                location: process.env.BIGQUERY_LOCATION,
                params: { userQuery },
            });

            const [rows] = await job.getQueryResults();

            if (!rows || rows.length === 0 || !rows[0].ml_generate_text_result) {
                throw new Error("Moderation model returned no result");
            }

            const mlResult = JSON.parse(rows[0].ml_generate_text_result);

            const candidates = mlResult.candidates || [];

            if (
                !candidates.length ||
                !candidates[0].content ||
                !candidates[0].content.parts ||
                !candidates[0].content.parts.length
            ) {
                throw new Error("Moderation model returned malformed output");
            }

            let resultText = candidates[0].content.parts[0].text
                .replace(/^```json\s*/, "")
                .replace(/\s*```$/, "")
                .trim();

            let parsed;

            try {
                parsed = JSON.parse(resultText);
            } catch {
                throw new Error("Failed to parse moderation JSON output");
            }

            if (typeof parsed.flagged !== "boolean") {
                throw new Error("Moderation response missing 'flagged' boolean");
            }

            return parsed.flagged;

        } catch (error) {
            logger.error("Moderation check failed:", error);

            throw new Error("Content moderation service unavailable");
        }
    }

    async getRelevantDocs(userQuery, namespace, fileIds) {
    try {
      const embeddingResponse = await genAI.models.embedContent({
        model: "text-embedding-004",
        contents: [{ parts: [{ text: userQuery }] }],
      });
      const queryEmbedding = embeddingResponse.embeddings[0].values;

      let  topK = parseInt(await getAdminSetting("NO_OF_CITATIONS") );

      let fileFilter = "";
      if (!(fileIds.length === 1 && fileIds[0] === "team")) {
        const fileIdsStr = fileIds.map((id) => `'${id}'`).join(",");
        fileFilter = `AND base.file_id IN (${fileIdsStr})`;
      }
      const sqlQuery = `
        SELECT *
        FROM VECTOR_SEARCH(
          TABLE \`${projectId}.${datasetId}.${tableId}\`,
          'embedding',
          (SELECT @queryEmbedding AS embedding),
          top_k => @topK
        ) AS vs
        WHERE base.namespace = @namespace
        ${fileFilter}
        LIMIT @topK
      `;

      const [rows] = await bigquery.query({
        query: sqlQuery,
        params: { namespace, queryEmbedding, topK },
      });

      const relevantDocs = rows.map((row) => ({
        pageContent: row.base.content,
        metadata: {
          docId: row.base.docid,
          fileId: row.base.file_id,
          namespace: row.base.namespace,
          similarity: row.distance,
        },
      }));

      return relevantDocs;
    } catch (err) {
      throw err;
    }
  }

    async fetchFilesWithinFolder(folderId, teamId) {
        const visited = new Set();
        const files = [];
        const queue = [{ id: folderId, teamId }];
        const MAX_DEPTH = 20;
        
        let depth = 0;
        let index = 0;
        
        try {
            while (index < queue.length) {
            
                if (depth > MAX_DEPTH) {
                    throw new Error("Folder nesting depth exceeded safe limit");
                }
            
                const currentLevelSize = queue.length - index;
            
                for (let i = 0; i < currentLevelSize; i++) {
                    const current = queue[index++]; // ✅ O(1)
                
                    if (visited.has(current.id)) continue;
                    visited.add(current.id);
                
                    const contents = await this.getChildFoldersAndFiles(
                        current.id,
                        current.teamId
                    );
                
                    for (const item of contents) {
                        if (item.type === "folder") {
                            if (!visited.has(item.id)) {
                                queue.push(item);
                            }
                        } else {
                            files.push(item);
                        }
                    }
                }
            
                depth++;
            }
        
            return files;
        
        } catch (error) {
            throw error;
        }
    }
    
    getChildFoldersAndFiles(parentId, teamId) {
        return new Promise((resolve, reject) => {
            this.dbConnection('documents')
                .select('*')
                .where({ parentId, teamId })
                .andWhere((qb) => {
                    qb.where({ isNotAnalyzed: false }).orWhereNull('isNotAnalyzed');
                })
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    console.log(err)
                    reject(err)
                })
        })
    }

    extractDocs(sourceDocs) {
        let docs = []
        sourceDocs.map((sourceDoc) => {
            docs.push(sourceDoc.pageContent)
        })
        return docs
    }

    buildPrompt(docs, question, pastMessages, answerFormat) {
        const prompt = `
        """
        Context section:
        ${docs.join("\n-\n")}
        """

        """
        Chat History:
        ${pastMessages.join(" \n")}
        """

        Question: ${question}
        `;

        return prompt
    }

    getPastMessages(chatId) {
        return new Promise((resolve, reject) => {
            const chat = new Chat(this.dbConnection)
            chat.getChatMessagesForAIQuery(chatId)
                .then((messages) => {
                    let pastMessages = []
                    for (const message of messages) {
                        if (message.role == 'user') {
                            pastMessages.push(`Human: ${message.message}`)
                        } else if (message.role == 'bot') {
                            pastMessages.push(`AI: ${message.message}`)
                        }
                    }
                    resolve(pastMessages)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }


    async queryIndexByCustomQuerying(query, namespace, chatId) {
        if (!logger) {
            logger = await createLogger();
        }

        logger.info(`Getting fileIds for scope`);

        const scope = await knex('chat_scope')
            .select("*")
            .where({ chatId });

        let fileIds = [];

        if (scope[0]) {
            if (scope[0].scope === 'team') {
                fileIds = await knex("documents")
                    .where({ teamId: scope[0].resourceId, type: "file" })
                    .pluck("id");
            } else if (scope[0].scope === 'file') {
                fileIds = [scope[0].resourceId];
            } else if (scope[0].scope === 'folder') {
                const filesWithinFolder = await this.fetchFilesWithinFolder(
                    scope[0].resourceId,
                    scope[0].teamId
                );
                fileIds = filesWithinFolder.map(file => file.id);
            }
        }

        logger.info(`Checking if the query is flagged`);

        if (await this.isFlaggedContent(query)) {
            logger.warn(`Query flagged under BigQuery policy`);
            return {
                result: "This question violates the BigQuery policy",
                sourceDocuments: []
            };
        }

        logger.info(`Fetching relevant docs for the query from vector database`);

        let relevantDocs = [];
        if (fileIds.length > 0) {
            fileIds = (fileIds || []).map(id => String(id));
            relevantDocs = await this.getRelevantDocs(query, namespace, fileIds);
        }

        logger.info(`Building prompt for BigQuery request with relevant context`);

        const context = this.extractDocs(relevantDocs);

        let conversationNumberToPass = await getAdminSetting("CONVERSATION_NUMBER_TO_PASS");
        let pastMessages = await this.getPastMessages(chatId);
        pastMessages = pastMessages.slice(-conversationNumberToPass);

        const isAnswerFormat = await getAdminSetting("FORMAT_CHAT_RESPONSE");
        const isQueryHaveFormat = /format/i.test(query);
        let answerFormat = "";

        if (isAnswerFormat == 1 && !isQueryHaveFormat) {
            answerFormat = await getAdminSetting("FORMAT_SUFFIX");
            logger.info(`Formatting answer as per instructions.`);
        }

        if (isAnswerFormat == 0 && !isQueryHaveFormat) {
            answerFormat = process.env.DEFAULT_CHAT_RESPONSE_FORMAT;
        }

        const prompt = this.buildPrompt(context, query, pastMessages, answerFormat);

        logger.info(`Prompt building success`);

        const settings = await knex("super-admin-settings")
            .select('meta_value')
            .where({ meta_key: "CHAT_OUTPUT_TOKEN" });

        const max_tokens = parseInt(settings[0]?.meta_value) || 2048;
        const sqlQuery = `
        DECLARE system_prompt STRING DEFAULT """
        Please format your response as a JSON object with the structure:
        {
          answer: "${answerFormat}",
          suggestedQuestions: [q1, q2, q3]
        }
        If the answer cannot be found in the data, write "I could not find an answer from the context."
        """;
            
        WITH context AS (
          SELECT COALESCE(
            STRING_AGG(content, "\\n"),
            "No relevant data available."
          ) AS aggregated_content
          FROM \`${datasetId}.${tableId}\`
          WHERE namespace = @namespace
          AND (
            ARRAY_LENGTH(@fileIds) = 0
            OR file_id IN UNNEST(@fileIds)
          )
        )
            
        SELECT *
        FROM ML.GENERATE_TEXT(
          MODEL \`${datasetId}.${aiModelId}\`,
          (
            SELECT CONCAT(
              (SELECT aggregated_content FROM context),
              "\\n", system_prompt,
              "\\nUser Question: ", @prompt
            ) AS prompt
          ),
          STRUCT(
            0.0 AS temperature,
            ${max_tokens} AS max_output_tokens,
            TRUE AS flatten_json_output
          )
        )
        `;

        const [job] = await bigquery.createQueryJob({
            query: sqlQuery,
            location: process.env.BIGQUERY_LOCATION,
            params: {
                namespace,
                fileIds: fileIds || [],
                prompt,
                answerFormat,
                max_tokens
            }
        });

        const [rows] = await job.getQueryResults();

        let responseText = rows[0]?.ml_generate_text_llm_result || "";

        responseText = responseText
            .replace(/^```json\s*/, "")
            .replace(/\s*```$/, "")
            .replace(/Default Format Suffix:.*$/s, "")
            .trim();

        let completions;

        try {
            completions = JSON.parse(responseText);
        } catch {
            completions = { raw: responseText };
        }

        const answer = completions.answer;
        const outputText = typeof answer === 'string' ? answer.toLowerCase() : '';
        const suggestedQuestions = completions.suggestedQuestions;

        const isGreeting = await this.checkGreetingByOutput(outputText);
        const NO_OF_CITATIONS = await getAdminSetting("NO_OF_CITATIONS");

        if (isGreeting) {
            return { result: outputText };
        }

        const stringsToCheck = (process.env.NO_CONTEXT_STRING || '')
        .split(',')
        .map(str => str.trim().toLowerCase());

        const isNoContextString = stringsToCheck.some(str =>
            outputText.includes(str)
        );

        if (isNoContextString) {
            logger.info("Don't have answer from context");
            return {
                result: outputText,
                suggestedQuestions
            };
        }

        if (NO_OF_CITATIONS == '0') {
            logger.info("Have answer from context (no citations)");
            return {
                result: outputText,
                suggestedQuestions
            };
        }

        logger.info("Have answer from context with citations");

        return {
            result: outputText,
            sourceDocuments: relevantDocs,
            suggestedQuestions
        };
    }

    async checkGreetingByOutput(output) {
      if (!logger) {
            logger = await createLogger();
        }
        const greetingStrings = process.env.GREETING_STRINGS.split(',').map(str => str.trim());
        const isGreeting = greetingStrings.some(str => output.includes(str));
        logger.info("Query have intent of greeting :-", isGreeting)
        return isGreeting
    }
}

module.exports = CustomQuerying