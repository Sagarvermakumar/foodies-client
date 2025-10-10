
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Tooltip,
  VStack
} from '@chakra-ui/react'


import { Delete as DeleteIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MenuHeader from '../components/MenuHeader'
import { useBrandColors } from '../hooks/useBrandColors'
import CartSkeleton from '../Skeletons/CartSkeleton'
import {
  applyCoupon,
  getCart,
  removeCartItem,
  removeCoupon,
  updateCartItem
} from '../store/slices/cartSlice'
import { setQuantity } from '../store/slices/cartUISlice'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [couponCode, setCouponCode] = useState('')
  const { borderColor, bg } = useBrandColors();
  const [isRemoving, setIsRemoving] = useState(false)

  const { items, total, loading, couponApplied, discount, _id } = useSelector((state) => state.cart)




  useEffect(() => {
    dispatch(getCart())
  }, [dispatch])


  const handleQuantityChange = async (itemId, newQuantity) => {

    dispatch(updateCartItem({ itemId, quantity: newQuantity }));
    // UI slice update
    dispatch(setQuantity({ itemId, value: newQuantity }));

  };

  const handleRemoveItem = async (itemId) => {
    try {
      setIsRemoving(true)

      await dispatch(removeCartItem(itemId)).unwrap()
      dispatch(getCart())
    } catch (error) {
      console.log(error);
      setIsRemoving(false)
    } finally {
      setIsRemoving(false)
    }
  }

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code')
      return
    }

    try {
      await dispatch(applyCoupon(couponCode)).unwrap()
      toast.success('Coupon applied successfully!')
      setCouponCode('')
    } catch (error) {
      toast.error(error || 'Failed to apply coupon')
    }
  }

  const handleRemoveCoupon = async () => {
    await dispatch(removeCoupon())
    toast.success('Coupon removed')
  }

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }
    navigate(`/checkout`)
  }



  if (loading) {
    return (
      <CartSkeleton />
    )
  }

  if (items.length === 0) {
    return (
      <Box textAlign="center" py={20}>
        <Heading size="lg" color="gray.500" mb={4}>
          Your cart is emmepty
        </Heading>
        <Text color="gray.600" mb={8}>
          Add some delicious food items to get started!
        </Text>
        <Button size={{ base: "md", md: "lg" }}
          as={'a'}
          href='/menu'
        >
          Browse Menu
        </Button>
      </Box>
    )
  }

  return (
    <Box width={'100%'}  >
      <MenuHeader title={"🛒 Your Cart"} subtitle={'Review your delicious picks before checkout. Add more items or proceed to place your order.'} showBack />

      <Flex direction={{ base: 'column', lg: 'row' }} gap={8} mb={{ base: 16, sm: 16, md: 0 }}>
        {/* Cart Items */}
        <Box flex="1">
          <VStack spacing={4} align="stretch">
            {items.map((cartItems, i) => (
              <Card key={cartItems._id + i} bg={bg} border={'1px solid'} borderColor={borderColor}>
                <CardBody>
                  <HStack spacing={4} align="flex-start">
                    <Image
                      src={cartItems?.item?.image || 'https://via.placeholder.com/80x80?text=Food'}
                      alt={cartItems?.item?.name}
                      boxSize="80px"
                      objectFit="cover"
                      borderRadius="md"
                    />

                    <Box flex="1">
                      <Heading size={{ sm: 'sm', md: "md" }} mb={2}>
                        {cartItems?.item?.name}
                      </Heading>
                      <Text color="gray.600" mb={2}>
                        {cartItems?.description}
                      </Text>
                      <Text fontWeight="bold" color="brand.primary">
                        ₹{parseInt(cartItems?.item?.price)}
                      </Text>
                    </Box>

                    <VStack spacing={2} align="center">
                      <NumberInput
                        value={cartItems?.qty}
                        min={1}
                        max={99}
                        onChange={(valueString) =>
                          handleQuantityChange(cartItems._id, parseInt(valueString))
                        }
                        size="sm"
                        w="100px"
                      >
                        <NumberInputField color={'brand.primary'} border={'1px solid '} borderColor={'brand.primary'} outline={'none'} boxShadow={'none'}
                          _focus={{
                            border: "2px solid",
                            borderColor: 'brand.primary',
                            outline: "none"
                          }}
                          _active={{
                            border: "2px solid",
                            borderColor: 'brand.primary',
                            outline: "none"
                          }}
                          _focusVisible={{
                            border: "2px solid",
                            borderColor: 'brand.primary',
                            outline: "none"
                          }}
                        />
                        <NumberInputStepper>
                          <NumberIncrementStepper color={'brand.primary'} />
                          <NumberDecrementStepper color={'brand.primary'} />
                        </NumberInputStepper>
                      </NumberInput>
                      <Tooltip label={`${cartItems?.item?.name} Remove from cart`} hasArrow>
                        <IconButton
                          icon={<DeleteIcon />}
                          variant="ghost"
                          isLoading={isRemoving}
                          size="sm"
                          onClick={() => handleRemoveItem(cartItems?.item?._id)}
                          aria-label="Remove item"
                        />
                      </Tooltip>
                    </VStack>
                  </HStack>
                </CardBody>
              </Card>
            ))}
          </VStack>
        </Box>

        {/* Cart Summary */}
        <Box w={{ base: 'full', lg: '400px' }} mb={8}>
          <Card bg={bg} borderColor={borderColor} position="sticky" top="100px">
            <CardBody>
              <Heading size="md" mb={6} color="brand.primary">
                Order Summary
              </Heading>

              {/* Coupon Section */}
              <Box mb={6}>
                <Text fontWeight="medium" mb={3}>
                  Apply Coupon
                </Text>
                {!couponApplied ? (
                  <HStack>
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      size="sm"
                    />
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={handleApplyCoupon}
                      isLoading={loading}
                    >
                      Apply
                    </Button>
                  </HStack>
                ) : (
                  <Box>
                    <HStack justify="space-between" mb={2}>
                      <Text fontSize="sm" color="green.500">
                        Coupon: {couponApplied.code}
                      </Text>
                      <Button
                        size="xs"
                        variant="ghost"
                        colorScheme="red"
                        onClick={handleRemoveCoupon}
                      >
                        Remove
                      </Button>
                    </HStack>
                    <Text fontSize="sm" color="green.500">
                      Discount: -₹{discount}
                    </Text>
                  </Box>
                )}
              </Box>

              <Divider mb={4} />

              {/* Price Breakdown */}
              <VStack spacing={3} align="stretch" mb={6}>
                <HStack justify="space-between">
                  <Text>
                    Subtotal ({items.reduce((sum, item) => sum + item.qty, 0)} items)
                  </Text>
                  <Text>₹{items.reduce((sum, item) => sum + item.priceSnapshot * item.qty, 0).toFixed(2)}</Text>
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

              <Button
                colorScheme="red"
                size="lg"
                w="full"
                onClick={handleCheckout}
                isDisabled={items.length === 0}
              >
                Proceed to Checkout
              </Button>
            </CardBody>
          </Card>
        </Box>
      </Flex>
    </Box>
  )
}

export default Cart
