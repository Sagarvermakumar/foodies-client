import axiosClient from '../../utils/axiosClient';

export const categoryService = {
  // Get all categories
  getCategories: async () => {
    return await axiosClient.get('/category')
  },


  getMenusByCategory: async (categoryId) => {
    return await axiosClient.get(`/category/${categoryId}`)
  }
}
