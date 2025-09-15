import { itemServices } from '../services/ItemServices'

export const itemAction = {
  getAllItems: async (page) => await itemServices.getAllItems(page),
}
