const { Router } = require("express");
const {upload} = require("../middlewares/upload");
const {uploadResume} = require("../controllers/resumeController");

const router = Router();

router.post('/upload',upload.single("resume"),uploadResume);



module.exports = router