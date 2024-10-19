const jwt  = require("jsonwebtoken");
const JWT_ADMIN_SECRET= "iuqvbeiubivubpqbquiedfbpiubn"

function adminMiddleware(req,res,next){
    const token = req.headers.token;
    if(!token){
        return res.json({
            message:"Token Is Required !"
        })
    }
    try {
        const decodedData = jwt.verify(token,JWT_ADMIN_SECRET)
        req.adminId = decodedData.id;
    } catch (error) {
        res.json({
            message:error
        })
    }
   
}

module.exports =  adminMiddleware