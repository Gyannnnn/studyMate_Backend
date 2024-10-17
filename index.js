const express  = require('express');
const app = express();
const mongoose  = require('mongoose');
const jwt = require('jsonwebtoken');

app.use(express.json());

const db =  mongoose.connect("mongodb+srv://higyanaranjanpatra:db123@cluster0.2svfp.mongodb.net/");
db.then(()=>{
    console.log("Successfully connected to DB")
})

app.post("/user/signup",(req,res)=>{
    res.json({
        message:"Signup Page"
    })
});


app.post("/user/signin",(req,res)=>{
    res.json({
        message:"Signin Page"
    })
});

app.post("/course/purchase",(req,res)=>{
    res.json({
        purchse:"page"
    })
})


app.get("/user/purchases",(req,res)=>{
    res.json({
        message:"Signin Page"
    })
});


app.get("/courses",(req,res)=>{
    res.json({
        message:"Corse Page"
    })
});


app.listen(3000,()=>{
    console.log("Server Is Running At http://localhost:3000")
})