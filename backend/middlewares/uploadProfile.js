const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/profile"); // new folder inside upload
    },
    filename: (req, file, cb) => {
        const name = Date.now() + "_" + file.originalname.replace(/\s+/g, "_");
        cb(null, name);
    }
});


const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg"  ||
        file.mimetype === "image/png"  ||
        file.mimetype === "image/webp"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};


const uploadProfile = multer({
    storage,
    fileFilter,
});

module.exports = { uploadProfile };
