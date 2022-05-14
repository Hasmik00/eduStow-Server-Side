import Course from "../model/course.model.js";

class CourseRepository {
  constructor() {}

  async createNewCourse(title, description, subcategoryId) {
    const newCourse = new Course({
      title: title,
      description: description,
      subcategoryId: subcategoryId,
    });

    newCourse.save();
    return newCourse;
  }

  async getCourseById(id) {
    return Course.findById(id);
  }

  async getCourseByTitle(title) {
    return Course.findOne({ title });
  }

  async getAllCourses() {
    return Course.find();
  }

  async updateCourseById(id, updates) {
    return Course.findByIdAndUpdate(id, updates);
  }

  async deleteCourseById(id) {
    return Course.findByIdAndDelete(id);
  }

  async deleteAllCourses() {
    return Course.deleteMany();
  }
}

export default new CourseRepository();
