import { validationResult } from "express-validator";

import CategoryService from "../service/Category.service.js";

export const createCategory = async (req, res) => {
  const errors = validationResult(req);
  const { title, description } = req.body;

  if (!errors.isEmpty()) {
    throw new Error("Validation error");
  }

  const newCategory = await CategoryService.createCategory(title, description);
  res.status(201).send(newCategory);
};

export const getCategoryById = async (req, res) => {
  const errors = validationResult(req);
  const id = req.params.id;

  if (!errors.isEmpty()) {
    throw new Error("Please enter a valid id");
  }

  const category = await CategoryService.getCategoryById(id);
  res.status(200).send(category);
};

export const getCategoryByTitle = async (req, res) => {
  const errors = validationResult(req);
  const { title } = req.params;

  if (!errors.isEmpty()) {
    throw new Error("Please enter a valid title");
  }

  const category = await CategoryService.getCategoryByTitle(title);
  res.status(200).send(category);
};

export const getAllCategories = async (req, res) => {
  const categories = await CategoryService.getAllCategories();
  res.status(200).send(categories);
};

export const updateCategoryById = async (req, res) => {
  const id = req.params.id;
  const category = await CategoryService.getCategoryById(id);
  const errors = validationResult(req);
  const updates = req.body;

  if (!category) {
    throw new Error(`No category found with this ${id} id`);
  } else if (!errors.isEmpty()) {
    throw new Error("Please enter a valid id");
  }

  const newCategory = await CategoryService.updateACategoryById(id, updates);
  res.status(201).send(newCategory);
};

export const deleteCategoryById = async (req, res) => {
  const id = req.params.id;
  const category = await CategoryService.getCategoryById(id);
  const errors = validationResult(req);

  if (!category) {
    throw new Error(`No category found with this ${id} id`);
  } else if (!errors.isEmpty()) {
    throw new Error("Please enter a valid id");
  }

  const deletedCategory = await CategoryService.deleteCategoryById(id);
  res.status(200).send(deletedCategory);
};

export const deleteAllCategories = async (req, res) => {
  await CategoryService.deleteAllCategories();
  res.status(200).send("Deleted all categories!");
};
