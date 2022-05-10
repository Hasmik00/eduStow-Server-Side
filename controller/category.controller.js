import {validationResult} from 'express-validator';

import CategoryService from '../service/Category.service.js';

export const createCategory = async (req, res, next) => {
	const {title, description} = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new Error('Validation error');
	}
	const newCategory = CategoryService.createCategory(title, description);
	res.status(200).send(newCategory);
	return newCategory;
};

export const getCategoryByTitle = async (req, res, next) => {
	const {title} = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json(errors.array());
	}
	const category = await CategoryService.getCategoryByTitle(title);
	res.status(201).send(category);
};

export const getCategoryById = async (req, res, next) => {
	const id = req.body.id;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json(errors.array());
	}
	const category = await CategoryService.getCategoryById(id);
	res.status(201).send(category);
};

export const getAllCategories = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json(errors.array());
	}

	const categories = await CategoryService.getAllCategories();
	res.status(201).send(categories);
};

export const updateCategoryById = async (req, res, next) => {
	const id = req.body.id;
	const updates = req.body;
	const options = {new: true};
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json(errors.array());
	}
	const category = await CategoryService.updateACategoryById(
		id,
		updates,
		options,
	);
	res.status(201).send(category);
};

export const deleteCategoryById = async (req, res, next) => {
	const id = req.body.id;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json(errors.array());
	}
	const category = await CategoryService.deleteCategoryById(id);
	res.status(201).send(category);
};

export const deleteAllCategories = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json(errors.array());
	}
	await CategoryService.deleteAllCategories();
	res.status(201).send('Deleted all categories!');
};
