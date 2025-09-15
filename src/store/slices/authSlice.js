

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authActions } from '../actions/authActions'

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  isUpdatingAvatar: false,
  error: null,
  otpSent: false,
  otpVerified: false,
}

// Async thunks
export const createUser = createAsyncThunk(
  'auth/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authActions.createUser(userData)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      )
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authActions.loginUser(credentials)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  }
)

export const emailOtpLogin = createAsyncThunk(
  'auth/emailOtpLogin',
  async (email, { rejectWithValue }) => {
    try {
      const response = await authActions.emailOtpLogin(email)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'OTP send failed')
    }
  }
)

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async (otpData, { rejectWithValue }) => {
    try {
      const response = await authActions.verifyOTP(otpData)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'OTP verification failed'
      )
    }
  }
)

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await authActions.forgotPassword(email)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Password reset failed'
      )
    }
  }
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (resetData, { rejectWithValue }) => {
    try {
      const response = await authActions.resetPassword(resetData)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Password reset failed'
      )
    }
  }
)

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await authActions.changePassword(passwordData)
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Password change failed'
      )
    }
  }
)

export const getMyProfile = createAsyncThunk(
  'auth/getMyProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authActions.getMyProfile()
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Profile fetch failed'
      )
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await authActions.logoutUser()
      return null
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed')
    }
  }
)

// update avatar
// authSlice.js
export const updateProfile = createAsyncThunk(
  "user/update-avatar",
  async (formData, thunkAPI) => {
       // ✅ Check what's inside
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]); // key, value
      }
    try {
      const { data } = await authActions.updateProfile(formData); // axios post with FormData
      return data;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update avatar");
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearOtpState: (state) => {
      state.otpSent = false
      state.otpVerified = false
    },
    userExist: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload.user
      state.loading = false
    },
    userNotExist: (state, action) => {
      state.isAuthenticated = false
      state.user = null
      state.error = action.payload
      state.loading = false
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Create User
      .addCase(createUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Email OTP Login
      .addCase(emailOtpLogin.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(emailOtpLogin.fulfilled, (state) => {
        state.loading = false
        state.otpSent = true
      })
      .addCase(emailOtpLogin.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Verify OTP
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.isAuthenticated = true
        state.otpVerified = true
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Get My Profile
      .addCase(getMyProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.isAuthenticated = true
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.loading = true
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
        state.otpSent = false
        state.otpVerified = false
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // update profile
      .addCase(updateProfile.pending, (state) => {
        state.isUpdatingAvatar = true
        state.error = null
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isUpdatingAvatar = false
        const updatedAvatar = {
          public_id: action.payload.user.avatar.public_id,
          url: action.payload.user.avatar.url,
        }

        // Update state.user
        if (state.user) {
          state.user.avatar = updatedAvatar
        }

        // Also update userDetails if it exists
        if (state.userDetails) {
          state.userDetails.avatar = updatedAvatar
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isUpdatingAvatar = false
        state.error = action.payload
      })
  },
})

export const { clearError, clearOtpState, userExist, userNotExist, setLoading } =
  authSlice.actions
export default authSlice.reducer
