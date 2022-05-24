import express from "express";

import {
  createCategory,
  deleteAllCategories,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  getCategoryByTitle,
  updateCategoryById,
} from "../controller/category.controller.js";
import { categoryValidation } from "../validation/input.validation.js";
import {
  useAdmin,
  useAuthGuard,
  verifyToken,
} from "../middlewares/verify-token.js";

const router = express.Router();

router.post(
  "/",
  [categoryValidation(), verifyToken, useAuthGuard, useAdmin],
  createCategory
);
router.get("/id/:id", getCategoryById);
router.get("/title/:title", getCategoryByTitle);
router.get("/", getAllCategories);
router.patch(
  "/:id",
  [categoryValidation(), verifyToken, useAuthGuard, useAdmin],
  updateCategoryById
);
router.delete(
  "/:id",
  [verifyToken, useAuthGuard, useAdmin],
  deleteCategoryById
);
router.delete("/", [verifyToken, useAuthGuard, useAdmin], deleteAllCategories);

export default router;
