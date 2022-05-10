import express from 'express';
import {
	createSubcategory,
	deleteAllSubcategories,
	deleteSubcategoryById,
	getAllSubcategories,
	getSubcategoryById,
	getSubcategoryByTitle,
	updateSubcategoryById,
} from '../controller/subcategory.controller.js';

const router = express.Router();

router.post('/createSubcategory', createSubcategory); //works
router.get('/getSubcategoryById', getSubcategoryById); //works
router.get('/getSubcategoryByTitle', getSubcategoryByTitle); //works, but if entering wrong title does not
router.get('/getAllSubcategories', getAllSubcategories); //works
router.post('/updateSubcategoryById', updateSubcategoryById); //works
router.delete('/deleteSubcategoryById', deleteSubcategoryById); //works
router.delete('/deleteAllSubcategories', deleteAllSubcategories); //works

export default router;
