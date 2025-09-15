import axiosClient from '../../utils/axiosClient'

export const itemServices = {
  getAllItems: async (page=9) => {
    return await axiosClient.get('/item/all', {
      params:{
        page:page
      }
    })
  },
}
