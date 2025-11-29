const Users = require("../models/userScheme");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");


//user registration
const register = async (req, res, next) => {
    try {
        const { name, email, password, phone } = req.body;
        if (!email || !password || !name || !phone) {
            console.log("All fields are required!");
            return res.status(400).json({ message: "All fields are required!" });
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" })
        }
        const existingUser = await Users.findOne({ email })
        if (existingUser) {
            console.log("User already exists!");
            return res.status(400).json({ message: "User already exists!" })
        }
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new Users({
            name, email, password: hash, phone,
            profilePic: req.file ? req.file.filename : ""
        });
        const savedUser = await newUser.save();
        res.status(200).json({
            status: true,
            message: "success",
            data: savedUser
        })

    } catch (error) {
        console.log(error);

    }
}


//user login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        } else {
            const user = await Users.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ message: "Invalid email" })
            } else {
                const isPassword = await bcrypt.compare(req.body.password, user.password);
                if (!isPassword) {
                    return res.status(400).json({ message: "Wrong Password" });
                }
                const token = jsonwebtoken.sign(
                    { userId: user._id, userEmail: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRY }
                );
                res.status(200).json({
                    status: true,
                    message: "SUCCESS",
                    access_token: token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        phone:user.phone,
                        profilePic:user.profilePic
                    }
                })

            }
        }
    } catch (error) {
        console.log(error);

    }
}

//updateProfile
 
const upProfile = async (req,res,next)=>{
    try {
        const {id,name,phone} = req.body;
        if (!id) {
            console.log("User ID required");
        }

        let updatedFields = {name,phone};
        if (req.file) {
            updatedFields.profilePic = req.file.filename;
        }
        const updatedProfile = await Users.findByIdAndUpdate(id,updatedFields,{new:true})
        if (!updatedProfile) {
            console.log("user not found ");
        }
        return res.status(200).json({
            status:true,
            message:"profile updated!",
            data:updatedProfile
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports = { register, login,upProfile }