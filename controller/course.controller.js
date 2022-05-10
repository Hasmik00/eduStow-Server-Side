import {validationResult} from 'express-validator';

import CourseService from '../service/course.service.js';

export const createCourse = async (req, res, next) => {
	const {title, description, subcategoryId} = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new Error('Validation error');
	}

	const newCourse = CourseService.createCourse(
		title,
		description,
		subcategoryId,
	);

	res.status(200).send(newCourse);
	return newCourse;
};

export const getCourseById = async (req, res, next) => {
	const id = req.body.id;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json(errors.array());
	}

	const course = await CourseService.getCourseById(id);

	res.status(201).send(course);

	return course;
};
export const getCourseByTitle = async (req, res, next) => {
	const {title} = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json(errors.array());
	}

	const course = await CourseService.getCourseByTitle(title);

	res.status(201).send(course);

	return course;
};

export const getAllCourse = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json(errors.array());
	}

	const courses = await CourseService.getAllCourses();

	res.status(201).send(courses);

	return courses;
};

export const updateCourseById = async (req, res, next) => {
	const id = req.body.id;
	const updates = req.body;
	const options = {new: true};
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json(errors.array());
	}

	const course = await CourseService.updateACourseById(id, updates, options);

	res.status(201).send(course);

	return course;
};

export const deleteCourseById = async (req, res, next) => {
	const id = req.body.id;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json(errors.array());
	}

	const course = await CourseService.deleteCourseById(id);

	res.status(201).send(course);

	return course;
};

export const deleteAllCourses = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json(errors.array());
	}

	await CourseService.deleteAllCourses();

	res.status(201).send('Deleted all courses!');
};
