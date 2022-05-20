import { validationResult } from "express-validator";

import UserService from "../service/user.service.js";
import NotFoundError from "../errors/not-found.error.js";
import ValidationError from "../errors/validation.error.js";

export const signUp = async (req, res) => {
  const errors = validationResult(req);
  const { name, email, password } = req.body;

  if (!errors.isEmpty()) {
    throw new ValidationError("Please enter valid data");
  }

  const newUser = await UserService.signUp(name, email, password);
  res.status(200).send(newUser);
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const token = await UserService.signIn(email, password);
  res.status(201).header("auth-token", token).send(token);
};

export const getUserById = async (req, res) => {
  const errors = validationResult(req);
  const id = req.params.id;

  if (!errors.isEmpty()) {
    throw new ValidationError("Please enter a valid id");
  }

  const user = await UserService.getUserById(id);
  res.status(200).send(user);
};

export const getUserByName = async (req, res) => {
  const errors = validationResult(req);
  const { name } = req.params;

  if (!errors.isEmpty()) {
    throw new ValidationError("Please enter a valid title");
  }

  const user = await UserService.getUserByName(name);
  res.status(200).send(user);
};

export const getAllUsers = async (req, res) => {
  const users = await UserService.getAllUsers();
  res.status(200).send(users);
};

export const updateUserById = async (req, res) => {
  const id = req.params.id;
  const user = await UserService.getUserById(id);
  const errors = validationResult(req);
  const updates = req.body;

  if (!user) {
    throw new NotFoundError(`No user found with this ${id} id`);
  } else if (!errors.isEmpty()) {
    throw new ValidationError("Please enter a valid id");
  }

  const newUser = await UserService.updateUserById(id, updates);
  res.status(201).send(newUser);
};

export const deleteUserById = async (req, res) => {
  const id = req.params.id;
  const user = await UserService.getUserById(id);
  const errors = validationResult(req);

  if (!user) {
    throw new NotFoundError(`No user found with this ${id} id`);
  } else if (!errors.isEmpty()) {
    throw new ValidationError("Please enter a valid id");
  }

  const deletedUser = await UserService.deleteUserById(id);
  res.status(200).send(deletedUser);
};

export const deleteAllUsers = async (req, res) => {
  await UserService.deleteAllUsers();
  res.status(200).send("Deleted all users!");
};

export const registerForCourse = async (req, res) => {
  const { userId, courseId } = req.params;
  const registered = await UserService.registerForCourse(userId, courseId);

  res.status(201).send(registered);
};

export const getMyCourses = async (req, res) => {
  const errors = validationResult(req);
  const id = req.params.id;

  if (!errors.isEmpty()) {
    throw new ValidationError("Please enter a valid id");
  }

  const courses = await UserService.getMyCourses(id);
  res.status(200).send(courses);
};
