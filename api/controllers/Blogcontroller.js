import cloudinary from '../config/cloudinary.js'; // Ensure correct relative path
import Blog from "../models/blog.model.js"
import {encode} from 'entities'
import Category from '../models/category.model.js'
export const addBlog = async (req, res, next) => {
    try {
      const data = JSON.parse(req.body.data);
      let featuredImage = "";
  
      if (req.file) {
        const uploadResult = await cloudinary.uploader
          .upload(req.file.path, { folder: "codetales", resource_type: "auto" })
          .catch((error) => {
            console.error("Cloudinary Upload Error:", error);
            return null;
          });
  
        if (!uploadResult) {
          return res.status(500).json({ success: false, message: "Image upload failed" });
        }
  
        featuredImage = uploadResult.secure_url;
      }
  
      const blog = new Blog({
        author: data.author,
        category: data.category,
        title: data.title,
        slug: data.slug,
        featuredImage: featuredImage,
        blogContent: encode(data.blogContent),
      });
  
      await blog.save();
      res.status(201).json({
        success: true,
        message: "Blog added successfully",
      });
    } catch (error) {
      console.error("Error adding blog:", error);
      next(error);
    }
  };
  export const editBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params
        const blog = await Blog.findById(blogid).populate('category', 'name')
        if (!blog) {
            next(confirm.log('Data not found.'))
        }
        res.status(200).json({
            blog
        })
    } catch (error) {
        next(confirm.log(500, error.message))
    }
}

export const updatBlog = async(req, res, next)=>{
    try {
        
    } catch (error) {
        next(console.log(error))
    }
}

export const deleteBlog = async (req, res, next) => {
  try {
    const { blogid } = req.params;

    const blog = await Blog.findByIdAndDelete(blogid); // Fixed variable name
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ success: false, message: "Server error while deleting blog" });
  }
};


export const ShowAllBlog = async(req, res, next)=>{
    try {
        const blog = await Blog.find().populate('author', 'name avatar role').populate('category','name slug').sort({
          createdAt: -1}).lean().exec()
        res.status(200).json({
          blog
        })
    } catch (error) {
        next(console.log(error))
    }
}

export const getBlog = async(req, res,next)=>{
  try {
    const {slug}= req.params
    const blog = await Blog.findOne({slug}).populate('author', 'name avatar role').populate('category','name slug').lean().exec()
    res.status(200).json({
      blog
    })
    
} catch (error) {
    next(console.log(error))
}
}

export const getRelatedBlog = async (req, res, next) => {
  try {
    const { category } = req.params;
    const categoryData = await Category.findOne({ slug: category });

    if (!categoryData) {
      return res.status(404).json({ message: "Category not found" });
    }

    const categoryId = categoryData._id;
    const blogs = await Blog.find({ category: categoryId }).lean().exec();

    res.status(200).json({ blogs });

  } catch (error) {
    console.error(error);
    next(error);
  }
};


export const getBlogByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const categoryData = await Category.findOne({ slug: category });

    if (!categoryData) {
      return res.status(404).json({ message: "Category not found" });
    }

    const categoryId = categoryData._id;
    const blogs = await Blog.find({ category: categoryId }).populate('author', 'name avatar role').populate('category','name slug').lean().exec();

    res.status(200).json({ blogs: blogs || [], categoryData }); // Always return an array

  } catch (error) {
    console.error(error);
    next(error);
  }
};


export const search = async (req, res, next) => {
  try {
    const { q } = req.query;
    const blogs = await Blog.find({ title:{$regex: q, $options:'i'}}).populate('author', 'name avatar role').populate('category','name slug').lean().exec();

    res.status(200).json({ blogs: blogs || [] }); // Always return an array

  } catch (error) {
    console.error(error);
    next(error);
  }
};

