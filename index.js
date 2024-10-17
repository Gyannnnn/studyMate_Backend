const express  = require('express');
const app = express();
const mongoose  = require('mongoose');
const jwt = require('jsonwebtoken');

const userRouter = require("./routes/user");
const courseRouter = require("./routes/courses");
const adminRouter = require("./routes/admin")

app.use(express.json());

const db =  mongoose.connect("mongodb+srv://higyanaranjanpatra:db123@cluster0.2svfp.mongodb.net/studyMate");
db.then(()=>{
    console.log("Successfully connected to DB")
})



app.use("/api/v1/course",courseRouter)
app.use("/api/v1/user",userRouter)
app.use("/api/v1/admin",adminRouter)




app.listen(3000,()=>{
    console.log("Server Is Running At http://localhost:3000")
})