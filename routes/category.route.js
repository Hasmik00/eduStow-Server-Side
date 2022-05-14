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

const router = express.Router();

router.post("/", createCategory); //works
router.get("/id/:id", getCategoryById); //works
router.get("/title/:title", getCategoryByTitle); //works
router.get("/", getAllCategories); //works
router.patch("/:id", updateCategoryById); //works
router.delete("/:id", deleteCategoryById); //works
router.delete("/", deleteAllCategories); //works

export default router;
