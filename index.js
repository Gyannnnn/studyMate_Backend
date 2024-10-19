require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userRouter = require("./routes/user");
const courseRouter = require("./routes/courses");
const adminRouter = require("./routes/admin")

app.use(express.json());





app.use("/api/v1/course", courseRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/admin", adminRouter)


async function db() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Successfully connected To The Db")
        app.listen(3000, () => {
            console.log("Server Is Running At http://localhost:3000")
        })

    } catch (error) {
        console.log("Error In Connecting Database :"+ error )
        return ({
            message: error
        })
    }
}

db();

