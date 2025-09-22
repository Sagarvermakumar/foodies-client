import axiosClient from '../../utils/axiosClient'

export const authService = {
  // User registration
  createUser: async (userData) => {
    return await axiosClient.post('/auth/register', userData)
  },

  // User login with email/phone and password
  loginUser: async (credentials) => {
    return await axiosClient.post('/auth/login', credentials)
  },

  // Send OTP to email for login
  emailOtpLogin: async (email) => {
    return await axiosClient.post('/auth/email-otp-login', { email })
  },

  // Verify OTP for login
  verifyOTP: async (otpData) => {
    return await axiosClient.post('/auth/verify-otp', otpData)
  },

  // Forgot password
  forgotPassword: async (email) => {
    return await axiosClient.post('/auth/forgot-password', { email })
  },

  // Reset password with token
  resetPassword: async (resetData) => {
    return await axiosClient.post('/auth/reset-password', resetData)
  },

  // Change password (authenticated user)
  changePassword: async (passwordData) => {
    return await axiosClient.post('/auth/change-password', passwordData)
  },

  // Get user profile
  getMyProfile: async () => {
    return await axiosClient.get('/auth/me')
  },

  // Logout user
  logoutUser: async () => {
    return await axiosClient.post('/auth/logout',{}, { withCredentials: true })
  },

  // update profile
  updateProfile: async (avatar) => {
    return await axiosClient.patch('/user/profile/update/avatar', avatar, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
