import { orderService } from '../services/orderService'

export const orderActions = {
  // Checkout order
  checkoutOrder: async (orderData) => {
    return await orderService.checkoutOrder(orderData)
  },

  //start checkout process
  startCheckout: async () => {
    return await orderService.startCheckoutSession()
  },

  // Get user's orders
  getMyOrders: async () => {
    return await orderService.getMyOrders()
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    return await orderService.getOrderById(orderId)
  },

  // Cancel order
  cancelOrder: async (orderId, reason,comment) => {
    return await orderService.cancelOrder(orderId,reason,comment)
  },

  // Check order status
  checkOrderStatus: async (orderId) => {
    return await orderService.checkOrderStatus(orderId)
  },

  // Quick repeat order
  quickRepeatOrder: async (orderId,cartId) => {
    return await orderService.quickRepeatOrder(orderId,cartId)
  }
}
