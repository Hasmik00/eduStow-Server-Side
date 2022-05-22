import express from "express";

import {
  createCourse,
  deleteAllCourses,
  deleteCourseById,
  getAllCourses,
  getCourseById,
  getCourseByTitle,
  getCourseMaterials,
  updateCourseById,
} from "../controller/course.controller.js";
import { courseValidator } from "../validation/input.validation.js";
import { useAdmin, useAuthGuard } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post(
  "/:subcategoryId",
  [courseValidator(), useAuthGuard, useAdmin],
  createCourse
);
router.get("/id/:id", getCourseById);
router.get("/title/:title", getCourseByTitle);
router.get("/", getAllCourses);
router.patch(
  "/:id",
  [courseValidator(), useAuthGuard, useAdmin],
  updateCourseById
);
router.delete("/:id", [useAuthGuard, useAdmin], deleteCourseById);
router.delete("/", [useAuthGuard, useAdmin], deleteAllCourses);
router.get("/materials/:courseId", getCourseMaterials);

export default router;
