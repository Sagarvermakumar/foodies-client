import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  VStack,
  useDisclosure
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import OrderSuccessModal from '../components/Modal/OrderSuccessModal'
import { useBrandColors } from '../hooks/useBrandColors'
import { makeLoadingSelector } from '../store/selectors/address.selector'
import {
  getAllAddresses,
  getDefaultAddress,
} from '../store/slices/addressSlice'
import { clearCart } from '../store/slices/cartSlice'
import { checkoutOrder, startCheckout } from '../store/slices/orderSlice'

const gatewayOptions = {
  COD: ['NONE'],
  CARD: ['RAZORPAY', 'STRIPE', 'PAYPAL'],
  UPI: ['RAZORPAY'],
  WALLET: ['RAZORPAY'],
}

const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { bg, borderColor } = useBrandColors()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    addresses,
    defaultAddress,

  } = useSelector((state) => state.address)

  const isLoadingAddress = useSelector(makeLoadingSelector('all'))
  const { loading: orderLoading, cartId } = useSelector((state) => state.order)

  const [selectedAddress, setSelectedAddress] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('COD') // COD | CARD | UPI | WALLET
  const [gateway, setGateway] = useState('NONE')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const { items, total, couponApplied } = useSelector((state) => state.cart);

  console.log(items)

  const { discount } = total

  useEffect(() => {
    dispatch(getAllAddresses())
    dispatch(getDefaultAddress())
    dispatch(startCheckout())
  }, [dispatch])

  useEffect(() => {
    if (defaultAddress) {
      setSelectedAddress(defaultAddress._id)
    } else if (addresses.length > 0) {
      setSelectedAddress(addresses[0]._id)
    }
  }, [defaultAddress, addresses])

  const handleAddressChange = (addressId) => {
    setSelectedAddress(addressId)
  }

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method)
  }

  const getSelectedAddressData = () => {
    return addresses.find((addr) => addr._id === selectedAddress)
  }
  // handleOrderSuccess
  const handleOrderSuccess = async (paymentResponse) => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address')
      return
    }

    try {
      const paymentData = {
        method: paymentMethod,
        status:
          paymentResponse?.status ||
          (paymentMethod === 'COD' ? 'PENDING' : 'SUCCESS'),
        gateway:
          paymentResponse?.gateway ||
          (paymentMethod === 'COD' ? 'NONE' : 'RAZORPAY'),
        txnId:
          paymentResponse?.razorpay_payment_id || paymentResponse?.id || null,
      }

      const orderData = {
        cartId,
        address: getSelectedAddressData(),
        paymentDetails: paymentData,
        couponApplied: couponApplied?.code || null,
      }

      await dispatch(checkoutOrder(orderData)).unwrap()

      setOrderPlaced(true)
      onOpen()
      toast.success('Order placed successfully!')
      setTimeout(() => {
        dispatch(clearCart())
        navigate('/orders')
      }, 6000)



    } catch (error) {
      toast.error(error || 'Failed to place order')
      console.log(error)
    }
  }

  useEffect(() => {
    if (items.length === 0 && !orderPlaced) {
      navigate('/cart')
    }
  }, [items.length, orderPlaced, navigate])

  if (isLoadingAddress || orderLoading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" color="brand.primary" />
        <Text mt={4}>Loading checkout...</Text>
      </Box>
    )
  }

  if (items.length === 0) {
    return null
  }

  return (
    <Box>
      <Heading size="lg" mb={8} color="brand.primary">
        Checkout
      </Heading>

      <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
        {/* Left Column - Address & Payment */}
        <Box flex="1">
          {/* Delivery Address */}
          <Card bg={bg} borderColor={borderColor} mb={6}>
            <CardBody>
              <Heading size="md" mb={4} color="brand.primary">
                Delivery Address
              </Heading>

              {addresses.length === 0 ? (
                <Alert status="warning">
                  <AlertIcon />
                  <Text>No addresses found. Please add an address first.</Text>
                </Alert>
              ) : (
                <RadioGroup
                  value={selectedAddress}
                  onChange={handleAddressChange}
                >
                  <Stack spacing={3}>
                    {addresses.map((address) => (
                      <Radio
                        colorScheme="yellow"
                        key={address.id}
                        value={address._id}
                      >
                        <Box ml={3}>
                          <HStack justify="space-between" align="flex-start">
                            <VStack align="flex-start" spacing={1}>
                              <Text fontWeight="medium">
                                {address.label}
                                {address.isDefaultAddress && (
                                  <Badge ml={2} colorScheme="green" size="sm">
                                    Default
                                  </Badge>
                                )}
                              </Text>
                              <Text fontSize="sm" color="gray.600">
                                {address.addressLine}
                              </Text>
                              <Text fontSize="sm" color="gray.600">
                                {address.location.point}
                              </Text>
                            </VStack>
                          </HStack>
                        </Box>
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              )}

              <Button
                variant="outline"
                size={'sm'}
                mt={4}
                onClick={() => navigate('/profile')}
              >
                Manage Addresses
              </Button>
            </CardBody>
          </Card>

          {/* Payment Method */}
          <Card bg={bg} borderColor={borderColor} mb={6}>
            <CardBody>
              <Heading size="md" mb={4} color="brand.primary">
                Payment Method
              </Heading>
              <Box>
                <RadioGroup
                  colorScheme="yellow"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                >
                  <Stack spacing={3}>
                    <Radio value="CARD">
                      <HStack ml={3}>
                        <Text>Credit/Debit Card</Text>
                        <Badge colorScheme="blue">Secure</Badge>
                      </HStack>
                    </Radio>
                    <Radio value="UPI">
                      <HStack ml={3}>
                        <Text>UPI</Text>
                        <Badge colorScheme="blue">Secure</Badge>
                      </HStack>
                    </Radio>
                    <Radio value="WALLET" colorScheme="yellow">
                      <HStack ml={3}>
                        <Text>Wallet</Text>
                        <Badge colorScheme="blue">Secure</Badge>
                      </HStack>
                    </Radio>

                    <Radio value="COD">
                      <HStack ml={3}>
                        <Text>Cash on Delivery</Text>
                        <Badge colorScheme="gray">Coming Soon</Badge>
                      </HStack>
                    </Radio>
                  </Stack>
                </RadioGroup>

                {gatewayOptions[paymentMethod].length > 0 && (
                  <Box mt={4}>
                    <Text fontSize="lg" mb={2}>
                      Select Gateway
                    </Text>
                    <RadioGroup onChange={setGateway} value={gateway}>
                      <Stack direction="column">
                        {gatewayOptions[paymentMethod].map((g) => (
                          <Radio key={g} value={g} colorScheme="yellow">
                            {g}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                  </Box>
                )}
              </Box>
            </CardBody>
          </Card>
        </Box>

        {/* Right Column - Order Summary */}
        <Box w={{ base: 'full', lg: '400px' }}>
          <Card bg={bg} borderColor={borderColor} position="sticky" top="100px">
            <CardBody>
              <Heading size="md" mb={6} color="brand.primary">
                Order Summary
              </Heading>

              {/* Order Items */}
              <VStack spacing={3} align="stretch" mb={6}>
                {items.map((item) => (
                  <HStack key={item.id} justify="space-between">
                    <HStack spacing={3}>
                      <Image
                        src={
                          item.item.image ||
                          'https://via.placeholder.com/40x40?text=Food'
                        }
                        alt={item.item.name}
                        boxSize="40px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      <Box>
                        <Text fontWeight="medium" fontSize="sm">
                          {item.item.name}
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                          Qty: {item.qty}
                        </Text>
                      </Box>
                    </HStack>
                    <Text fontWeight="medium">
                      ₹{parseInt(item?.item?.price)}
                    </Text>
                  </HStack>
                ))}
              </VStack>

              <Divider mb={4} />

              {/* Price Breakdown */}
              <VStack spacing={3} align="stretch" mb={6}>
                <HStack justify="space-between">
                  <Text>
                    Subtotal ({items.reduce((sum, item) => sum + item.qty, 0)}{' '}
                    items)
                  </Text>
                  <Text>
                    ₹
                    {items
                      .reduce(
                        (sum, item) => sum + item.priceSnapshot * item.qty,
                        0
                      )
                      .toFixed(2)}
                  </Text>
                </HStack>

                {couponApplied && (
                  <HStack justify="space-between">
                    <Text color="green.500">Discount</Text>
                    <Text color="green.500">-₹{discount}</Text>
                  </HStack>
                )}

                <HStack justify="space-between">
                  <Text>Delivery Fee</Text>
                  <Text>₹{total.deliveryFee}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text>Tax</Text>
                  <Text>₹{total.tax}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="green.500">Discount</Text>
                  <Text color="green.500">-₹{total.discount}</Text>
                </HStack>

                <Divider />

                <HStack justify="space-between" fontWeight="bold">
                  <Text fontSize="lg">Total</Text>
                  <Text fontSize="lg" color="brand.primary">
                    ₹{total.grandTotal}
                  </Text>
                </HStack>
              </VStack>

              {/* Place Order Button */}
              <Button
                colorScheme="red"
                size="lg"
                w="full"
                onClick={handleOrderSuccess}
              // isLoading={isProcessing}
              // isDisabled={!selectedAddress || items.length === 0}
              >
                Place Order
              </Button>

              <Text fontSize="xs" color="gray.500" textAlign="center" mt={3}>
                By placing this order, you agree to our terms and conditions
              </Text>
            </CardBody>
          </Card>
        </Box>
      </Flex>

      {/* Success Modal */}
      <OrderSuccessModal isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}

export default Checkout
