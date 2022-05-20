import express from "express";

import {
  deleteAllUsers,
  deleteUserById,
  getAllUsers,
  getMyCourses,
  getUserById,
  getUserByName,
  registerForCourse,
  signIn,
  signUp,
  updateUserById,
} from "../controller/user.controller.js";
import {
  logInValidator,
  signUpValidator,
} from "../validation/user.validation.js";
import { useAdmin, useAuthGuard } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/signup", [signUpValidator()], signUp);
router.post("/login", [logInValidator()], signIn);
router.get("/id/:id", [useAuthGuard, useAdmin], getUserById);
router.get("/name/:name", [useAuthGuard, useAdmin], getUserByName);
router.get("/", [useAuthGuard, useAdmin], getAllUsers);
router.patch("/:id", [useAuthGuard, useAdmin], updateUserById);
router.delete("/:id", [useAuthGuard, useAdmin], deleteUserById);
router.delete("/", [useAuthGuard, useAdmin], deleteAllUsers);
router.post("/register/:userId/:courseId", registerForCourse);
router.get("/myCourses/:id", getMyCourses);

export default router;
