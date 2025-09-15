import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { ViewIcon } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import * as Yup from 'yup'
import { useBrandColors } from '../hooks/useBrandColors'
import { resetPassword } from '../store/slices/authSlice'

const ResetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { bg, borderColor } = useBrandColors()

  const [searchParams] = useSearchParams()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { loading, error } = useSelector((state) => state.auth)
  // Get token from URL params
  const token = searchParams.get('token')

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!token) {
      // Handle error without toast since it's not imported
      return
    }

    try {
      await dispatch(resetPassword({ token, newPassword: values.newPassword })).unwrap()
      setIsSubmitted(true)
      resetForm()
    } catch (error) {
      // Error is handled by the slice
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  if (!token) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" p={4}>
        <Card maxW="500px" w="full" bg={bg} borderColor={borderColor}>
          <CardBody textAlign="center" py={12}>
            <Alert status="error" mb={6}>
              <AlertIcon />
              <Text>Invalid or missing reset token. Please request a new password reset.</Text>
            </Alert>

            <VStack spacing={4}>
              <Button
                variant={'solid'}
                size="lg"
                w="full"
                onClick={() => navigate('/forgot-password')}
              >
                Request New Reset
              </Button>

              <Button variant="ghost" onClick={() => navigate('/login')}>
                Back to Login
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </Box>
    )
  }

  if (isSubmitted) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" p={4}>
        <Card maxW="500px" w="full" bg={bg} borderColor={borderColor}>
          <CardBody textAlign="center" py={12}>
            <Box mb={6}>
              <CheckCircleIcon boxSize={16} color="green.500" />
            </Box>

            <Heading size="lg" color="brand.primary" mb={4}>
              Password Reset Successful!
            </Heading>

            <Text color="gray.600" mb={6} fontSize="lg">
              Your password has been successfully reset. You can now log in with your new password.
            </Text>

            <Alert status="success" mb={6}>
              <AlertIcon />
              <Text>Please keep your new password secure and don't share it with anyone.</Text>
            </Alert>

            <Button variant={'solid'} size="lg" w="full" onClick={() => navigate('/login')}>
              Go to Login
            </Button>
          </CardBody>
        </Card>
      </Box>
    )
  }

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" p={4}>
      <Card maxW="500px" w="full" bg={bg} borderColor={borderColor}>
        <CardBody py={12}>
          <VStack spacing={8}>
            {/* Header */}
            <Box textAlign="center">
              <Heading size="lg" color="brand.primary" mb={2}>
                Reset Your Password
              </Heading>
              <Text color="gray.600">
                Enter your new password below. Make sure it's secure and easy to remember.
              </Text>
            </Box>

            {/* Form */}
            <Formik
              initialValues={{
                newPassword: '',
                confirmPassword: ''
              }}
              validationSchema={Yup.object({
                newPassword: Yup.string()
                  .min(8, 'Password must be at least 8 characters')
                  .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                  )
                  .required('New password is required'),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                  .required('Please confirm your password')
              })}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form style={{ width: '100%' }}>
                  <VStack spacing={6} align="stretch">
                    <Field name="newPassword">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.newPassword && form.touched.newPassword}
                        >
                          <FormLabel>New Password</FormLabel>
                          <InputGroup>
                            <Input
                              {...field}
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Enter new password"
                              size="lg"
                              bg={bg}
                              borderColor={borderColor}
                            />
                            <InputRightElement>
                              <IconButton
                                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                onClick={() => setShowPassword(!showPassword)}
                                variant="ghost"
                                size="sm"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                              />
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>{form.errors.newPassword}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="confirmPassword">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}
                        >
                          <FormLabel>Confirm New Password</FormLabel>
                          <InputGroup>
                            <Input
                              {...field}
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="Confirm new password"
                              size="lg"
                              bg={bg}
                              borderColor={borderColor}
                            />
                            <InputRightElement>
                              <IconButton
                                icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                variant="ghost"
                                size="sm"
                                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                              />
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    {/* Password Requirements */}
                    <Box p={4} bg="gray.50" borderRadius="md">
                      <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700">
                        Password Requirements:
                      </Text>
                      <VStack spacing={1} align="flex-start">
                        <Text fontSize="xs" color="gray.600">
                          • At least 8 characters long
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                          • Contains uppercase and lowercase letters
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                          • Contains at least one number
                        </Text>
                      </VStack>
                    </Box>

                    {error && (
                      <Alert status="error">
                        <AlertIcon />
                        <Text>{error}</Text>
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      variant={'solid'}

                      size="lg"
                      w="full"
                      isLoading={loading}
                      loadingText="Resetting Password"
                    >
                      Reset Password
                    </Button>
                  </VStack>
                </Form>
              )}
            </Formik>

            {/* Footer Links */}
            <VStack spacing={3}>
              <Text fontSize="sm" color="gray.600">
                Remember your password?{' '}
                <Link to="/login" style={{ color: '#E11D48', textDecoration: 'underline' }}>
                  Back to Login
                </Link>
              </Text>

              <Text fontSize="sm" color="gray.600">
                Don't have an account?{' '}
                <Link to="/register" style={{ color: '#E11D48', textDecoration: 'underline' }}>
                  Sign up here
                </Link>
              </Text>
            </VStack>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  )
}

export default ResetPassword
