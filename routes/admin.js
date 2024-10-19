const { Router } = require("express");
const { adminModel } = require("../database/db");
const { z } = require('zod');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const JWT_ADMIN_SECRET = "iuqvbeiubivubpqbquiedfbpiubn"
const adminRouter = Router();
const { courseModel } = require("../database/db");
const adminMiddleware = require("../middlewares/admin.middleware")

adminRouter.post("/signup", async (req, res) => {
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
        const newAdmin = await adminModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });
        return res.status(200).json({
            message: "Admin Created Successfully",
            "user": newAdmin
        })

    } catch (error) {
        res.status(502).json({
            "Error In Signing Up": error.message
        })
    }
});


adminRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({
        email
    });
    if (!admin) {
        console.log("Admin Not Found");
        return res.json({
            message: "Admin Not Found"
        })
    };
    try {
        const comparedPassword = await bcrypt.compare(password, admin.password);
        if (!comparedPassword) {
            console.warn("Incorrect Password Attempt")
        }
        if (comparedPassword) {
            const token = jwt.sign({
                id: admin._id.toString()
            }, JWT_ADMIN_SECRET);
            console.warn("Admin Successfully Signed In b");
            console.log(admin._id)
            return res.status(200).json({
                message: "Admin SignIn Successull",
                token: token
            })

        } else {
            res.json({
                message: "Incorrect Password"
            })
        }

    } catch (error) {
        console.log("Error In SigningIn :" + error);
        return res.json({
            message: error.message
        })
    }
});


adminRouter.post("/course", adminMiddleware, async (req, res) => {
    const adminId = req.adminId;
    const { title, description, price, imageUrl, createrId } = req.body
    const courses = await courseModel.create({
        title,
        description,
        price,
        imageUrl,
        createrId:adminId,
    })
    console.log(courses);
    res.json({
        message: "Corses Created Successfully"
    })
});

adminRouter.put("/course", (req, res) => {
    res.json({
        message: "course page"
    })
});

adminRouter.get("/bulk", (req, res) => {
    res.json({
        message: "course page"
    })
})


module.exports = adminRouter
