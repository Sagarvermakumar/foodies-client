import axiosClient from '../../utils/axiosClient'

export const orderService = {
  // Start checkout session
  startCheckoutSession: async () => {
    return await axiosClient.get('/order/start-checkout')
  },

  // Checkout order
  checkoutOrder: async (orderData) => {
    return await axiosClient.post('/order/checkout', orderData)
  },

  // Get user's orders
  getMyOrders: async () => {
    return await axiosClient.get('/order/my')
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    return await axiosClient.get(`/order/details/${orderId}`)
  },

  // Cancel order
  cancelOrder: async (orderId,reason,comment) => {
    return await axiosClient.patch(`/order/${orderId}/cancel`,{
      reason, comment
    })
  },

  // Check order status
  checkOrderStatus: async (orderId) => {
    return await axiosClient.get(`/order/${orderId}/status`)
  },

  // Quick repeat order
  quickRepeatOrder: async (orderId,cartId) => {
    return await axiosClient.post(`/order/${orderId}/repeat`, {
      cartId
    })
  },
}
