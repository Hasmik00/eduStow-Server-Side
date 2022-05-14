import { validationResult } from "express-validator";

import CourseService from "../service/course.service.js";

export const createCourse = async (req, res) => {
  const errors = validationResult(req);
  const { title, description, subcategoryId } = req.body;

  if (!errors.isEmpty()) {
    throw new Error("Validation error");
  }

  const newCourse = await CourseService.createCourse(
    title,
    description,
    subcategoryId
  );

  res.status(201).send(newCourse);
};

export const getCourseById = async (req, res) => {
  const errors = validationResult(req);
  const id = req.params.id;

  if (!errors.isEmpty()) {
    throw new Error("Please enter a valid id");
  }

  const course = await CourseService.getCourseById(id);
  res.status(200).send(course);
};

export const getCourseByTitle = async (req, res) => {
  const errors = validationResult(req);
  const { title } = req.params;

  if (!errors.isEmpty()) {
    throw new Error("Please enter a valid title");
  }

  const course = await CourseService.getCourseByTitle(title);
  res.status(200).send(course);
};

export const getAllCourses = async (req, res) => {
  const courses = await CourseService.getAllCourses();
  res.status(200).send(courses);
};

export const updateCourseById = async (req, res) => {
  const id = req.params.id;
  const course = await CourseService.getCourseById(id);
  const errors = validationResult(req);
  const updates = req.body;

  if (!course) {
    throw new Error(`No course is found with this ${id} id`);
  } else if (!errors.isEmpty()) {
    throw new Error("Please enter a valid id");
  }

  const newCourse = await CourseService.updateACourseById(id, updates);
  res.status(201).send(newCourse);
};

export const deleteCourseById = async (req, res) => {
  const id = req.params.id;
  const course = await CourseService.getCourseById(id);
  const errors = validationResult(req);

  if (!course) {
    throw new Error(`No course found with this ${id} id`);
  } else if (!errors.isEmpty()) {
    throw new Error("Please enter a valid id");
  }

  const deletedCourse = await CourseService.deleteCourseById(id);
  res.status(200).send(deletedCourse);
};

export const deleteAllCourses = async (req, res) => {
  await CourseService.deleteAllCourses();
  res.status(200).send("Deleted all courses!");
};
