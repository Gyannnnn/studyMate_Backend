const express  = require('express');
const app = express();
const mongoose  = require('mongoose');
const jwt = require('jsonwebtoken');

app.use(express.json());



app.post("/signup",(req,res)=>{
    res.json({
        message:"Signup Page"
    })
});


app.post("/signin",(req,res)=>{
    res.json({
        message:"Signin Page"
    })
});


app.post("/purchase",(req,res)=>{
    res.json({
        message:"Purchase Page"
    })
});




app.get("corse",(req,res)=>{
    res.json({
        message:"Corse Page"
    })
});


app.listen(3000,()=>{
    console.log("Server Is Running At http://localhost:3000")
})