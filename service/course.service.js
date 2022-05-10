import courseRepository from '../repository/course.repository.js';
import { to } from 'await-to-js';

class CourseService {
	static async createCourse(title, description, subcategoryId) {
		const [error, course] = await to(
			courseRepository.createNewCourse(title, description, subcategoryId)
		);
		if (error) {
			throw new Error(error);
		}
		return course;
	}

	static async getCourseById(id) {
		const [error, course] = await to(courseRepository.getCourseById(id));

		if (error || !course) {
			throw new Error(`No course with this ${id} id is found!`);
		}

		return course;
	}
	static async getCourseByTitle(title) {
		const [error, course] = await to(courseRepository.getCourseByTitle(title));

		if (error || !course) {
			throw new Error(`No course with this ${title} title is found!`);
		}

		return course;
	}
	static async getAllCourses() {
		const [error, courses] = await to(courseRepository.getAllCourses());

		if (error || !courses) {
			throw new Error('No course is found!');
		}

		return courses;
	}

	static async updateACourseById(id, updates, options) {
		const [error, course] = await to(
			courseRepository.updateCourseById(id, updates, options)
		);

		if (error || !course) {
			throw new Error(`No course with ${id} id is found!`);
		}

		return course;
	}

	static async deleteCourseById(id) {
		const [error, course] = await to(courseRepository.deleteCourseById(id));

		if (error) {
			throw new Error(`No course with this ${id} id is found!`);
		}

		return course;
	}

	static async deleteAllCourses() {
		const [error, course] = await to(courseRepository.deleteAllCourses());

		if (error || !course) {
			throw new Error('No course is found!');
		}

		return course;
	}
}

export default CourseService;
