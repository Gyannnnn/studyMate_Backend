const { Router } = require("express");
const { admin } = require("../database/db");

 const adminRouter = Router();

adminRouter.post("/signup", (req, res) => {
    res.json({
        message: "Signup Page"
    })
});


adminRouter.post("/signin", (req, res) => {
    res.json({
        message: "Signin Page"
    })
});


adminRouter.post("/course", (req, res) => {
    res.json({
        message: "course page"
    })
})

adminRouter.put("/course", (req, res) => {
    res.json({
        message: "course page"
    })
});

adminRouter.get("/course/bulk", (req, res) => {
    res.json({
        message: "course page"
    })
})


module.exports = adminRouter
