const jwt  = require("jsonwebtoken");


function adminMiddleware(req,res,next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token,process.env.JWT_USER_SECRET)
    if(decodedData){
        req.adminId = decodedData.id;
        next();
    }else{
        res.json({
            message:"You Are Not Sined In"
        })
    }
}

module.exports = {
    adminMiddleware
}