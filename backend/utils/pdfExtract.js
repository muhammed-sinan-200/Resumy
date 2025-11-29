const fs = require("fs");
const pdfParse = require("pdf-parse");;


const extractTextFromPdf = async (filePath)=>{
    const fileBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(fileBuffer);
    return data.text;
}
module.exports = {extractTextFromPdf}