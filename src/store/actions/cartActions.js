import { cartService } from '../services/cartService'

export const cartActions = {

  // Add item to cart
  addToCart: async (itemData) => {
    return await cartService.addToCart(itemData)
  },

  // Update cart item quantity
  updateCartItem: async (itemId, quantity) => {
    return await cartService.updateCartItem(itemId, quantity)
  },

  // Remove item from cart
  removeCartItem: async (itemId) => {
    return await cartService.removeCartItem(itemId)
  },

  // Get user's cart
  getCart: async () => {
    return await cartService.getCart()
  },

  // Apply coupon to cart
  applyCoupon: async (couponCode) => {
    return await cartService.applyCoupon(couponCode)
  }
}
