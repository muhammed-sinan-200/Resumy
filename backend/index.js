const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connection = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const resumeRoutes = require("./routes/resumeRoutes");


const app = express();

dotenv.config()
app.use(express.json())
app.use(cors())


const port = process.env.PORT   
connection()

app.use('/user',userRoutes);
app.use('/resume',resumeRoutes)
app.use('/uploads',express.static("uploads"))




app.listen(port,()=>console.log(`Server running on ${port}`)
)



