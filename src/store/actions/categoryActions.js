import { categoryService } from '../services/categoryService'

export const categoryActions = {
  // Get all categories
  getCategories: async () => {
    return await categoryService.getCategories()
  },

  // Get category by ID with items

  getMenusByCategory: async (categoryId) => {
    return await categoryService.getMenusByCategory(categoryId)
  },
}
