import { validationResult } from "express-validator";

import CategoryService from "../service/Category.service.js";
import NotFoundException from "../errors/not-found.exception.js";
import BadRequestException from "../errors/bad-request.exception.js";

export const createCategory = async (req, res, next) => {
  const errors = validationResult(req);
  const { title, description } = req.body;

  if (!errors.isEmpty()) {
    throw new BadRequestException("Please enter valid data");
  }

  try {
    const newCategory = await CategoryService.createCategory(
      title,
      description
    );
    res.status(201).send(newCategory);
  } catch (e) {
    next(e);
  }
};

export const getCategoryById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const category = await CategoryService.getCategoryById(id);
    res.status(200).send(category);
  } catch (e) {
    next(e);
  }
};

export const getCategoryByTitle = async (req, res, next) => {
  const errors = validationResult(req);
  const { title } = req.params;

  if (!errors.isEmpty()) {
    throw new BadRequestException("Please enter a valid title");
  }

  try {
    const category = await CategoryService.getCategoryByTitle(title);
    res.status(200).send(category);
  } catch (e) {
    next(e);
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.status(200).send(categories);
  } catch (e) {
    next(e);
  }
};

export const updateCategoryById = async (req, res, next) => {
  const id = req.params.id;
  const category = await CategoryService.getCategoryById(id);
  const errors = validationResult(req);
  const updates = req.body;

  if (!category) {
    throw new NotFoundException(`No category found with this ${id} id`);
  } else if (!errors.isEmpty()) {
    throw new BadRequestException("Please enter a valid data");
  }

  try {
    const newCategory = await CategoryService.updateACategoryById(id, updates);
    res.status(201).send(newCategory);
  } catch (e) {
    next(e);
  }
};

export const deleteCategoryById = async (req, res, next) => {
  const id = req.params.id;
  const category = await CategoryService.getCategoryById(id);

  if (!category) {
    throw new NotFoundException(`No category found with this ${id} id`);
  }

  try {
    const deletedCategory = await CategoryService.deleteCategoryById(id);
    res.status(200).send(deletedCategory);
  } catch (e) {
    next(e);
  }
};

export const deleteAllCategories = async (req, res, next) => {
  try {
    await CategoryService.deleteAllCategories();
    res.status(200).send("Deleted all categories!");
  } catch (e) {
    next(e);
  }
};
