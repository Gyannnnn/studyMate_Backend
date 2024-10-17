const {Router} = require("express");

const courseRouter = Router();

courseRouter.get("/preview",(req,res)=>{
    res.json({
        message:"Corse Page"
    })
});
courseRouter.get("/purchase",(req,res)=>{
    res.json({
        message:"Purchases Page"
    })
});




module.exports = courseRouter
