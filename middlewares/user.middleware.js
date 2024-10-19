const jwt  = require("jsonwebtoken");
const JWT_USER_SECRET="iubwevsiupfbuipbwfqweqewgf"

function userMiddleware(req,res,next){
    const token = req.headers.token;
    const decodedData = jwt.verify(JWT_USER_SECRET)
    if(decodedData){
        req.userId = decodedData.id;
        next();
    }else{
        res.json({
            message:"You Are Not Sined In"
        })
    }
}

module.exports =  userMiddleware
