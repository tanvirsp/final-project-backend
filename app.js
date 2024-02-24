const express = require('express');
const app = express();

const router = require("./src/routes/api");

const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize');
const { rateLimit } = require('express-rate-limit')
const helmet = require('helmet');
const hpp = require('hpp');


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	
})


//Security Middleware
app.use(limiter)
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: "http://localhost:5173" , credentials: true}))
app.use(mongoSanitize())
app.use(helmet())
app.use(hpp())






app.use("/api/v1", router);



//Root Rought
app.get("/", (req, res) =>{
    res.send("Full Stack App Server is Running")
})






//Undefined Route
app.use("*", (req, res) =>{
	res.status(404).json({status: "fail", data: "Page Not Found"})
});




module.exports = app;