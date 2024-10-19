const jwt  = require("jsonwebtoken");


function userMiddleware(req,res,next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token,process.env.JWT_USER_SECRET)
    if(decodedData){
        req.userId = decodedData.id;
        next();
    }else{
        res.json({
            message:"You Are Not Sined In"
        })
    }
}

module.exports = {
    userMiddleware
}