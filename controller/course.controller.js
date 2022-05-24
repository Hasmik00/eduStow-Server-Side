import fs from "fs";
import path from "path";
import { validationResult } from "express-validator";

import CourseService from "../service/course.service.js";
import NotFoundException from "../errors/not-found.exception.js";
import BadRequestException from "../errors/bad-request.exception.js";

export const createCourse = async (req, res, next) => {
  const errors = validationResult(req);
  const { title, description } = req.body;
  const subcategoryId = req.params.subcategoryId;

  if (!errors.isEmpty()) {
    throw new BadRequestException("Please enter valid data");
  }

  try {
    const newCourse = await CourseService.createCourse(
      title,
      description,
      subcategoryId
    );
    res.status(201).send(newCourse);
  } catch (e) {
    next(e);
  }
};

export const getCourseById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const course = await CourseService.getCourseById(id);
    res.status(200).send(course);
  } catch (e) {
    next(e);
  }
};

export const getCourseByTitle = async (req, res, next) => {
  const errors = validationResult(req);
  const { title } = req.params;

  if (!errors.isEmpty()) {
    throw new BadRequestException("Please enter a valid title");
  }

  try {
    const course = await CourseService.getCourseByTitle(title);
    res.status(200).send(course);
  } catch (e) {
    next(e);
  }
};

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await CourseService.getAllCourses();
    res.status(200).send(courses);
  } catch (e) {
    next(e);
  }
};

export const updateCourseById = async (req, res, next) => {
  const id = req.params.id;
  const course = await CourseService.getCourseById(id);
  const errors = validationResult(req);
  const updates = req.body;

  if (!course) {
    throw new NotFoundException(`No course is found with this ${id} id`);
  } else if (!errors.isEmpty()) {
    throw new BadRequestException("Please enter a valid id");
  }

  try {
    const newCourse = await CourseService.updateACourseById(id, updates);
    res.status(201).send(newCourse);
  } catch (e) {
    next(e);
  }
};

export const deleteCourseById = async (req, res, next) => {
  const id = req.params.id;
  const course = await CourseService.getCourseById(id);

  if (!course) {
    throw new NotFoundException(`No course found with this ${id} id`);
  }

  try {
    const deletedCourse = await CourseService.deleteCourseById(id);
    res.status(200).send(deletedCourse);
  } catch (e) {
    next(e);
  }
};

export const deleteAllCourses = async (req, res, next) => {
  try {
    await CourseService.deleteAllCourses();
    res.status(200).send("Deleted all courses!");
  } catch (e) {
    next(e);
  }
};

export const getCourseMaterials = async (req, res, next) => {
  const courseId = req.params.courseId;
  const course = await CourseService.getCourseById(courseId);
  const materialName = course.title + ".pdf";
  const materialPath = path.join("data", materialName);

  fs.readFile(materialPath, (err, data) => {
    if (err) {
      throw new NotFoundException("no such file is found");
    }
    try {
      res.setHeader("Content-Type", "application/pdf");
      res.send(data);
    } catch (e) {
      next(e);
    }
  });
};
