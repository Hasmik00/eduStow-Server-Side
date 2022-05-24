import { validationResult } from "express-validator";

import SubcategoryService from "../service/subcategory.service.js";
import NotFoundException from "../errors/not-found.exception.js";
import BadRequestException from "../errors/bad-request.exception.js";

export const createSubcategory = async (req, res, next) => {
  const errors = validationResult(req);
  const { title, description } = req.body;
  const categoryId = req.params.categoryId;

  if (!errors.isEmpty()) {
    throw new BadRequestException("Please enter valid data");
  }

  try {
    const newSubcategory = await SubcategoryService.createSubcategory(
      title,
      description,
      categoryId
    );

    res.status(201).send(newSubcategory);
  } catch (e) {
    next(e);
  }
};

export const getSubcategoryById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const subcategory = await SubcategoryService.getSubcategoryById(id);
    res.status(200).send(subcategory);
  } catch (e) {
    next(e);
  }
};

export const getSubcategoryByTitle = async (req, res, next) => {
  const errors = validationResult(req);
  const { title } = req.params;

  if (!errors.isEmpty()) {
    throw new BadRequestException("Please enter a valid title");
  }

  try {
    const subcategory = await SubcategoryService.getSubcategoryByTitle(title);
    res.status(200).send(subcategory);
  } catch (e) {
    next(e);
  }
};

export const getAllSubcategories = async (req, res, next) => {
  try {
    const subcategories = await SubcategoryService.getAllSubcategories();
    res.status(200).send(subcategories);
  } catch (e) {}
};

export const updateSubcategoryById = async (req, res, next) => {
  const id = req.params.id;
  const subcategory = await SubcategoryService.getSubcategoryById(id);
  const errors = validationResult(req);
  const updates = req.body;

  if (!subcategory) {
    throw new NotFoundException(`No subcategory is found with this ${id} id`);
  } else if (!errors.isEmpty()) {
    throw new BadRequestException("Please enter a valid id");
  }

  try {
    const newSubcategory = await SubcategoryService.updateASubcategoryById(
      id,
      updates
    );
    res.status(201).send(newSubcategory);
  } catch (e) {
    next(e);
  }
};

export const deleteSubcategoryById = async (req, res, next) => {
  const id = req.params.id;
  const subcategory = await SubcategoryService.getSubcategoryById(id);

  if (!subcategory) {
    throw new NotFoundException(`No subcategory found with this ${id} id`);
  }

  try {
    const deletedSubcategory = await SubcategoryService.deleteSubcategoryById(
      id
    );
    res.status(200).send(deletedSubcategory);
  } catch (e) {
    next(e);
  }
};

export const deleteAllSubcategories = async (req, res, next) => {
  try {
    await SubcategoryService.deleteAllSubcategories();
    res.status(200).send("Deleted all subcategories!");
  } catch (e) {
    next(e);
  }
};
