const { Router } = require("express");

const courseRouter = Router();
const { courseModel } = require("../database/db");
const  adminMiddleware  = require("../middlewares/admin.middleware")


async function  auth(req,res,next){
    const token = req.headers.token;
    const decodedData   = jwt.verify(token,JWT_SECRET);

    if(decodedData){
        req.userId = decodedData.id;
        next()
    }else{
        return res.json({
            message:"Incorrect Credential"
        })
    }

}



courseRouter.get("/purchase",auth, (req, res) => {
    res.json({
        message: "Purchases Page"
    })
});




module.exports = courseRouter
