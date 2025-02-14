import express from "express";
import { doLike, likeCount } from "../controllers/BlogLIkeController.js";
import { authenticate } from "../middleware/authenticate.js";

const BlogLikeRoute = express.Router();

BlogLikeRoute.post("/do-like",authenticate, doLike);
BlogLikeRoute.get("/get-like/:blogid", likeCount);

export default BlogLikeRoute;
