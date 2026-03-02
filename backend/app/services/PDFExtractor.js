const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const pdf = require('pdf-parse');
const { createWorker } = require('tesseract.js');
const pdfToPng = require('pdf-to-png-converter').pdfToPng;
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


class PDFExtractor {

    generateNumbersList(num) {
        let pageList = []
        for (let index = 1; index <= num; index++) {
            pageList.push(index)
        }
        return pageList
    }

    async getPageList(pdfPath) {

        try {
            logger.info(`Fetching page numbers for scanned PDF document`);

            const dataBuffer = await fsp.readFile(pdfPath);
            const data = await pdf(dataBuffer);

            return this.generateNumbersList(data.numpages);

        } catch (error) {
            logger.warn(`Failed to fetch page numbers`);
            throw error;
        }
    }

    async getConverterConfig(buffer, pageList) {
        const pngPage = await pdfToPng(buffer, {
            disableFontFace: false,
            useSystemFonts: false,
            pagesToProcess: pageList,
            viewportScale: 2.0
        });
        return pngPage;
    }
    async _checkAndCreateDirectory(directoryName, basePath, type) {
        logger.info(`Creating temporary ${type} folder for user Id ${directoryName}`);
        try {
            const folderPath = path.resolve(`${basePath}/${directoryName}`);
            await fsp.mkdir(folderPath, { recursive: true });
            logger.info(`Temporary ${type} folder ready`);
        } catch (error) {
            logger.warn(`Failed to create temporary ${type} folder`);
            logger.error(error);
            throw error;
        }
    }

    async checkIfImageDirectoryExist(directoryName) {
        return this._checkAndCreateDirectory(directoryName, process.env.TMP_IMAGE_PATH, 'image');
    }

    async checkIfTextDirectoryExist(directoryName) {
        return this._checkAndCreateDirectory(directoryName, process.env.TMP_TXT_PATH, 'text');
    }

    async convertPDFtoPNG(pdfPath, userId) {

        try {
            logger.info(`Converting PDF to PNG`);

            const buffer = await fsp.readFile(pdfPath);
            const pageList = await this.getPageList(pdfPath);
            const imgFileNameList = [];

            const res = await this.getConverterConfig(buffer, pageList);

            await this.checkIfImageDirectoryExist(userId);

            let index = 1;

            for (const imgData of res) {
                const filePath = `${process.env.TMP_IMAGE_PATH}/${userId}/tmp${index}.png`;

                await fsp.writeFile(filePath, imgData.content);
                imgFileNameList.push(`tmp${index}.png`);
                index++;
            }

            logger.info(`PDF converted to PNG successfully`);

            return imgFileNameList;

        } catch (err) {
            logger.warn(`Failed to convert PDF to PNG`);
            throw err;
        }
    }

    async extractTextFromPDF(pdfPath, userId) {

        logger.info(`Extracting text from PDF with OCR`);

        const extractedText = [];
        const imagePath = `${process.env.TMP_IMAGE_PATH}/${userId}`;
        const imageList = await this.convertPDFtoPNG(pdfPath, userId);

        const worker = await createWorker('eng');

        try {
            for (const imageName of imageList) {
                const response = await worker.recognize(
                    path.resolve(`${imagePath}/${imageName}`)
                );
                extractedText.push(response.data.text);
            }

            logger.info(`Text extracted successfully from PDF`);
            logger.info(JSON.stringify(extractedText));
            return extractedText;

        } catch (error) {
            logger.error(`OCR processing failed`, error);
            throw error;

        } finally {
            await worker.terminate();
            logger.info(`OCR worker terminated`);
        }
    }

    async removeLineBreak(text) {
        return text.replace(/\n/g, '')
    }

    async convertPDFToText(pdfPath, userId, fileName) {
        try {
            const extractedTexts = await this.extractTextFromPDF(pdfPath, userId);

            await this.checkIfTextDirectoryExist(userId);

            const outputPath = path.resolve(
                `${process.env.TMP_TXT_PATH}/${userId}/${fileName}.txt`
            );

            const cleanedTexts = await Promise.all(
                extractedTexts.map(text => this.removeLineBreak(text))
            );
            await fsp.writeFile(outputPath, cleanedTexts.join(''));

            return outputPath;

        } catch (error) {
        logger?.error(error);
        throw error;
        }
    }

    clearTempFiles(directoryName) {
        return new Promise((resolve, reject) => {
            const imgFolderPath = `${process.env.TMP_IMAGE_PATH}/${directoryName}`;
            const textFolderPath = `${process.env.TMP_TXT_PATH}/${directoryName}`;
    
            const deleteFiles = async (folderPath) => {
                try {
                    const files = await fsp.readdir(folderPath);
                    for (const file of files) {
                        await fsp.unlink(path.join(folderPath, file));
                    }
                    resolve(); 
                } catch (err) {
                    if (err.code === 'ENOENT') {
                        resolve();
                    } else {
                        reject(err); 
                    }
                }
            };
    
            deleteFiles(imgFolderPath)
                .then(() => {
                    return deleteFiles(textFolderPath);
                })
                .then(resolve) 
                .catch(reject); 
        });
    }  
}

module.exports = PDFExtractor