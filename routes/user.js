const { Router } = require("express");
const { z } = require('zod');
const bcrypt = require('bcrypt');


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


userRouter.post("/signin", (req, res) => {
    res.json({
        message: "Signin Page"
    })
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