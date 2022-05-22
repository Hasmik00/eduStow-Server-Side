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
import { useAdmin, useAuthGuard } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post(
  "/",
  [categoryValidation(), useAuthGuard, useAdmin],
  createCategory
);
router.get("/id/:id", getCategoryById);
router.get("/title/:title", getCategoryByTitle);
router.get("/", getAllCategories);
router.patch(
  "/:id",
  [categoryValidation(), useAuthGuard, useAdmin],
  updateCategoryById
);
router.delete("/:id", [useAuthGuard, useAdmin], deleteCategoryById);
router.delete("/", [useAuthGuard, useAdmin], deleteAllCategories);

export default router;
