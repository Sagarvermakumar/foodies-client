import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { itemAction } from '../actions/itemAction'

const initialState = {
  items: null,
  isLoading: {
    items: false,
  },
  error: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
}

export const getAllItems = createAsyncThunk(
  'item/all',
  async (newPage, { rejectWithValue }) => {
    try {
      const res = await itemAction.getAllItems(newPage)
      return res.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch items'
      )
    }
  }
)

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItemPage: (state, action) => {
      state.pagination.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllItems.pending, (state) => {
        state.isLoading.items = true
      })
      .addCase(getAllItems.fulfilled, (state, action) => {
        state.isLoading.items = false
        state.items = action.payload.data
        state.pagination = action.payload.pagination
      })
      .addCase(getAllItems.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})
export const {setItemPage} =  itemSlice.actions
export default itemSlice.reducer
