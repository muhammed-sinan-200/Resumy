const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        let name = file.originalname.replace(/\s\s+/g, " ");
        name = name.replace(/[&\/\\#, +()$~%'":=*?<>{}@]/g, "_");
        cb(null, Date.now() + "_" + name);
    },
});

const fileFilterConfig = (req, file, cb) => {
    if (file.mimetype === "application/pdf" || file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF and DOCX files are allowed!"), false)
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: fileFilterConfig,
})
module.exports ={upload};