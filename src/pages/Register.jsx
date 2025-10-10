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
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Stack,
  Text,
  useColorMode,
  useToast,
  VStack
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, Mail, Truck } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import AuthInfoBox from '../components/AuthInfoBox'
import { useBrandColors } from '../hooks/useBrandColors'
import PublicLayout from '../Layout/PublicLayout'
import { authSelectors } from '../store/selectors/authSelectors'
import { createUser } from '../store/slices/authSlice'
import { registrationSchema } from '../utils/validationSchemas'
const MotionCard = motion(Card);
const MotionBox = motion(Box);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      type: "spring",
      stiffness: 200,
    },
  }),
};
const Register = () => {
  const location = useLocation();

  const { colorMode } = useColorMode()
  const { bg, borderColor, color } = useBrandColors()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useToast()

  const loading = useSelector(authSelectors.isLoading)
  const from = location.state?.from?.pathname || "/";
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await dispatch(createUser(values)).unwrap()
      toast({
        title: 'Registration successful',
        description: 'Welcome to Zayka Express!',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      navigate(from, { replace: true });
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PublicLayout>
      <Flex
        minH="100vh"
        align="center"
        justify="center"
        p={{ sm: 4, md: 8, lg: 12 }}
        gap={{ sm: 2, base: 2, md: 2, lg: 8 }}

      >
        {/* ===== Left Content (Animated) ===== */}
        <MotionBox
          flex={1}
          display={{ base: "none", md: "flex" }}
          flexDir="column"
          justifyContent="center"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          boxShadow={colorMode === "dark" ? "dark-lg" : "none"}
          px={8}
          py={16}
        >
          <MotionBox custom={0} initial="hidden" animate="visible" variants={fadeUp}>
            <Heading size="2xl" color={color} mb={4}>
              Join <span style={{ color: "#f80" }}>Zayka Express</span> 🍔
            </Heading>
          </MotionBox>

          <MotionBox custom={1} initial="hidden" animate="visible" variants={fadeUp}>
            <Text fontSize="lg" color="gray.500" mb={2}>
              Create your account to enjoy fast food delivery at your fingertips.
            </Text>
          </MotionBox>

          <MotionBox custom={2} initial="hidden" animate="visible" variants={fadeUp}>
            <Text fontSize="md" color="gray.500" mb={2}>
              Track your orders in real-time, get exclusive discounts, and earn
              loyalty rewards.
            </Text>
          </MotionBox>

          <MotionBox custom={3} initial="hidden" animate="visible" variants={fadeUp}>
            <Text fontSize="md" color="gray.500">
              Be part of the <b style={{ color: "#f80" }}>Zayka Express</b> — quick,
              tasty, and rewarding!
            </Text>
          </MotionBox>

          <Stack spacing={3} mt={3}>
            <MotionBox custom={4} initial="hidden" animate="visible" variants={fadeUp}>
              <Flex align="center" gap={2}>
                <Mail size={18} color="#f80" />
                <Text fontSize="md" color="gray.600">
                  Register with your email & password.
                </Text>
              </Flex>
            </MotionBox>

            <MotionBox custom={5} initial="hidden" animate="visible" variants={fadeUp}>
              <Flex align="center" gap={2}>
                <Lock size={18} color="#f80" />
                <Text fontSize="md" color="gray.600">
                  Keep your account safe with encrypted register.
                </Text>
              </Flex>
            </MotionBox>

            <MotionBox custom={6} initial="hidden" animate="visible" variants={fadeUp}>
              <Flex align="center" gap={2}>
                <Truck size={18} color="#f80" />
                <Text fontSize="md" color="gray.600">
                  Track orders in real-time as they reach your doorstep.
                </Text>
              </Flex>
            </MotionBox>
          </Stack>
        </MotionBox>

        {/* ===== Right Form ===== */}
        <MotionCard
          maxW="lg"
          w="full"
          bg={bg}
          borderColor={borderColor}
          flex={1}
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <CardBody p={6}>
            <VStack spacing={{ sm: 2, md: 2, lg: 6 }} align="stretch">
              <AuthInfoBox type={'register'} />

              {/* ====== Register Form Fields ====== */}
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  phone: '',
                  password: '',
                  confirmPassword: '',
                  referralCode: ''
                }}
                validationSchema={registrationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched, values, setFieldValue }) => (
                  <Form>
                    <SimpleGrid spacing={8} gap={8} width={'full'} columns={[1, 2]} rowGap={8} pb={4} >
                      <Field name="name">
                        {({ field }) => (
                          <FormControl isInvalid={errors.name && touched.name}>
                            <FormLabel>Full Name</FormLabel>
                            <Input {...field} placeholder="John Doe" type="text" />
                            <FormErrorMessage>{errors.name}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="email">
                        {({ field }) => (
                          <FormControl isInvalid={errors.email && touched.email}>
                            <FormLabel>Email</FormLabel>
                            <Input {...field} placeholder="jhon@gmail.com" type="email" />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="phone">
                        {({ field }) => (
                          <FormControl isInvalid={errors.phone && touched.phone}>
                            <FormLabel>Phone Number</FormLabel>
                            <Input {...field} placeholder="+91 123-456-7890" type="tel" />
                            <FormErrorMessage>{errors.phone}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="password">
                        {({ field }) => (
                          <FormControl isInvalid={errors.password && touched.password}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                              <Input
                                {...field}
                                placeholder="Enter password"
                                type={showPassword ? 'text' : 'password'}
                              />
                              <InputRightElement>
                                <IconButton
                                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                                  icon={showPassword ? <EyeOff /> : <Eye />}
                                  onClick={() => setShowPassword(!showPassword)}
                                  variant="ghost"
                                  size="sm"
                                />
                              </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>{errors.password}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>



                      <Field name="referralCode">
                        {({ field }) => (
                          <FormControl>
                            <FormLabel>Referral Code (Optional)</FormLabel>
                            <Input {...field} placeholder="Enter referral code if any" type="text" />
                          </FormControl>
                        )}
                      </Field>


                    </SimpleGrid>
                    <Button
                      type="submit"
                      colorScheme="red"
                      size={{ base: "md", md: 'lg' }}
                      w="full"
                      mb={2}
                      isLoading={loading || isSubmitting}
                    >
                      Create Account
                    </Button>
                  </Form>
                )}
              </Formik>

              {/* Already have account */}
              <Text fontSize="sm" textAlign="center">
                Already have an account?{" "}
                <RouterLink to="/login" style={{ color: "#f80" }}>
                  Login
                </RouterLink>
              </Text>
            </VStack>
          </CardBody>
        </MotionCard>
      </Flex>
    </PublicLayout>

  )
}



export default Register
