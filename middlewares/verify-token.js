import jwt from "jsonwebtoken";

import userRepository from "../repository/user.repository.js";
import UnauthorizedException from "../errors/unauthorized.exception.js";
import { roles } from "../utils/constants.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    throw new UnauthorizedException("Access is denied");
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verified;
  } catch (err) {
    throw new UnauthorizedException("Invalid token");
  }

  next();
};

export const useAuthGuard = async (req, res, next) => {
  let decodedToken;
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    throw new UnauthorizedException("not Authenticated");
  } else {
    decodedToken = await jwt.decode(token, process.env.SECRET_TOKEN);
    req.user = await userRepository.getUserById(decodedToken._id);
  }

  next();
};

export const useAdmin = async (req, res, next) => {
  if (req.user.role === roles[0]) {
    next();
  } else {
    throw new UnauthorizedException("Not Authorized");
  }
};
