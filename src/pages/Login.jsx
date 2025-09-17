import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorMode,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Clock,
  Eye,
  EyeOff,
  Gift,
  Lock,
  Mail,
  Shield,
  Truck,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { brandName, brandPrimary } from '../brand.config'
import AuthInfoBox from '../components/AuthInfoBox'
import { useBrandColors } from '../hooks/useBrandColors'
import PublicLayout from '../Layout/PublicLayout'
import { authSelectors } from '../store/selectors/authSelectors'
import { emailOtpLogin, loginUser, verifyOTP } from '../store/slices/authSlice'
import { loginSchema, otpSchema } from '../utils/validationSchemas'
const MotionBox = motion(Box)
const MotionVStack = motion(VStack)

const swapVariants = {
  enterLeft: { x: -100, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitRight: { x: 100, opacity: 0 },
  enterRight: { x: 100, opacity: 0 },
  exitLeft: { x: -100, opacity: 0 },
}

const Login = () => {
  const location = useLocation();
  const { colorMode } = useColorMode()

  const { bg, borderColor, color } = useBrandColors()
  const [showPassword, setShowPassword] = useState(false)
  const [showOtp, setShowOtp] = useState(false)
  const [otpEmail, setOtpEmail] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()
  const user = useSelector(authSelectors.getUser)

  const loading = useSelector(authSelectors.isLoading)
  const error = useSelector(authSelectors.getError)
  const otpSent = useSelector(authSelectors.isOtpSent)
  const otpVerified = useSelector(authSelectors.isOtpVerified)

  const from = location.state?.from?.pathname || '/'
  const handlePasswordLogin = async (values, { setSubmitting }) => {
    try {
      await dispatch(loginUser(values)).unwrap()
      navigate(from, { replace: true })
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.log(error)
      toast({
        title: 'Login failed',
        description: 'error',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleOtpRequest = async (values, { setSubmitting }) => {
    try {
      await dispatch(emailOtpLogin(values.email)).unwrap()
      setOtpEmail(values.email)
      toast({
        title: 'OTP sent',
        description: 'Please check your email for the OTP',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.log(error)
      toast({
        title: 'OTP send failed',
        description: 'error',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setSubmitting(false)
    }
  }
  const [isOtpLogin, setIsOtpLogin] = useState(false)

  const handleOtpVerification = async (values, { setSubmitting }) => {
    try {
      await dispatch(verifyOTP({ email: otpEmail, otp: values.otp })).unwrap()
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      navigate('/')
    } catch (error) {
      console.log(error)
      toast({
        title: 'OTP verification failed',
        description: 'error',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PublicLayout>
      <Flex minH="100vh" w="100%" flexDir={{ base: 'column', lg: 'row' }}>
        {/* ===== Left Side (Info / Swap) ===== */}
        <Flex
          flex={1}
          display={{ base: 'none', lg: 'flex' }}
          align="center"
          justify="center"
          p={12}
        >
          <AnimatePresence mode="wait" initial={false}>
            {!isOtpLogin ? (
              <MotionVStack
                key="email-info"
                spacing={6}
                textAlign="center"
                color="gray.800"
                maxW="lg"
                variants={swapVariants}
                initial="enterLeft"
                animate="center"
                exit="exitRight"
                transition={{ duration: 0.6 }}
                boxShadow={colorMode === "dark" ? "dark-lg" : "none"}
                px={8}
                py={16}
              >
                <Heading size="2xl" color={color}>
                  Welcome Back 👋
                </Heading>

                <Text fontSize="lg" color={color}>
                  Access your <b style={{ color: '#f80' }}>Zayka Express</b>{' '}
                  account securely.
                </Text>

                <Flex align="center" gap={2} mt={3}>
                  <Mail size={18} color="#f80" />
                  <Text fontSize="md" color="gray.600">
                    Login with your registered email & password.
                  </Text>
                </Flex>

                <Flex align="center" gap={2}>
                  <Lock size={18} color="#f80" />
                  <Text fontSize="md" color="gray.600">
                    Keep your account safe with encrypted login.
                  </Text>
                </Flex>

                <Flex align="center" gap={2}>
                  <Truck size={18} color="#f80" />
                  <Text fontSize="md" color="gray.600">
                    Track orders in real-time as they reach your doorstep.
                  </Text>
                </Flex>

                <Flex align="center" gap={2}>
                  <Gift size={18} color="#f80" />
                  <Text fontSize="md" color="gray.600">
                    Unlock exclusive rewards and foodie offers.
                  </Text>
                </Flex>

                <Button variant="outline" onClick={() => setIsOtpLogin(true)}>
                  Login with OTP
                </Button>
              </MotionVStack>
            ) : (
              <MotionVStack
                key="otp-info"
                spacing={6}
                textAlign="center"
                color="gray.800"
                maxW="lg"
                variants={swapVariants}
                initial="enterLeft"
                animate="center"
                exit="exitRight"
                transition={{ duration: 0.6 }}
                boxShadow={colorMode === "dark" ? "dark-lg" : "none"}
                px={8}
                py={16}
              >
                <Heading size="2xl" color={color}>
                  Quick Login ⚡
                </Heading>
                <Text fontSize="lg" color={color}>
                  No passwords needed — get instant access with OTP.
                </Text>

                <Flex align="center" gap={2} mt={3}>
                  <Zap size={18} color="#f80" />
                  <Text fontSize="md" color="gray.500">
                    One-tap secure login via your email.
                  </Text>
                </Flex>

                <Flex align="center" gap={2}>
                  <Clock size={18} color="#f80" />
                  <Text fontSize="md" color="gray.500">
                    Faster access, no waiting — order in seconds.
                  </Text>
                </Flex>

                <Flex align="center" gap={2}>
                  <Shield size={18} color="#f80" />
                  <Text fontSize="md" color="gray.500">
                    Verified OTP ensures maximum security.
                  </Text>
                </Flex>

                <Flex align="center" gap={2}>
                  <Truck size={18} color="#f80" />
                  <Text fontSize="md" color="gray.500">
                    Perfect for foodies who want speed & convenience.
                  </Text>
                </Flex>
                <Button variant="outline" onClick={() => setIsOtpLogin(false)}>
                  Login with Email & Password
                </Button>
              </MotionVStack>
            )}
          </AnimatePresence>
        </Flex>

        {/* ===== Right Side (Forms) ===== */}
        <Flex
          flex={1}
          align="center"
          justify="center"
          py={8}
          px={{ base: 4, md: 12 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {!isOtpLogin ? (
              <MotionBox
                key="email-form"
                variants={swapVariants}
                initial="enterRight"
                animate="center"
                exit="exitLeft"
                transition={{ duration: 0.6 }}
                w="100%"
                maxW="lg"
                bg={bg}
              >
                <Card
                  w="full"
                  p={8}
                  bg={'transparent'}
                  border={'1px solid'}
                  borderColor={borderColor}
                  shadow="lg"
                  borderRadius="lg"
                >
                  <CardBody>
                    <VStack spacing={6} align="stretch">
                      <Formik
                        initialValues={{ emailOrPhone: '', password: '' }}
                        validationSchema={loginSchema}
                        onSubmit={handlePasswordLogin}
                      >
                        {({ isSubmitting, errors, touched }) => (
                          <Form>
                            <VStack spacing={6}>
                              <AuthInfoBox type="email" />
                              <Field name="emailOrPhone">
                                {({ field }) => (
                                  <FormControl
                                    isInvalid={
                                      errors.emailOrPhone &&
                                      touched.emailOrPhone
                                    }
                                  >
                                    <FormLabel color={'gray.500'}>
                                      Email or Phone
                                    </FormLabel>
                                    <Input
                                      {...field}
                                      placeholder="Enter email or phone"
                                      type="text"
                                    />
                                    <FormErrorMessage>
                                      {errors.emailOrPhone}
                                    </FormErrorMessage>
                                  </FormControl>
                                )}
                              </Field>

                              <Field name="password">
                                {({ field }) => (
                                  <FormControl
                                    isInvalid={
                                      errors.password && touched.password
                                    }
                                  >
                                    <FormLabel color={'gray.500'}>
                                      Password
                                    </FormLabel>
                                    <InputGroup>
                                      <Input
                                        {...field}
                                        placeholder="Enter password"
                                        type={
                                          showPassword ? 'text' : 'password'
                                        }
                                      />
                                      <InputRightElement>
                                        <IconButton
                                          aria-label={
                                            showPassword
                                              ? 'Hide password'
                                              : 'Show password'
                                          }
                                          icon={
                                            showPassword ? <EyeOff /> : <Eye />
                                          }
                                          onClick={() =>
                                            setShowPassword(!showPassword)
                                          }
                                          variant="ghost"
                                          size="sm"
                                          border="none"
                                          outline="none"
                                          _hover={{ bg: 'red.50' }}
                                          _active={{
                                            bg: 'transparent',
                                            border: 'none',
                                            outline: 'none',
                                          }}
                                          _focus={{
                                            boxShadow: 'none',
                                            border: 'none',
                                            outline: 'none',
                                          }}
                                          _focusVisible={{
                                            boxShadow: 'none',
                                            border: 'none',
                                            outline: 'none',
                                          }}
                                        />
                                      </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>
                                      {errors.password}
                                    </FormErrorMessage>
                                  </FormControl>
                                )}
                              </Field>

                              <Button
                                type="submit"
                                variant={'solid'}
                                w="full"
                                isLoading={loading || isSubmitting}
                              >
                                Login
                              </Button>
                              <HStack
                                spacing={3}
                                w="full"
                                mt={4}
                                justify={'space-between'}
                              >
                                {/* Forgot Password */}
                                <Button
                                  as={RouterLink}
                                  to="/forgot-password"
                                  variant="ghost"
                                  colorScheme="red"
                                  size="sm"
                                  fontWeight="medium"
                                >
                                  Forgot Password?
                                </Button>

                                {/* New User Register */}
                                <Button
                                  as={RouterLink}
                                  to="/register"
                                  variant="ghost"
                                  colorScheme="red"
                                  size="sm"
                                  fontWeight="medium"
                                >
                                  New User? Register
                                </Button>
                              </HStack>
                            </VStack>
                          </Form>
                        )}
                      </Formik>
                      {/* Mobile Toggle */}
                      <Button
                        display={{ base: 'block', lg: 'none' }}
                        variant="outline"
                        colorScheme="orange"
                        onClick={() => setIsOtpLogin(true)}
                      >
                        Login with OTP
                      </Button>
                    </VStack>
                  </CardBody>
                </Card>
              </MotionBox>
            ) : (
              <MotionBox
                key="otp-form"
                variants={swapVariants}
                initial="enterRight"
                animate="center"
                exit="exitLeft"
                transition={{ duration: 0.6 }}
                w="100%"
                maxW="md"
                bg={bg}
                borderColor={borderColor}
                shadow="lg"
                borderRadius="lg"
              >
                {!otpSent ? (
                  <Formik
                    initialValues={{ email: '' }}
                    validationSchema={otpSchema}
                    onSubmit={handleOtpRequest}
                  >
                    {({ isSubmitting, errors, touched }) => (
                      <Form>
                        <VStack
                          spacing={4}
                          p={8}
                          bg={'transparent'}
                          border={'1px solid'}
                          borderColor={borderColor}
                          shadow="lg"
                          borderRadius="lg"
                        >
                          <AuthInfoBox type="otp" />

                          <MotionBox
                            display={{ base: 'none', md: 'block' }} // only visible in small screens
                            p={4}
                            mb={4}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <Flex direction="column" textAlign="center">
                              <Heading size="lg" mb={2} color={color}>
                                Login to{' '}
                                <span
                                  style={{
                                    color: brandPrimary,
                                  }}
                                >
                                  {brandName}
                                </span>
                              </Heading>
                              <Text fontSize="sm" color="gray.500">
                                Get instant access using secure OTP sent to your
                                email
                              </Text>
                            </Flex>
                          </MotionBox>
                          <Field name="email">
                            {({ field }) => (
                              <FormControl
                                isInvalid={errors.email && touched.email}
                              >
                                <FormLabel>Email</FormLabel>
                                <Input
                                  {...field}
                                  placeholder="Enter your email"
                                  type="email"
                                />
                                <FormErrorMessage>
                                  {errors.email}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>

                          <Button
                            type="submit"
                            colorScheme="red"
                            size="md"
                            w="full"
                            isLoading={loading || isSubmitting}
                          >
                            Send OTP
                          </Button>
                          {/* Mobile Toggle */}
                          <Button
                            display={{ base: 'block', lg: 'none' }}
                            variant="outline"
                            width={'full'}
                            onClick={() => setIsOtpLogin(false)}
                          >
                            Login with Password
                          </Button>
                        </VStack>
                      </Form>
                    )}
                  </Formik>
                ) : (
                  <Formik
                    initialValues={{ otp: '' }}
                    validationSchema={otpSchema}
                    onSubmit={handleOtpVerification}
                  >
                    {({ isSubmitting, errors, touched }) => (
                      <Form>
                        <VStack spacing={4}>
                          <Text
                            textAlign="center"
                            fontSize="sm"
                            color="gray.600"
                          >
                            OTP sent to {otpEmail}
                          </Text>

                          <Field name="otp">
                            {({ field }) => (
                              <FormControl
                                isInvalid={errors.otp && touched.otp}
                              >
                                <FormLabel>OTP</FormLabel>
                                <Input
                                  {...field}
                                  placeholder="Enter 6-digit OTP"
                                  type="text"
                                  maxLength={6}
                                />
                                <FormErrorMessage>
                                  {errors.otp}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>

                          <Button
                            type="submit"
                            colorScheme="red"
                            size="lg"
                            w="full"
                            isLoading={loading || isSubmitting}
                          >
                            Verify OTP
                          </Button>
                        </VStack>
                      </Form>
                    )}
                  </Formik>
                )}
              </MotionBox>
            )}
          </AnimatePresence>
        </Flex>
      </Flex>
    </PublicLayout>
  )
}

export default Login
