const dotenv = require('dotenv');
dotenv.config();
const { createLogger } = require('../init/logger');


let logger;
(async () => {
    try {
        logger = await createLogger();
    } catch (error) {
        console.error('Failed to initialize logger:', error);
        process.exit(1);
    }
})();


class FileEmbedding {
    constructor(dbConnection) {
        this.dbConnection = dbConnection
    }

    async createFileEmbeddingMap(fileId, embeddingIds) {
        if (!embeddingIds || embeddingIds.length === 0) {
            return;
        }

        return this.dbConnection.transaction(async (trx) => {

            const rows = embeddingIds.map(embeddingId => ({
                fileId,
                embeddingId
            }));

            await trx('file_embedding').insert(rows);
        });
    }    

    async getFileEmbedding(fileId) {
        try {
            return await this.dbConnection('file_embedding')
                .select("embeddingId")
                .where({ fileId });
        } catch (error) {
            logger?.error("Failed to fetch file embeddings:", error);
            throw error;
        }
    }

    deleteFileEmbeddingMap(fileId) {
        return new Promise((resolve, reject) => {
            this.dbConnection('file_embedding')
            .delete()
                .where({
                    fileId
                })
                .then((id) => {
                    resolve(id)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
}

module.exports = FileEmbedding
