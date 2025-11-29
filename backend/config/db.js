const mongoose = require('mongoose')

const connection = ()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("DATA BASE ARE CONNECTED");
    })
}

module.exports =connection