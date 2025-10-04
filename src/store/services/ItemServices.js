import axiosClient from '../../utils/axiosClient';

export const itemServices = {
  getAllItems: async (filters) => {
    const {query,category,page,isVeg, minPrice, maxPrice, isAvailable,minRating,sortBy,order, } = filters;
    return await axiosClient.get('/item/all', {
      params:{
         query, page, limit:10, category, outlet:"", isVeg, minPrice, maxPrice, isAvailable,  minRating, sortBy, order
      }
    })
  },
}
