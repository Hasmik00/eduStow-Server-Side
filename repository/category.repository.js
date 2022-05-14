import Category from "../model/category.model.js";

class CategoryRepository {
  constructor() {}

  async createNewCategory(title, description) {
    const newCategory = new Category({
      title: title,
      description: description,
    });
    newCategory.save();
    return newCategory;
  }

  async getCategoryById(id) {
    return Category.findById(id);
  }

  async getCategoryByTitle(title) {
    return Category.findOne({ title });
  }

  async getAllCategories() {
    return Category.find();
  }

  async updateCategoryById(id, updates) {
    return Category.findByIdAndUpdate(id, updates);
  }

  async deleteCategoryById(id) {
    return Category.findByIdAndDelete(id);
  }

  async deleteAllCategories() {
    return Category.deleteMany();
  }
}

export default new CategoryRepository();
