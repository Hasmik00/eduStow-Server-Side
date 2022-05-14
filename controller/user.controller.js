import { validationResult } from "express-validator";
import UserService from "../service/user.service.js";

export const signUp = async (req, res) => {
  const errors = validationResult(req);
  const { name, email, password } = req.body;

  if (!errors.isEmpty()) {
    throw new Error("Validation error");
  }

  const newUser = UserService.signUp(name, email, password);
  res.status(200).send(newUser);
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const token = await UserService.signIn(email, password);
  res.status(201).header("auth-token", token).send(token);
};

// export const registerToCourse = async (req, res, next) => {};
