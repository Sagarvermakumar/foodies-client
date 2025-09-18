import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { cartActions } from '../actions/cartActions'

const initialState = {
  cartId: null,
  items: [],
  total: {},
  loading: false,
  isRemoving: false,
  isUpdating: false,
  error: null,
  couponApplied: null,
  discount: 0,
}

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await cartActions.addToCart(itemData)
      return response.data
    } catch (error) {
      console.error(`Failed to add item to cart: ${error.message}`)
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add item to cart'
      )
    }
  }
)

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await cartActions.updateCartItem(itemId, quantity)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update cart item'
      )
    }
  }
)

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (itemId, { rejectWithValue }) => {
    try {
      await cartActions.removeCartItem(itemId)
      return itemId
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to remove cart item'
      )
    }
  }
)

export const getCart = createAsyncThunk(
  'cart/getCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartActions.getCart()

      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch cart'
      )
    }
  }
)

export const applyCoupon = createAsyncThunk(
  'cart/applyCoupon',
  async (couponCode, { rejectWithValue }) => {
    try {
      const response = await cartActions.applyCoupon(couponCode)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to apply coupon'
      )
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = []
      state.total = 0
      state.couponApplied = null
      state.discount = 0
    },
    clearError: (state) => {
      state.error = null
    },
    removeCoupon: (state) => {
      state.couponApplied = null
      state.discount = 0
      // Recalculate total without discount
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false
        const newItem = action.payload.data
        const existingItemIndex = state.items.findIndex(
          (item) => item.id === newItem.id
        )

        if (existingItemIndex >= 0) {
          state.items[existingItemIndex].quantity += newItem.quantity
        } else {
          state.items.push(newItem)
        }

        // Recalculate total
        state.total = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )
        if (state.couponApplied) {
          state.total = state.total - state.discount
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update Cart Item
      .addCase(updateCartItem.pending, (state) => {
        state.isUpdating = true
        state.error = null
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isUpdating = false

        const { data } = action.payload

        state.items = data.items
        state.outlet = data.outlet
        state.updatedAt = data.updatedAt

        // Totals from backend
        state.total = data.totals
      })

      .addCase(updateCartItem.rejected, (state, action) => {
        state.isUpdating = false
        state.error = action.payload
      })
      // Remove Cart Item
      .addCase(removeCartItem.pending, (state) => {
        state.isRemoving = true
        state.error = null
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.isRemoving = false

        const itemId = action.payload
        state.items = state.items.filter(({ item }) => item._id !== itemId)
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.isRemoving = false
        state.error = action.payload
      })
      // Get Cart
      .addCase(getCart.pending, (state) => {
        state.loading=true  
        state.isRemoving = true
        state.error = null
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data.items || []
        state.total = action.payload.data.totals || 0
        state.couponApplied = action.payload.couponApplied || null
        state.discount = action.payload.discount || 0
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Apply Coupon
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false
        state.couponApplied = action.payload.coupon
        state.discount = action.payload.discount
        // Apply discount to total
        state.total = state.total - state.discount
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearCart, clearError, removeCoupon } = cartSlice.actions
export default cartSlice.reducer
