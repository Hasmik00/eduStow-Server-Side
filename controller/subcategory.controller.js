import { validationResult } from "express-validator";

import SubcategoryService from "../service/subcategory.service.js";
import NotFoundError from "../errors/not-found.error.js";
import ValidationError from "../errors/validation.error.js";

export const createSubcategory = async (req, res) => {
  const errors = validationResult(req);
  const { title, description } = req.body;
  const categoryId = req.params.categoryId;

  if (!errors.isEmpty()) {
    throw new ValidationError("Please enter valid data");
  }

  const newSubcategory = await SubcategoryService.createSubcategory(
    title,
    description,
    categoryId
  );

  res.status(201).send(newSubcategory);
};

export const getSubcategoryById = async (req, res) => {
  const id = req.params.id;

  const subcategory = await SubcategoryService.getSubcategoryById(id);
  res.status(200).send(subcategory);
};

export const getSubcategoryByTitle = async (req, res) => {
  const errors = validationResult(req);
  const { title } = req.params;

  if (!errors.isEmpty()) {
    throw new ValidationError("Please enter a valid title");
  }

  const subcategory = await SubcategoryService.getSubcategoryByTitle(title);
  res.status(200).send(subcategory);
};

export const getAllSubcategories = async (req, res) => {
  const subcategories = await SubcategoryService.getAllSubcategories();
  res.status(200).send(subcategories);
};

export const updateSubcategoryById = async (req, res) => {
  const id = req.params.id;
  const subcategory = await SubcategoryService.getSubcategoryById(id);
  const errors = validationResult(req);
  const updates = req.body;

  if (!subcategory) {
    throw new NotFoundError(`No subcategory is found with this ${id} id`);
  } else if (!errors.isEmpty()) {
    throw new ValidationError("Please enter a valid id");
  }

  const newSubcategory = await SubcategoryService.updateASubcategoryById(
    id,
    updates
  );

  res.status(201).send(newSubcategory);
};

export const deleteSubcategoryById = async (req, res) => {
  const id = req.params.id;
  const subcategory = await SubcategoryService.getSubcategoryById(id);

  if (!subcategory) {
    throw new NotFoundError(`No subcategory found with this ${id} id`);
  }

  const deletedSubcategory = await SubcategoryService.deleteSubcategoryById(id);
  res.status(200).send(deletedSubcategory);
};

export const deleteAllSubcategories = async (req, res) => {
  await SubcategoryService.deleteAllSubcategories();
  res.status(200).send("Deleted all subcategories!");
};
