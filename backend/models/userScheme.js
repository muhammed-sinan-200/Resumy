const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    profilePic:{
        type:String,
        default:""
    }
},{timestamps:true});

const Users = mongoose.model("UsersList",userScheme);
module.exports = Users;