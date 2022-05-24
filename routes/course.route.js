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
import {
  useAdmin,
  useAuthGuard,
  verifyToken,
} from "../middlewares/verify-token.js";

const router = express.Router();

router.post(
  "/:subcategoryId",
  [courseValidator(), verifyToken, useAuthGuard, useAdmin],
  createCourse
);
router.get("/id/:id", getCourseById);
router.get("/title/:title", getCourseByTitle);
router.get("/", getAllCourses);
router.patch(
  "/:id",
  [courseValidator(), verifyToken, useAuthGuard, useAdmin],
  updateCourseById
);
router.delete("/:id", [verifyToken, useAuthGuard, useAdmin], deleteCourseById);
router.delete("/", [verifyToken, useAuthGuard, useAdmin], deleteAllCourses);
router.get("/materials/:courseId", getCourseMaterials);

export default router;
