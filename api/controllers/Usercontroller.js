import cloudinary from "../config/cloudinary.js";
import User from "../models/usermodel.js";
import bcryptjs from 'bcryptjs'
export const getUser = async (req, res, next)=>{
    try{
        const {userid} = req.params
        const user = await User.findOne({_id: userid}).lean().exec()
        if(!user){
            console.log("user not found");    
        }
        res.status(200).json({
            success : true,
            message : 'User data found.',
            user
        })
    }catch(error){
        next(error.message)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const data = JSON.parse(req.body.data);
        const { userid } = req.params;

        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        user.name = data.name;
        user.email = data.email;
        user.bio = data.bio;

        if (data.password && data.password.length >= 8) {
            const hashedpassword = bcryptjs.hashSync(data.password);
            user.password = hashedpassword;
        }

        if(req.file){
            const uploadResult = await cloudinary.uploader
       .upload(
           req.file.path,
           {folder : 'codetales', resource_type: 'auto'}
       )
       .catch((error) => {
           console.log(error);
       });
       user.avatar = uploadResult.secure_url
        }

        await user.save(); // Save the updated user in the database

        res.status(200).json({
            success: true,
            message: "User data updated successfully.",
            user,
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error });
    }
};


export const getalluser = async(req, res, next)=>{
    try {
        const user = await User.find().sort({createdAt: -1})
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
       next(error)
    }
}

export const deleteuser = async(req, res, next)=>{
    try {
        const {id} = req.params
        const user = await User.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message : 'deleted scufully'
        })
    } catch (error) {
       next(error)
    }
}