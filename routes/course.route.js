import express from 'express';
import {
	createCourse,
	getCourseById,
	getCourseByTitle,
	getAllCourse,
	updateCourseById,
	deleteCourseById,
	deleteAllCourses,
} from '../controller/course.controller.js';

const router = express.Router();

router.post('/createCourse', createCourse); //works
router.get('/getCourseById', getCourseById); //works
router.get('/getCourseByTitle', getCourseByTitle); //works add to return no course with this title check this in the other 2 places
router.get('/getAllCourse', getAllCourse); //works
router.post('/updateCourseById', updateCourseById); //works
router.delete('/deleteCourseById', deleteCourseById); //works
router.delete('/deleteAllCourses', deleteAllCourses); //works

export default router;
