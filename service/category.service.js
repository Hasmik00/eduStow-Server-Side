import { to } from "await-to-js";

import categoryRepository from "../repository/category.repository.js";
import NotFoundException from "../errors/not-found.exception.js";

class CategoryService {
  static async createCategory(title, description) {
    const [error, category] = await to(
      categoryRepository.createNewCategory(title, description)
    );

    if (error) {
      throw new Error(error);
    }

    return category;
  }

  static async getCategoryByTitle(title) {
    const [error, category] = await to(
      categoryRepository.getCategoryByTitle(title)
    );

    if (error || !category) {
      throw new NotFoundException(
        `No category with this ${title} title is found!`
      );
    }

    return category;
  }

  static async getCategoryById(id) {
    const [error, category] = await to(categoryRepository.getCategoryById(id));

    if (error || !category) {
      throw new NotFoundException(`No category with this ${id} is found!`);
    }

    return category;
  }

  static async getAllCategories() {
    const [error, category] = await to(categoryRepository.getAllCategories());

    if (error || !category) {
      throw new NotFoundException("No category is found!");
    }

    return category;
  }

  static async updateACategoryById(id, updates) {
    const [error, category] = await to(
      categoryRepository.updateCategoryById(id, updates)
    );

    if (error || !category) {
      throw new NotFoundException(`No category with ${id} is found!`);
    }

    return category;
  }

  static async deleteCategoryById(id) {
    const [error, category] = await to(
      categoryRepository.deleteCategoryById(id)
    );

    if (error || !category) {
      throw new NotFoundException(
        `No category with this title ${id} is found!`
      );
    }

    return category;
  }

  static async deleteAllCategories() {
    const [error, category] = await to(
      categoryRepository.deleteAllCategories()
    );

    if (error || !category) {
      throw new NotFoundException("No category is found!");
    }

    return category;
  }
}

export default CategoryService;
