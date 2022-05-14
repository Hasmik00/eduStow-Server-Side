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

const router = express.Router();

router.post("/", createSubcategory); //works
router.get("/id/:id", getSubcategoryById); //works
router.get("/title/:title", getSubcategoryByTitle); //doesn't work'
router.get("/", getAllSubcategories); //works
router.post("/:id", updateSubcategoryById); //works
router.delete("/:id", deleteSubcategoryById); //works
router.delete("/", deleteAllSubcategories); //works

export default router;
