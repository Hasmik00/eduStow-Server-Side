import express from "express";
import { logIn, signUp } from "../controller/user.controller.js";
import {
  logInValidator,
  signUpValidator,
} from "../validation/user.validation.js";
import { retrieveUser } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/signup", [signUpValidator], signUp);
router.post("/login", [logInValidator], logIn, retrieveUser);

export default router;
