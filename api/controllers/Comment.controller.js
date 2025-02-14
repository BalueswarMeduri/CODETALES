import Comment from "../models/comment.model.js"

export const addcomment = async(req,res,next)=>{
    try {
        const {author, blogid, comment} = req.body
        const newcomment = new Comment({
            author : author,
            blogid : blogid,
            comment : comment
        })
        await newcomment.save()
        res.status(200).json({
            success: true,
            message : 'comment add sucessfully',
            comment : newcomment
        })
    } catch (error) {
        next(console.log(error.message))
    }
}

export const getcomments = async(req,res,next)=>{
    try {
        const {blogid} = req.params
        const comments = await Comment.find({ blogid }).populate('author', 'name avatar').sort({ createdAt: -1 }).lean().exec();
        res.status(200).json({
           comments
        })
    } catch (error) {
        next(console.log(error.message))
    }
}

export const commentCount = async(req,res,next)=>{
    try {
        const {blogid} = req.params
        const commentCount = await Comment.countDocuments({blogid})
        res.status(200).json({
           commentCount
        })
    } catch (error) {
        next(console.log(error.message))
    }
}

export const getAllComments = async (req, res, next) => {
    try {
        const comments = await Comment.find()
            .populate('blogid', 'title')
            .populate('author', 'name');

        res.status(200).json({ comments });
    } catch (error) {
        console.error("Error fetching comments:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const deleteComment = async (req, res, next) => {
    try {
        const { commentid } = req.params; // Get ID from params

        if (!commentid) {
            return res.status(400).json({
                success: false,
                message: "Comment ID is required",
            });
        }

        const deletedComment = await Comment.findByIdAndDelete(commentid); // Pass the ID

        if (!deletedComment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting comment:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

