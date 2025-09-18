import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { orderActions } from '../actions/orderActions'

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  cartId: null,
}

// Async thunks
export const startCheckOut = createAsyncThunk(
  'cart/startCheckout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderActions.startCheckout()
      return response.data
    } catch (error) {
      console.error(`Failed to start checkout: ${error.message}`)
      return rejectWithValue(
        error.response?.data?.message || 'Failed to start checkout'
      )
    }
  }
)

// Async thunks
export const checkoutOrder = createAsyncThunk(
  'order/checkoutOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await orderActions.checkoutOrder(orderData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Checkout failed')
    }
  }
)

export const startCheckout = createAsyncThunk(
  'order/startCheckout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderActions.startCheckout()
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to start checkout'
      )
    }
  }
)

export const getMyOrders = createAsyncThunk(
  'order/getMyOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderActions.getMyOrders();
      
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch orders'
      )
    }
  }
)

export const getOrderById = createAsyncThunk(
  'order/getOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await orderActions.getOrderById(orderId)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch order'
      )
    }
  }
)

export const cancelOrder = createAsyncThunk(
  'order/cancelOrder',
  async ({ orderId, reason, comment }, { rejectWithValue }) => {
    try {
      const response = await orderActions.cancelOrder(orderId,reason,comment)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to cancel order'
      )
    }
  }
)

export const checkOrderStatus = createAsyncThunk(
  'order/checkOrderStatus',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await orderActions.checkOrderStatus(orderId)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to check order status'
      )
    }
  }
)

export const quickRepeatOrder = createAsyncThunk(
  'order/quickRepeatOrder',
  async ({ id, cartId }, { rejectWithValue }) => {
    try {
      const response = await orderActions.quickRepeatOrder(id,cartId)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to repeat order'
      )
    }
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null
    },
    clearCheckoutData: (state) => {
      state.checkoutData = null
    },
    setCheckoutData: (state, action) => {
      state.checkoutData = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Checkout Order
      .addCase(checkoutOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(checkoutOrder.fulfilled, (state, action) => {
        state.loading = false
        const newOrder = action.payload.order
        state.orders.unshift(newOrder)
        state.currentOrder = newOrder
        state.checkoutData = null
      })
      .addCase(checkoutOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // start checkout session
      .addCase(startCheckout.pending, (state) => {
        state.loading = true
      })
      .addCase(startCheckout.fulfilled, (state, action) => {
        state.loading = false
        state.cartId = action.payload.cartId
      })
      .addCase(startCheckout.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Get My Orders
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload.data || []
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Get Order By ID
      .addCase(getOrderById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false
        state.currentOrder = action.payload.data
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Cancel Order
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false
        const cancelledOrder = action.payload.data
        const index = state.orders.findIndex(
          (order) => order._id === cancelledOrder._id
        )
        if (index >= 0) {
          state.orders[index] = cancelledOrder
        }
        if (state.currentOrder && state.currentOrder._id === cancelledOrder._id) {
          state.currentOrder = cancelledOrder
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Check Order Status
      .addCase(checkOrderStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(checkOrderStatus.fulfilled, (state, action) => {
        state.loading = false
        const updatedOrder = action.payload.order
        const index = state.orders.findIndex(
          (order) => order._id === updatedOrder._id
        )
        if (index >= 0) {
          state.orders[index] = updatedOrder
        }
        if (state.currentOrder && state.currentOrder._id === updatedOrder._id) {
          state.currentOrder = updatedOrder
        }
      })
      .addCase(checkOrderStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Quick Repeat Order
      .addCase(quickRepeatOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(quickRepeatOrder.fulfilled, (state) => {
        state.loading = false
        // This would typically add items to cart or create a new order
        // Implementation depends on business logic
      })
      .addCase(quickRepeatOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const {
  clearError,
  clearCurrentOrder,
  clearCheckoutData,
  setCheckoutData,
} = orderSlice.actions
export default orderSlice.reducer
