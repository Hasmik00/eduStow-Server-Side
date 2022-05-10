import User from "../model/user.model.js";
import Course from "../model/course.js";

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
    });
    newUser.save();
    return newUser;
  }

  // async registerToCourse(courseId) {}
}

export default new UserRepository();
