import axiosClient from '../../utils/axiosClient'

export const cartService = {





  // Add item to cart
  addToCart: async (itemData) => {
    return await axiosClient.post('/cart', itemData)
  },

  // Get user's cart
  getCart: async () => {
    return await axiosClient.get('/cart')
  },

  // Update cart item quantity
  updateCartItem: async (itemId, quantity) => {
    return await axiosClient.patch(`/cart/item/${itemId}`, { quantity })
  },

  // Remove item from cart
  removeCartItem: async (itemId) => {
    return await axiosClient.delete(`/cart/item/${itemId}`)
  },

  // Apply coupon to cart
  applyCoupon: async (couponCode) => {
    return await axiosClient.post('/cart/apply-coupon', { couponCode })
  },
}
