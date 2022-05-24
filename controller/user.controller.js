import { validationResult } from "express-validator";

import UserService from "../service/user.service.js";
import NotFoundException from "../errors/not-found.exception.js";
import BadRequestException from "../errors/bad-request.exception.js";
import badRequestException from "../errors/bad-request.exception.js";

export const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  const { name, email, password } = req.body;

  if (!errors.isEmpty()) {
    throw new badRequestException("Please enter valid data");
  }

  try {
    const newUser = await UserService.signUp(name, email, password);
    res.status(200).send(newUser);
  } catch (e) {
    next(e);
  }
};

export const signIn = async (req, res, next) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  try {
    const token = await UserService.signIn(email, password);
    res.status(201).header("auth-token", token).send(token);
  } catch (e) {
    next(e);
  }
};

export const getUserById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await UserService.getUserById(id);
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

export const getUserByName = async (req, res, next) => {
  const errors = validationResult(req);
  const { name } = req.params;

  if (!errors.isEmpty()) {
    throw new BadRequestException("Please enter a valid title");
  }

  try {
    const user = await UserService.getUserByName(name);
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).send(users);
  } catch (e) {
    next(e);
  }
};

export const updateUserById = async (req, res, next) => {
  const id = req.params.id;
  const user = await UserService.getUserById(id);
  const errors = validationResult(req);
  const updates = req.body;

  if (!user) {
    throw new NotFoundException(`No user found with this ${id} id`);
  } else if (!errors.isEmpty()) {
    throw new BadRequestException("Please enter a valid id");
  }

  try {
    const newUser = await UserService.updateUserById(id, updates);
    res.status(201).send(newUser);
  } catch (e) {
    next(e);
  }
};

export const deleteUserById = async (req, res, next) => {
  const id = req.params.id;
  const user = await UserService.getUserById(id);

  if (!user) {
    throw new NotFoundException(`No user found with this ${id} id`);
  }

  try {
    const deletedUser = await UserService.deleteUserById(id);
    res.status(200).send(deletedUser);
  } catch (e) {
    next(e);
  }
};

export const deleteAllUsers = async (req, res, next) => {
  try {
    await UserService.deleteAllUsers();
    res.status(200).send("Deleted all users!");
  } catch (e) {
    next(e);
  }
};

export const registerForCourse = async (req, res, next) => {
  const { userId, courseId } = req.params;

  try {
    const registered = await UserService.registerForCourse(userId, courseId);
    res.status(201).send(registered);
  } catch (e) {
    next(e);
  }
};

export const getMyCourses = async (req, res, next) => {
  const errors = validationResult(req);
  const id = req.params.id;

  if (!errors.isEmpty()) {
    throw new BadRequestException("Please enter a valid id");
  }

  try {
    const courses = await UserService.getMyCourses(id);
    res.status(200).send(courses);
  } catch (e) {
    next(e);
  }
};
