import Course from '../model/course.js';

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
		return Course.find({title});
	}

	async getAllCourses() {
		return Course.find();
	}

	async updateCourseById(id, updates, options) {
		return Course.findByIdAndUpdate(id, updates, options);
	}

	async deleteCourseById(id) {
		return Course.findByIdAndDelete(id);
	}

	async deleteAllCourses() {
		return Course.deleteMany();
	}
}

export default new CourseRepository();
