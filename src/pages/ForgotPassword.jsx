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
  Input,
  Text,
  VStack
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { Mail as EmailIcon } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import GlassLayout from '../components/GlassLayout'
import { useBrandColors } from '../hooks/useBrandColors'
import PublicLayout from '../Layout/PublicLayout'
import { forgotPassword } from '../store/slices/authSlice'

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { loading, error } = useSelector((state) => state.auth)

  const { bg, borderColor } = useBrandColors()
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(forgotPassword(values.email)).unwrap()
      setIsSubmitted(true)
      resetForm()
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <GlassLayout>


        <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" p={4}>
          <Card maxW="500px" w="full" bg={bg} borderColor={borderColor}>
            <CardBody textAlign="center" py={12}>
              <Box mb={6}>
                <EmailIcon boxSize={16} color="green.500" />
              </Box>

              <Heading size="lg" color="brand.primary" mb={4}>
                Check Your Email
              </Heading>

              <Text color="gray.600" mb={6} fontSize="lg">
                We've sent a password reset link to your email address. Please check your inbox and
                follow the instructions to reset your password.
              </Text>

              <Alert status="info" mb={6}>
                <AlertIcon />
                <Text fontSize="sm">
                  If you don't see the email, check your spam folder or try again.
                </Text>
              </Alert>

              <VStack spacing={4}>
                <Button colorScheme="red" size="lg" w="full" onClick={() => setIsSubmitted(false)}>
                  Try Another Email
                </Button>

                <Button variant="ghost" colorScheme="red" onClick={() => navigate('/login')}>
                  Back to Login
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </Box>
      </GlassLayout>
    )
  }

  return (
    <PublicLayout>


      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" p={4}  >
        <Card maxW="500px" w="full" bg={bg} borderColor={borderColor}>
          <CardBody py={12} >
            <VStack spacing={8}>
              {/* Header */}
              <Box textAlign="center">
                <Heading size="lg" color="brand.primary" mb={2}>
                  Forgot Password?
                </Heading>
                <Text color="gray.600">
                  Enter your email address and we'll send you a link to reset your password.
                </Text>
              </Box>

              {/* Form */}
              <Formik
                initialValues={{ email: '' }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email('Please enter a valid email address')
                    .required('Email is required')
                })}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form style={{ width: '100%' }}>
                    <VStack spacing={6} align="stretch">
                      <Field name="email">
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.email && form.touched.email}>
                            <FormLabel>Email Address</FormLabel>
                            <Input
                              {...field}
                              type="email"
                              placeholder="Enter your email address"
                              size="lg"
                              bg={bg}
                              borderColor={borderColor}
                            />
                            <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>


                      <Button
                        type="submit"
                        colorScheme="red"
                        size="lg"
                        w="full"
                        isLoading={loading}
                        loadingText="Sending Reset Link"
                      >
                        Send Reset Link
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
    </PublicLayout>
  )
}

export default ForgotPassword
