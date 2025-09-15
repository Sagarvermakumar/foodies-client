import { authService } from '../services/authService'

export const authActions = {
  // User registration
  createUser: async (userData) => {
    return await authService.createUser(userData)
  },

  // User login with email/phone and password
  loginUser: async (credentials) => {
    return await authService.loginUser(credentials)
  },

  // Send OTP to email for login
  emailOtpLogin: async (email) => {
    return await authService.emailOtpLogin(email)
  },

  // Verify OTP for login
  verifyOTP: async (otpData) => {
    return await authService.verifyOTP(otpData)
  },

  // Forgot password
  forgotPassword: async (email) => {
    return await authService.forgotPassword(email)
  },

  // Reset password with token
  resetPassword: async (resetData) => {
    return await authService.resetPassword(resetData)
  },

  // Change password (authenticated user)
  changePassword: async (passwordData) => {
    return await authService.changePassword(passwordData)
  },

  // Get user profile
  getMyProfile: async () => {
    return await authService.getMyProfile()
  },

  // Logout user
  logoutUser: async () => {
    return await authService.logoutUser()
  },

  // update profile
  updateProfile : async(formData)=>{
    return await authService.updateProfile(formData)
  }
}
