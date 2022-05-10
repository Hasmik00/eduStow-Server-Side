import express from 'express';
import {
	createCategory,
	deleteAllCategories,
	deleteCategoryById,
	getAllCategories,
	getCategoryById,
	getCategoryByTitle,
	updateCategoryById,
} from '../controller/category.controller.js';

const router = express.Router();

router.post('/createCategory', createCategory); //works
router.get('/getCategoryById', getCategoryById); // works
router.get('/getCategoryByTitle', getCategoryByTitle); //works, but if entering wrong title does not throw an error
router.get('/getAllCategories', getAllCategories); //works
router.post('/updateCategoryById', updateCategoryById); //works
router.delete('/deleteCategoryById', deleteCategoryById); //works
router.delete('/deleteAllCategories', deleteAllCategories); //works

export default router;
