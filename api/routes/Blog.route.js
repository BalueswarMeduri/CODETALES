import express from "express";
import {
  addBlog,
  deleteBlog,
  ShowAllBlog,
  editBlog,
  getBlog,
  getRelatedBlog,
  getBlogByCategory,
  search,
} from "../controllers/Blogcontroller.js";
import upload from "../config/multer.js";
import { authenticate } from "../middleware/authenticate.js";

const BlogRoute = express.Router();

BlogRoute.post("/add", authenticate, upload.single("file"), addBlog);
BlogRoute.put("/update/:blogid",authenticate, upload.single("file"), editBlog);
BlogRoute.delete("/delete/:blogid",authenticate, deleteBlog);
BlogRoute.get("/get-all", ShowAllBlog);

BlogRoute.get("/get-blog/:slug", getBlog);
BlogRoute.get("/get-related-blog/:category", getRelatedBlog);
BlogRoute.get("/get-blog-by-category/:category", getBlogByCategory);
BlogRoute.get("/search", search);


export default BlogRoute;
