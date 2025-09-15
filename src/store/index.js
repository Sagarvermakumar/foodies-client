import { configureStore } from '@reduxjs/toolkit'
import addressReducer from './slices/addressSlice'
import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'
import cartUIReducer from './slices/cartUISlice'
import categoryReducer from './slices/categorySlice'
import itemReducer from './slices/ItemSlice'
import orderReducer from './slices/orderSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    cartUI: cartUIReducer,
    order: orderReducer,
    address: addressReducer,
    category: categoryReducer,
    item:itemReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
})

export default store
