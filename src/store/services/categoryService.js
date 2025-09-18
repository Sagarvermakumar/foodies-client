import BASE_URL from '../../config';
import axiosClient from '../../utils/axiosClient';

export const categoryService = {
  // Get all categories
  getCategories: async () => {
      console.log("➡️ API call to:", `${BASE_URL}/api/v1/category`);
    return await axiosClient.get('/category')
  },


  getMenusByCategory: async (categoryId) => {
    return await axiosClient.get(`/category/${categoryId}`)
  }
}
