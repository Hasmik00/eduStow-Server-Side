import User from "../model/user.model.js";
import { roles } from "../utils/constants.js";

class UserRepository {
  constructor() {}

  async getUserByEmail(email) {
    return User.findOne({ email });
  }

  async createNewUser(name, email, password) {
    const newUser = new User({
      name: name,
      email: email,
      password: password,
      role: roles[1],
    });

    newUser.save();
    return newUser;
  }

  async getUserById(id) {
    return User.findById(id);
  }

  async getUserByName(name) {
    return User.findOne({ name });
  }

  async getAllUsers() {
    return User.find();
  }

  async updateUserById(id, updates) {
    return User.findByIdAndUpdate(id, updates);
  }

  async deleteUserById(id) {
    return User.findByIdAndDelete(id);
  }

  async deleteAllUsers() {
    return User.deleteMany();
  }

  async registerForCourse(userId, courseId) {
    return User.updateOne(
      { _id: userId },
      {
        $push: { registeredCourses: { _id: courseId } },
      }
    );
  }
}

export default new UserRepository();
