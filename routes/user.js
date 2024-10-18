const { Router } = require("express");
const { z } = require('zod');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "iubwevsiupfbuipbwfqweqewgf"


const userRouter = Router();
const { userModel } = require("../database/db")

userRouter.post("/signup", async (req, res) => {
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string().min(3).max(10),
        firstName: z.string().min(5).max(20),
        lastName: z.string().min(4).max(10)
    });

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);
    if (!parsedDataWithSuccess.success) {
        return res.status(400).json({
            message: "Incorrect Format",
            err: parsedDataWithSuccess.error
        })
    }
    const { email, password, firstName, lastName } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName

        });
        return res.status(200).json({
            message: "User Created Successfully",
            "user": newUser
        })

    } catch (error) {
        res.status(502).json({
            "Error In Signing Up": error.message
        })
    }
});


userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({
        email
    });
    if (!user) {
        console.log("User Not Found");
        return res.json({
            message: "User Not Found"
        })
    };
    try {
        const comparedPassword = await bcrypt.compare(password, user.password);
        if(!comparedPassword){
            console.warn("Incorrect Password Attempt")
        }
        if (comparedPassword) {
            const token = jwt.sign({
                email
            }, JWT_SECRET);
            console.log("User Successfully Signed In");
            return res.status(200).json({
                message: "SignIn Successull",
                token: token
            })
           
        }else{
            res.json({
                message:"Incorrect Password"
            })
        }
       
    } catch (error) {
        console.log("Error In SigningIn :" + error);
        return res.json({
            message: error.message
        })
    }
});

userRouter.get("/purchases", (req, res) => {
    res.json({
        purchse: "page"
    })
})


userRouter.get("/user/purchases", (req, res) => {
    res.json({
        message: "Signin Page"
    })
});


module.exports = userRouter