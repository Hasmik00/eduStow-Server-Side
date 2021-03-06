import { to } from "await-to-js";

import subcategoryRepository from "../repository/subcategory.repository.js";
import NotFoundException from "../errors/not-found.exception.js";

class SubcategoryService {
  static async createSubcategory(title, description, categoryId) {
    const [error, subcategory] = await to(
      subcategoryRepository.createNewSubcategory(title, description, categoryId)
    );

    if (error) {
      throw new Error(error);
    }

    return subcategory;
  }

  static async getSubcategoryById(id) {
    const [error, subcategory] = await to(
      subcategoryRepository.getSubcategoryById(id)
    );

    if (error || !subcategory) {
      throw new NotFoundException(`No subcategory with this ${id} is found!`);
    }

    return subcategory;
  }

  static async getSubcategoryByTitle(title) {
    const [error, subcategory] = await to(
      subcategoryRepository.getSubcategoryByTitle(title)
    );

    if (error || !subcategory) {
      throw new NotFoundException(
        `No subcategory with this ${title} is found!`
      );
    }

    return subcategory;
  }

  static async getAllSubcategories() {
    const [error, subcategory] = await to(
      subcategoryRepository.getAllSubcategories()
    );

    if (error || !subcategory) {
      throw new NotFoundException("No subcategory is found!");
    }

    return subcategory;
  }

  static async updateASubcategoryById(id, updates) {
    const [error, subcategory] = await to(
      subcategoryRepository.updateSubcategoryById(id, updates)
    );

    if (error || !subcategory) {
      throw new NotFoundException(`No subcategory with ${id} is found!`);
    }

    return subcategory;
  }

  static async deleteSubcategoryById(id) {
    const [error, subcategory] = await to(
      subcategoryRepository.deleteSubcategoryById(id)
    );

    if (error) {
      throw new NotFoundException(
        `No subcategory with this title ${id} is found!`
      );
    }

    return subcategory;
  }

  static async deleteAllSubcategories() {
    const [error, subcategory] = await to(
      subcategoryRepository.deleteAllSubcategories()
    );

    if (error || !subcategory) {
      throw new NotFoundException("No subcategory is found!");
    }

    return subcategory;
  }
}

export default SubcategoryService;
