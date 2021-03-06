import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { to } from "await-to-js";

import userRepository from "../repository/user.repository.js";
import NotFoundException from "../errors/not-found.exception.js";
import UnauthorizedException from "../errors/unauthorized.exception.js";
import ConfigService from "../config/config.service.js";

class UserService {
  static async signUp(name, email, password) {
    const [error, user] = await to(userRepository.getUserByEmail(email));

    if (user || error) {
      throw new UnauthorizedException(`This email ${email} is taken`);
    }

    const [, hashedPassword] = await to(bcrypt.hash(password, 12));
    const [err, newUser] = await to(
      userRepository.createNewUser(name, email, hashedPassword)
    );

    if (err) {
      throw new UnauthorizedException(err);
    }

    return newUser;
  }

  static async signIn(email, password) {
    const [, user] = await to(userRepository.getUserByEmail(email));

    if (!user) {
      throw new NotFoundException(`No user with this email ${email} is found!`);
    }

    const [error, doMatch] = await to(bcrypt.compare(password, user.password));

    if (error || !doMatch) {
      throw new UnauthorizedException("Authentication failed");
    }

    const token = await jwt.sign(
      { _id: user._id, role: user.role },
      ConfigService.secretToken,
      {
        expiresIn: "1h",
      }
    );

    return token;
  }

  static async getUserById(id) {
    const [error, user] = await to(userRepository.getUserById(id));

    if (error || !user) {
      throw new NotFoundException(`No user with this ${id} is found!`);
    }

    return user;
  }

  static async getUserByName(name) {
    const [error, user] = await to(userRepository.getUserByName(name));

    if (error || !user) {
      throw new NotFoundException(`No user with this ${name} name is found!`);
    }

    return user;
  }

  static async getAllUsers() {
    const [error, user] = await to(userRepository.getAllUsers());

    if (error || !user) {
      throw new NotFoundException("No user is found!");
    }

    return user;
  }

  static async updateUserById(id, updates) {
    let [error, user] = await to(userRepository.getUserById(id));

    if (error || !user) {
      throw new NotFoundException(`No user with ${id} is found!`);
    }

    const password = await bcrypt.hash(updates.password, 12);
    const [err, hashedPassword] = await to(bcrypt.hash(password, 12));

    if (err) {
      throw new UnauthorizedException(`Encryption error`);
    }

    updates.password = hashedPassword;
    user = await to(userRepository.updateUserById(id, updates));

    return user;
  }

  static async deleteUserById(id) {
    const [error, user] = await to(userRepository.deleteUserById(id));

    if (error || !user) {
      throw new NotFoundException(`No user with this title ${id} is found!`);
    }

    return user;
  }

  static async deleteAllUsers() {
    const [error, user] = await to(userRepository.deleteAllUsers());

    if (error || !user) {
      throw new NotFoundException("No user is found!");
    }

    return user;
  }

  static async registerForCourse(userId, courseId) {
    const [error, course] = await to(
      userRepository.registerForCourse(userId, courseId)
    );

    if (error) {
      throw new UnauthorizedException(error);
    }

    return course;
  }

  static async getMyCourses(id) {
    const [error, user] = await to(userRepository.getUserById(id));

    if (error || !user) {
      throw new NotFoundException(`No user with this ${id} is found!`);
    }

    return user.registeredCourses;
  }
}

export default UserService;
