import BlogLike from "../models/blogLike.model.js";
import mongoose from "mongoose";

export const doLike = async (req, res, next) => {
    try {
        const { userid, blogid } = req.body;

        if (!userid || !blogid) {
            return res.status(400).json({ message: "User ID and Blog ID are required." });
        }

        let like = await BlogLike.findOne({ userid, blogid });

        if (!like) {
            const saveLike = new BlogLike({ userid, blogid });
            await saveLike.save();
        } else {
            await BlogLike.findByIdAndDelete(like._id);
        }

        const likecount = await BlogLike.countDocuments({ blogid });

        res.status(200).json({ likecount });

    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const likeCount = async (req, res, next) => {
    try {
        const { blogid } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(blogid)) {
            return res.status(400).json({ message: "Invalid Blog ID format." });
        }

        const likecount = await BlogLike.countDocuments({ blogid: new mongoose.Types.ObjectId(blogid) });

        res.status(200).json({ likecount });

    } catch (error) {
        console.error(error);
        next(error);
    }
};
