import express from "express";
import {
  createCourse,
  deleteAllCourses,
  deleteCourseById,
  getAllCourses,
  getCourseById,
  getCourseByTitle,
  updateCourseById,
} from "../controller/course.controller.js";

const router = express.Router();

router.post("/", createCourse); //works
router.get("/id/:id", getCourseById); //works
router.get("/title/:title", getCourseByTitle); //works
router.get("/", getAllCourses); //works
router.patch("/:id", updateCourseById); //works
router.delete("/:id", deleteCourseById); //works
router.delete("/", deleteAllCourses); //works

export default router;
