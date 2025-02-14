import Category from "../models/category.model.js";
export const addCategory = async(req, res, next)=>{
    try {
         const {name, slug}=req.body
         const category = new Category({
            name,slug
         })
         await category.save()
         res.status(200).json({
            success : true,
            message : "category added successfully"
         })
    } catch (error) {
        next(console.log(error));
    }
}
export const showCategory = async(req, resizeBy, next)=>{
    try {
         
    } catch (error) {
        next(console.log(error));
    }
}
export const updateCategory = async(req, resizeBy, next)=>{
    try {
         
    } catch (error) {
        next(console.log(error));
    }
}
export const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ success: false, message: "Server error while deleting category" });
    }
};


export const getallCategory = async (req, res, next) => {
    try {
      const category = await Category.find().sort({ name: 1 }).lean().exec();
      
      if (!category || category.length === 0) {
        return res.status(404).json({ message: "No categories found" });
      }
  
      res.status(200).json({ category });
    } catch (error) {
      console.error("Error fetching categories:", error);
      next(error);
    }
  };
  