const {Router} = require("express");

const userRouter = Router();

userRouter.post("/signup",(req,res)=>{
    res.json({
        message:"Signup Page"
    })
});


userRouter.post("/signin",(req,res)=>{
    res.json({
        message:"Signin Page"
    })
});

userRouter.get("/purchases",(req,res)=>{
    res.json({
        purchse:"page"
    })
})


userRouter.get("/user/purchases",(req,res)=>{
    res.json({
        message:"Signin Page"
    })
});


module.exports = userRouter