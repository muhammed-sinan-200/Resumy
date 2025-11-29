const { Router } = require("express");
const { register, login, upProfile } = require("../controllers/userController");
const { uploadProfile } = require("../middlewares/uploadProfile");

const router = Router()

router.post('/register',uploadProfile.single('profilePic'),register)
router.post('/login',login)
router.put('/profile', uploadProfile.single('profilePic'), upProfile)


module.exports = router;
