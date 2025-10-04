import { itemServices } from '../services/ItemServices'

export const itemAction = {
  getAllItems: async (filters) => await itemServices.getAllItems(filters),
}
