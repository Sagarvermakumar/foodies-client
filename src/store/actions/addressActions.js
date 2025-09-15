import { addressService } from '../services/addressService'

export const addressActions = {
  // Create new address
  createAddress: async (addressData) => {
    return await addressService.createAddress(addressData)
  },

  // Update existing address
  updateAddress: async (addressId, addressData) => {
    return await addressService.updateAddress(addressId, addressData)
  },

  // Delete address
  deleteAddress: async (addressId) => {
    return await addressService.deleteAddress(addressId)
  },

  // Get all user addresses
  getAllAddresses: async () => {
    return await addressService.getAllAddresses()
  },

  // Get default address
  getDefaultAddress: async () => {
    return await addressService.getDefaultAddress()
  },

  // Set address as default
  setDefaultAddress: async (addressId) => {
    return await addressService.setDefaultAddress(addressId)
  },
  getLocationByPincode: async (pin)=>{
    return await addressService.getLocationByPincode(pin)
  }
}
