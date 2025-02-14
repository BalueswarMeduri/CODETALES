import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required : true,
        trim: true,
    },
    slug:{
        type:String,
        required : true,
        unique : true,
        trim: true,
    },
    
})

const Category = mongoose.model('Category',CategorySchema, 'categories')

export default Category;