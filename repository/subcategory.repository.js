import Subcategory from "../model/subcategory.model.js";

class SubcategoryRepository {
  constructor() {}

  async createNewSubcategory(title, description, categoryId) {
    const newSubcategory = new Subcategory({
      title: title,
      description: description,
      categoryId: categoryId,
    });

    newSubcategory.save();
    return newSubcategory;
  }

  async getSubcategoryById(id) {
    return Subcategory.findById(id);
  }

  async getSubcategoryByTitle(title) {
    return Subcategory.findOne({ title });
  }

  async getAllSubcategories() {
    return Subcategory.find();
  }

  async updateSubcategoryById(id, updates) {
    return Subcategory.findByIdAndUpdate(id, updates);
  }

  async deleteSubcategoryById(id) {
    return Subcategory.findByIdAndDelete(id);
  }

  async deleteAllSubcategories() {
    return Subcategory.deleteMany();
  }
}

export default new SubcategoryRepository();
