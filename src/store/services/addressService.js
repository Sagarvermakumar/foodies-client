import axiosClient from '../../utils/axiosClient'

export const addressService = {
  // Create new address
  createAddress: async (addressData) => {
    return await axiosClient.post('/address/create', addressData)
  },

  // Update existing address
  updateAddress: async (addressId, addressData) => {
    return await axiosClient.put(`/address/update/${addressId}`, addressData)
  },

  // Delete address
  deleteAddress: async (addressId) => {
    return await axiosClient.delete(`/address/delete/${addressId}`)
  },

  // Get all user addresses
  getAllAddresses: async () => {
    return await axiosClient.get('/address/all')
  },

  // Get default address
  getDefaultAddress: async () => {
    return await axiosClient.get('/address/default')
  },

  // Set address as default
  setDefaultAddress: async (addressId) => {
    return await axiosClient.put(`/address/${addressId}/default`)
  },

  getLocationByPincode: async (pincode) => {
    return await axiosClient.get(`/address/location/${pincode}`)
  }
}
