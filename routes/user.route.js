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
import {
  useAdmin,
  useAuthGuard,
  verifyToken,
} from "../middlewares/verify-token.js";

const router = express.Router();

router.post("/signup", [signUpValidator()], signUp);
router.post("/login", [logInValidator()], signIn);
router.get("/id/:id", [verifyToken, useAuthGuard, useAdmin], getUserById);
router.get("/name/:name", [verifyToken, useAuthGuard, useAdmin], getUserByName);
router.get("/", [verifyToken, useAuthGuard, useAdmin], getAllUsers);
router.patch("/:id", [verifyToken, useAuthGuard, useAdmin], updateUserById);
router.delete("/:id", [verifyToken, useAuthGuard, useAdmin], deleteUserById);
router.delete("/", [verifyToken, useAuthGuard, useAdmin], deleteAllUsers);
router.post("/register/:userId/:courseId", registerForCourse);
router.get("/myCourses/:id", getMyCourses);

export default router;
