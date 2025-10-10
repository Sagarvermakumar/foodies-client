
import * as Yup from 'yup';
// Phone number regex for Indian numbers
const phoneRegExp = /^\+91[6-9]\d{9}$/

export const loginSchema = Yup.object().shape({
  emailOrPhone: Yup
    .string()
    .required('Email or phone is required')
    .test('email-or-phone', 'Must be valid email or phone', (value) => {
      if (!value) return false
      const isEmail = Yup.string().email().isValidSync(value)
      const isPhone = phoneRegExp.test(value)
      return isEmail || isPhone
    }),
  password: Yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
})

export const registrationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string().matches(phoneRegExp, 'Invalid phone number').required('Phone is required'),
  password: Yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  referralCode: Yup.string().optional()
})


export const addressValidationSchema = Yup.object().shape({
  label: Yup.string().oneOf(['Home', 'Work', 'Other']).required('Label is required'),
  addressLine: Yup.string().required('Address line is required'),
  street: Yup.string().nullable(),
  landmark: Yup.string().nullable(),
  pinCode: Yup.string()
    .matches(/^\d{6}$/, 'Pin Code must be 6 digits')
    .required('Pin Code is required'),
  contactName: Yup.string().required('Contact name is required'),
  contactPhone: Yup.string()
    .matches(phoneRegExp, 'Phone number must be 10 digits')
    .required('Contact phone is required'),
  instructions: Yup.string().nullable(),
  isDefaultAddress: Yup.boolean(),
  location:Yup.object().shape({
    type:Yup.string().required("Location type is required"),
    coordinates: Yup.array().required("coordinates are required")
  })
});


export const otpSchema = Yup.object().shape({
  otp: Yup.string().required('OTP is required').length(6, 'OTP must be 6 digits')
})

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required')
})

export const resetPasswordSchema = Yup.object().shape({
  password: Yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup
    .string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

export const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup
    .string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup
    .string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
})

