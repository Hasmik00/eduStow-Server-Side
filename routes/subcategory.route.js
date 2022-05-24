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
import {
  useAdmin,
  useAuthGuard,
  verifyToken,
} from "../middlewares/verify-token.js";

const router = express.Router();

router.post(
  "/:categoryId",
  [subCategoryValidator(), verifyToken, useAuthGuard, useAdmin],
  createSubcategory
);
router.get("/id/:id", getSubcategoryById);
router.get("/title/:title", getSubcategoryByTitle);
router.get("/", getAllSubcategories);
router.patch(
  "/:id",
  [subCategoryValidator(), verifyToken, useAuthGuard, useAdmin],
  updateSubcategoryById
);
router.delete(
  "/:id",
  [verifyToken, useAuthGuard, useAdmin],
  deleteSubcategoryById
);
router.delete(
  "/",
  [verifyToken, useAuthGuard, useAdmin],
  deleteAllSubcategories
);

export default router;
