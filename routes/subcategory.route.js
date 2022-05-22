import express from "express";

import {
  createSubcategory,
  deleteAllSubcategories,
  deleteSubcategoryById,
  getAllSubcategories,
  getSubcategoryById,
  getSubcategoryByTitle,
  updateSubcategoryById,
} from "../controller/subcategory.controller.js";
import { subCategoryValidator } from "../validation/input.validation.js";
import { useAdmin, useAuthGuard } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post(
  "/:categoryId",
  [subCategoryValidator(), useAuthGuard, useAdmin],
  createSubcategory
);
router.get("/id/:id", getSubcategoryById);
router.get("/title/:title", getSubcategoryByTitle);
router.get("/", getAllSubcategories);
router.patch(
  "/:id",
  [subCategoryValidator(), useAuthGuard, useAdmin],
  updateSubcategoryById
);
router.delete("/:id", [useAuthGuard, useAdmin], deleteSubcategoryById);
router.delete("/", [useAuthGuard, useAdmin], deleteAllSubcategories);

export default router;
