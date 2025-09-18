import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { categoryActions } from '../actions/categoryActions';

const initialState = {
  categories: [],
  currentCategory: null,
  categoryItems: [],
  loading: {
    global:false,
    category:false,
    items:false
  },
  error: null
}

// Async thunks
export const getCategories = createAsyncThunk(
  'category/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryActions.getCategories();
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories')
    }
  }
)

export const getMenusByCategory = createAsyncThunk(
  'category/getMenusByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await categoryActions.getMenusByCategory(categoryId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch category')
    }
  }
)



const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentCategory: (state) => {
      state.currentCategory = null
      state.categoryItems = []
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Categories
      .addCase(getCategories.pending, (state) => {
        state.loading.category = true
        state.error = null
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading.category = false
        state.categories = action.payload.data || []
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading.category = false
        state.error = action.payload
      })
      // Get Category By ID
      .addCase(getMenusByCategory.pending, (state) => {
        state.loading.items = true
        state.error = null
      })
      .addCase(getMenusByCategory.fulfilled, (state, action) => {
        state.loading.items = false
        state.currentCategory = action.payload.data
        state.categoryItems = action.payload.items.data || []
      })
      .addCase(getMenusByCategory.rejected, (state, action) => {
        state.loading.items = false
        state.error = action.payload
      })
  }
})

export const { clearError, clearCurrentCategory } = categorySlice.actions
export default categorySlice.reducer
