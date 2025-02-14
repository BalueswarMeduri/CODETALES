import express from 'express';
import { addCategory, deleteCategory, getallCategory, showCategory, updateCategory } from '../controllers/Categorycontroller.js';
import { onlyadmin } from '../middleware/onlyadmin.js';

const CategoryRoute = express.Router();

CategoryRoute.post('/add',onlyadmin, addCategory);
CategoryRoute.put('/update/:categoryid',onlyadmin, updateCategory);
CategoryRoute.get('/show/:categoryid',onlyadmin, showCategory);
CategoryRoute.delete('/delete/:id',onlyadmin, deleteCategory); // Change from POST to DELETE
CategoryRoute.get('/all-category', getallCategory);

export default CategoryRoute;
