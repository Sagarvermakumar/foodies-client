export const authSelectors = {
  // Get user data
  getUser: (state) => state.auth.user,

  // Get authentication token
  getToken: (state) => state.auth.token,

  // Check if user is authenticated
  isAuthenticated: (state) => state.auth.isAuthenticated,

  // Get loading state
  isLoading: (state) => state.auth.loading,

  // Get error state
  getError: (state) => state.auth.error,

  // Check if OTP was sent
  isOtpSent: (state) => state.auth.otpSent,

  // Check if OTP was verified
  isOtpVerified: (state) => state.auth.otpVerified,

  // Get user name
  getUserName: (state) => state.auth.user?.name,

  // Get user email
  getUserEmail: (state) => state.auth.user?.email,

  // Get user phone
  getUserPhone: (state) => state.auth.user?.phone,

  // get user profile loading state
  isUpdatingAvatar: state=> state.auth.isUpdatingAvatar
}
