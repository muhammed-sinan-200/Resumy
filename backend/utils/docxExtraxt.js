const fs = require("fs");
const mammoth = require("mammoth");

const extractTextFromDOCX = async (filePath)=>{
    const fileBuffer = fs.readFileSync(filePath);
    const {value} = await mammoth.extractRawText({buffer:fileBuffer});
    return value;
} 
module.exports = { extractTextFromDOCX };