const { Router } = require("express");

const courseRouter = Router();
const { courses } = require("../database/db")


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


courseRouter.get("/preview",auth, (req, res) => {
    res.json({
        message: "Corse Page"
    })
});
courseRouter.get("/purchase",auth, (req, res) => {
    res.json({
        message: "Purchases Page"
    })
});




module.exports = courseRouter
