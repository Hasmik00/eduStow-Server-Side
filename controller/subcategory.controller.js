import {validationResult} from 'express-validator';

import SubcategoryService from '../service/subcategory.service.js';

export const createSubcategory = async (req, res, next) => {
	const {title, description, categoryId} = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		throw new Error('Validation error');
	}

	const newSubcategory = SubcategoryService.createSubcategory(
		title,
		description,
		categoryId,
	);
	res.status(200).send(newSubcategory);
	return newSubcategory;
};

export const getSubcategoryById = async (req, res, next) => {
	const id = req.body.id;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json(errors.array());
	}

	const subcategory = await SubcategoryService.getSubcategoryById(id);

	res.status(201).send(subcategory);

	return subcategory;
};
export const getSubcategoryByTitle = async (req, res, next) => {
	const {title} = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json(errors.array());
	}

	const subcategory = await SubcategoryService.getSubcategoryByTitle(title);

	res.status(201).send(subcategory);

	return subcategory;
};

export const getAllSubcategories = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json(errors.array());
	}

	const subcategories = await SubcategoryService.getAllSubcategories();

	res.status(201).send(subcategories);

	return subcategories;
};

export const updateSubcategoryById = async (req, res, next) => {
	const id = req.body.id;
	const updates = req.body;
	const options = {new: true};
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json(errors.array());
	}

	const subcategory = await SubcategoryService.updateASubcategoryById(
		id,
		updates,
		options,
	);

	res.status(201).send(subcategory);

	return subcategory;
};

export const deleteSubcategoryById = async (req, res, next) => {
	const id = req.body.id;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json(errors.array());
	}

	const subcategory = await SubcategoryService.deleteSubcategoryById(id);

	res.status(201).send(subcategory);

	return subcategory;
};

export const deleteAllSubcategories = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json(errors.array());
	}

	await SubcategoryService.deleteAllSubcategories();

	res.status(201).send('Deleted all subcategories!');
};
