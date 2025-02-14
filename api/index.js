import express from "express"
import dotenv from 'dotenv'
import cookieParser  from "cookie-parser";
import cors from 'cors'
import mongoose from "mongoose";
import AuthRoute from "./routes/Authroute.js";
import UserRoute from "./routes/User.route.js";
import CategoryRoute from "./routes/Categoryroute.js";
import BlogRoute from "./routes/Blog.route.js";
import CommentRoute from "./routes/Comment.route.js";
import BlogLikeRoute from "./routes/BloglikeRoute.js";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials: true
}))


app.use('/api/auth',AuthRoute)
app.use('/api/user',UserRoute)
app.use('/api/category',CategoryRoute)
app.use('/api/blog',BlogRoute)
app.use('/api/comment',CommentRoute)
app.use('/api/blog-like',BlogLikeRoute)


mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongodb is connected !!!");
})
.catch(()=>{
    console.log("mongodb is not connected");   
})


app.listen(PORT,()=>{
    console.log("server is runing on port:",PORT);
})


app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500
    const message = err.message || "internal server error"
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})