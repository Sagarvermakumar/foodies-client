import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addressActions } from '../actions/addressActions'

const initialState = {
  addresses: [],
  addressFromPin: {
    city: '',
    state: '',
  },
  defaultAddress: null,
  loading:{
    add:false,
    all:false,
    remove:false,
    update:false,
    setDefault:false,
    getDefault:false,
    getAddressFromPin:false
  },
  error: null,
}

// Async thunks
export const createAddress = createAsyncThunk(
  'address/createAddress',
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await addressActions.createAddress(addressData)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create address'
      )
    }
  }
)

export const updateAddress = createAsyncThunk(
  'address/updateAddress',
  async ({ id, ...addressData }, { rejectWithValue }) => {
    console.log({ id, addressData })
    try {
      const response = await addressActions.updateAddress(
        id,
        addressData
      )
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update address'
      )
    }
  }
)

export const deleteAddress = createAsyncThunk(
  'address/deleteAddress',
  async (addressId, { rejectWithValue }) => {
    try {
      await addressActions.deleteAddress(addressId)
      return addressId
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete address'
      )
    }
  }
)

export const getAllAddresses = createAsyncThunk(
  'address/getAllAddresses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await addressActions.getAllAddresses()
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch addresses'
      )
    }
  }
)

export const getDefaultAddress = createAsyncThunk(
  'address/getDefaultAddress',
  async (_, { rejectWithValue }) => {
    try {
      const response = await addressActions.getDefaultAddress()
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch default address'
      )
    }
  }
)

export const setDefaultAddress = createAsyncThunk(
  'address/setDefaultAddress',
  async (addressId, { rejectWithValue }) => {
    try {
      const response = await addressActions.setDefaultAddress(addressId)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to set default address'
      )
    }
  }
)
export const getLocationByPincode = createAsyncThunk(
  'address/location/pin',
  async (pin, { rejectWithValue }) => {
    try {
      const response = await addressActions.getLocationByPincode(pin)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get address from pin'
      )
    }
  }
)

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Address
      .addCase(createAddress.pending, (state) => {
        state.loading.add = true
        state.error = null
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading.add = false
        const newAddress = action.payload.data
        console.log("new Addr : ", newAddress)
        state.addresses.push(newAddress)

        if (newAddress?.isDefaultAddress) {
          // Remove default flag from other addresses
          state.addresses.forEach((addr) => {
            if (addr.id !== newAddress.id) {
              addr.isDefaultAddress = false
            }
          })
          state.defaultAddress = newAddress
        }
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading.add = false
        state.error = action.payload
      })
      // Update Address
      .addCase(updateAddress.pending, (state) => {
        state.loading.update = true
        state.error = null
      })
 .addCase(updateAddress.fulfilled, (state, action) => {
  state.loading.update = false
  const updatedAddress = action.payload.address

  const index = state.addresses.findIndex(
    (addr) => addr._id === updatedAddress._id
  )

  if (index >= 0) {
    state.addresses[index] = {
      ...state.addresses[index],
      ...updatedAddress,
    }

    if (updatedAddress.isDefaultAddress) {
      state.addresses = state.addresses.map(addr =>
        addr._id === updatedAddress._id
          ? { ...addr, isDefaultAddress: true }
          : { ...addr, isDefaultAddress: false }
      )
      state.defaultAddress = updatedAddress
    }
  }
})

      .addCase(updateAddress.rejected, (state, action) => {
        state.loading.update = false
        state.error = action.payload
      })
      // Delete Address
      .addCase(deleteAddress.pending, (state) => {
        state.loading.remove = true
        state.error = null
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading.remove = false
        const addressId = action.payload
        state.addresses = state.addresses.filter(
          (addr) => addr?._id !== addressId
        )

        // If deleted address was default, clear default
        if (state.defaultAddress && state.defaultAddress.id === addressId) {
          state.defaultAddress = null
        }
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading.remove = false
        state.error = action.payload
      })
      // Get All Addresses
      .addCase(getAllAddresses.pending, (state) => {
        state.loading.all = true
        state.error = null
      })
      .addCase(getAllAddresses.fulfilled, (state, action) => {
        state.loading.all = false
        state.addresses = action.payload.addresses || []
        state.defaultAddress =
          action.payload.addresses?.find((addr) => addr.isDefaultAddress) ||
          null
      })
      .addCase(getAllAddresses.rejected, (state, action) => {
        state.loading.all = false
        state.error = action.payload
      })
      // Get Default Address
      .addCase(getDefaultAddress.pending, (state) => {
        state.loading.getDefault = true
        state.error = null
      })
      .addCase(getDefaultAddress.fulfilled, (state, action) => {
        state.loading.getDefault = false
        state.defaultAddress = action.payload.address
      })
      .addCase(getDefaultAddress.rejected, (state, action) => {
        state.loading.getDefault = false
        state.error = action.payload
      })
      // Set Default Address
      .addCase(setDefaultAddress.pending, (state) => {
        state.loading.setDefault = true
        state.error = null
      })
      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.loading.setDefault = false
        const newDefaultAddress = action.payload.address
        // Remove default flag from all addresses
        state.addresses.forEach((addr) => {
          addr.isDefaultAddress = false
        })

        // Set new default address
        const index = state.addresses.findIndex(
          (addr) => addr._id === newDefaultAddress._id
        )
        if (index >= 0) {
          state.addresses[index].isDefaultAddress = true
          state.defaultAddress = state.addresses[index]
        }
      })
      .addCase(setDefaultAddress.rejected, (state, action) => {
        state.loading.setDefault = false
        state.error = action.payload
      })
      // address from pin
      .addCase(getLocationByPincode.pending, (state) => {
        state.loading.getAddressFromPin = true
      })
      .addCase(getLocationByPincode.fulfilled, (state, action) => {
        state.loading.getAddressFromPin = false
        state.addressFromPin.city = action.payload.data.city
        state.addressFromPin.state = action.payload.data.state
      })
      .addCase(getLocationByPincode.rejected, (state, action) => {
        state.loading.getAddressFromPin = false
        state.error = action.payload
      })
  },
})

export const { clearError } = addressSlice.actions
export default addressSlice.reducer
