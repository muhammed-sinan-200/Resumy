const { extractTextFromPdf } = require("../utils/pdfExtract");
const { extractTextFromDOCX } = require("../utils/docxExtraxt");
const { getFeedback } = require('../utils/openaiResponse');

const uploadResume = async (req, res, next) => {
    try {
        console.log('file recieved');
        
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded!" });
        }
        let resumeText = "";
        if (req.file.mimetype === "application/pdf") {
            console.log("extracting text from pdf");
            resumeText = await extractTextFromPdf(req.file.path);
        } else if (
            req.file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            console.log("extracting text from DOCX");
            resumeText = await extractTextFromDOCX(req.file.path);
        } else {
            return res.status(400).json({ message: "Unsupported file type!" });
        }
        console.log("📜 Extracted text length:", resumeText.length);
        const feedback = await getFeedback(resumeText);
        console.log("Got feedback from Gemini");
        
        res.status(200).json({
            status: true,
            message: "Resume uploaded successfully",
            filePath: req.file.path,
            text: feedback
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Something went wrong" });
    }
}
module.exports = { uploadResume }