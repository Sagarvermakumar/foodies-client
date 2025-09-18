import { cancelOrder, getOrderById, quickRepeatOrder, startCheckOut } from '../store/slices/orderSlice'

import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Select,
  Spinner,
  Text,
  Textarea,
  VStack,
  useDisclosure
} from '@chakra-ui/react'
import {
  ArrowLeft as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  CreditCard as CreditCardIcon,
  MapPin as MapPinIcon,
  Phone as PhoneIcon,
  Repeat as RepeatIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useBrandColors } from '../hooks/useBrandColors'

const OrderDetails = () => {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isCancelling, setIsCancelling] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { currentOrder, loading, cartId } = useSelector((state) => state.order)
  const { bg, color } = useBrandColors()
  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId))
    }
  }, [dispatch, orderId])


  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");

  const handleCancel = async () => {
    if (!currentOrder) return toast.error("Invalid Action")

    if (!reason) return toast.error("Select Cancellation Reason First")

    setIsCancelling(true)
    try {

      await dispatch(cancelOrder({ orderId: currentOrder._id, reason, comment })).unwrap()
      toast.success('Order cancelled successfully');
      onClose()

    } catch (error) {
      console.log(error)
      toast.error('Failed to cancel order')

    } finally {
      setIsCancelling(false)
    }
  }
  const handleQuickRepeat = async (id) => {
    if (!currentOrder) return
    try {
      await dispatch(startCheckOut()).unwrap()
      await dispatch(quickRepeatOrder({ id, cartId })).unwrap()
      toast.success('Order added to cart!')

      navigate('/cart')
    } catch (error) {
      console.log(error)
      toast.error('Failed to repeat order')
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'placed':
        return 'yellow'
      case 'confirmed':
        return 'blue'
      case 'preparing':
        return 'orange'
      case 'out_for_delivery':
        return 'purple'
      case 'delivered':
        return 'green'
      case 'cancelled':
        return 'red'
      default:
        return 'gray'
    }
  }

  const getStatusText = (status) => {
    return status
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const getStatusStep = (status) => {
    const statusSteps = {
      pending: 1,
      confirmed: 2,
      preparing: 3,
      ready: 4,
      assigned: 5,
      picked: 6,
      out_for_delivery: 7,
      delivered: 8,
      cancelled: 0
    }
    return statusSteps[status.toLowerCase()] || 0
  }

  const getStatusDescription = (status) => {
    const descriptions = {
      placed: 'Your order has been placed and is awaiting confirmation.',
      confirmed: 'Your order has been confirmed and will be prepared soon.',
      preparing: 'Our chefs are preparing your delicious food.',
      ready: 'Your order is ready and waiting to be handed over to the delivery partner.',
      assigned: 'A delivery partner has been assigned to your order.',
      picked: 'The delivery partner has picked up your order and is on the way.',
      out_for_delivery: 'Your order is out for delivery and will reach you shortly.',
      delivered: 'Your order has been successfully delivered. Enjoy your meal!',
      cancelled: 'Your order has been cancelled. We regret the inconvenience.'
    };

    return descriptions[status.toLowerCase()] || 'Order status unknown'
  }

  const canCancelOrder = (status) => {
    return ['placed', 'confirmed'].includes(status.toLowerCase())
  }

  if (loading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" color="brand.primary" />
        <Text mt={4}>Loading order details...</Text>
      </Box>
    )
  }

  if (!currentOrder) {
    return (
      <Box textAlign="center" py={20}>
        <Heading size="lg" color="gray.500" mb={4}>
          Order not found
        </Heading>
        <Text color="gray.600" mb={8}>
          The order you're looking for doesn't exist or has been removed.
        </Text>
        <Button colorScheme="red" size="lg" onClick={() => navigate('/orders')}>
          Back to Orders
        </Button>
      </Box>
    )
  }

  const statusStep = getStatusStep(currentOrder.currentOrderStatus)
  const isCancelled = currentOrder.currentOrderStatus.toLowerCase() === 'cancelled'



  return (
    <Box>
      {/* Header */}

      {/* Left side */}
      <HStack spacing={3} mb={6} >
        <Button
          variant="ghost"
          size="lg"
          leftIcon={<ArrowBackIcon />}
          onClick={() => navigate("/orders")}
        >
          Orders
        </Button>
        <Heading
          size={{ base: "sm", md: "md" }}
          color="brand.primary"
          wordBreak="break-word"
        >
          🆔{currentOrder.orderNo}
        </Heading>
      </HStack>

      {/* Right side */}



      <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
        {/* Left Column - Order Status & Items */}
        <Box flex="1">
          {/* Order Status */}
          <Card bg={bg} borderColor={'red'} mb={6} >
            <CardBody>
              <VStack spacing={6} align="stretch">
                <Box>
                  <HStack justify="space-between" mb={4}>
                    <Heading size="md" color="brand.primary">
                      Order Status
                    </Heading>
                    <Badge colorScheme={getStatusColor(currentOrder.currentOrderStatus)} size="lg">
                      {getStatusText(currentOrder.currentOrderStatus)}
                    </Badge>

                  </HStack>

                  <Text color="gray.600" mb={6}>
                    {getStatusDescription(currentOrder.currentOrderStatus)}
                  </Text>

                  {/* Status Progress */}
                  {!isCancelled && (
                    <Box>
                      <Progress
                        value={(statusStep / 8) * 100}
                        colorScheme="pink"
                        size="lg"
                        borderRadius="full"
                        mb={4}
                      />
                      <Flex justify="space-between" fontSize="sm" color="gray.600">
                        <Text>Order Placed</Text>
                        <Text>Confirmed</Text>
                        <Text>Preparing</Text>
                        <Text>Out for Delivery</Text>
                        <Text>Delivered</Text>
                      </Flex>
                    </Box>
                  )}
                </Box>

                {/* Order Timeline */}
                <Box>
                  <Text fontWeight="medium" mb={3}>
                    Order Timeline
                  </Text>
                  <VStack spacing={3} align="stretch">
                    <HStack>
                      <Icon as={CheckCircleIcon} color="green.500" />
                      <Text fontSize="sm">
                        Order placed on{' '}
                        {new Date(currentOrder.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Text>
                    </HStack>
                    {currentOrder.confirmedAt && (
                      <HStack>
                        <Icon as={CheckCircleIcon} color="green.500" />
                        <Text fontSize="sm">
                          Order confirmed on{' '}
                          {new Date(currentOrder.confirmedAt).toLocaleDateString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </Text>
                      </HStack>
                    )}
                    {currentOrder.deliveredAt && (
                      <HStack>
                        <Icon as={CheckCircleIcon} color="green.500" />
                        <Text fontSize="sm">
                          Order delivered on{' '}
                          {new Date(currentOrder.deliveredAt).toLocaleDateString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </Text>
                      </HStack>
                    )}
                  </VStack>
                </Box>
              </VStack>
            </CardBody>
          </Card>

          {/* Order Items */}
          <Card bg={bg} borderColor={'red'} >
            <CardBody>
              <Heading size="md" mb={4} color="brand.primary">
                Order Items
              </Heading>

              <VStack spacing={4} align="stretch">
                {currentOrder.items.map(({ item, qty, unitPrice }, index) => (
                  <HStack key={item.name + index} justify="space-between" p={4} bg={'transparent'} borderRadius="md">
                    <HStack spacing={4}>
                      <Image
                        src={item.image || 'https://via.placeholder.com/60x60?text=Food'}
                        alt={item.name}
                        boxSize="60px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      <Box>
                        <Text fontWeight="medium" fontSize="lg">
                          {item.name}
                        </Text>
                        <Text fontSize="sm" color="gray.600" noOfLines={2}>
                          {item.description}
                        </Text>
                        <HStack spacing={4} mt={2}>
                          <Badge colorScheme="blue" variant="subtle">
                            Qty: {qty}
                          </Badge>
                          {item.isVeg !== undefined && (
                            <Badge colorScheme={item.isVeg ? 'green' : 'red'} variant="subtle">
                              {item.isVeg ? 'Veg' : 'Non-Veg'}
                            </Badge>
                          )}
                        </HStack>
                      </Box>
                    </HStack>
                    <Text fontWeight="bold" fontSize="lg" color="brand.primary">
                      ₹{unitPrice * qty}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </CardBody>
          </Card>
        </Box>

        {/* Right Column - Delivery & Payment */}
        <Box w={{ base: 'full', lg: '400px' }}>
          {/* Delivery Details */}
          <Card bg={bg} borderColor={'red'} mb={6}>
            <CardBody>
              <Heading size="md" mb={4} color="brand.primary">
                Delivery Details
              </Heading>

              <VStack spacing={4} align="stretch">
                <HStack>
                  <Icon as={MapPinIcon} color="brand.primary" />
                  <Box>
                    <Text fontWeight="medium">{currentOrder.address?.label}</Text>
                    <Text fontSize="sm" color="gray.600">
                      {currentOrder.address?.addressLine}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {currentOrder.address?.street}
                    </Text>
                  </Box>
                </HStack>

                <HStack>
                  <Icon as={PhoneIcon} color="brand.primary" />
                  <Text fontSize="sm" color="gray.600">
                    Contact: {currentOrder.address?.contactPhone || 'N/A'}
                  </Text>
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          {/* Payment Details */}
          <Card bg={bg} borderColor={'red'} mb={6}>
            <CardBody>
              <Heading size="md" mb={4} color="brand.primary">
                Payment Details
              </Heading>

              <VStack spacing={3} align="stretch">




                {currentOrder.discount > 0 && (
                  <HStack justify="space-between">
                    <Text color="green.500">Discount</Text>
                    <Text color="green.500">-₹{currentOrder.discount}</Text>
                  </HStack>
                )}

                <Divider />

                <VStack spacing={3} align="stretch" mb={6}>
                  <HStack justify="space-between">
                    <Text>
                      Subtotal ({currentOrder.items.reduce((sum, item) => sum + item.qty, 0)}{' '}
                      items)
                    </Text>
                    <Text>
                      ₹
                      {currentOrder.charges?.subTotal || currentOrder.total - 40}
                    </Text>
                  </HStack>



                  <HStack justify="space-between">
                    <Text>Delivery Fee</Text>
                    <Text>₹{currentOrder.charges.deliveryFee}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text>Tax</Text>
                    <Text>₹{currentOrder.charges.tax}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text color="green.500">Discount</Text>
                    <Text color="green.500">-₹{currentOrder.charges.discount}</Text>
                  </HStack>

                  <Divider />

                  <HStack justify="space-between" fontWeight="bold">
                    <Text fontSize="lg">Total</Text>
                    <Text fontSize="lg" color="brand.primary">
                      ₹{currentOrder.charges.grandTotal}
                    </Text>
                  </HStack>
                </VStack>

                <HStack>
                  <Icon as={CreditCardIcon} color="brand.primary" />
                  <Text fontSize="sm" color="gray.600">
                    {currentOrder?.payment?.method === 'razorpay' ? 'Paid Online' : 'Cash on Delivery'}
                  </Text>
                  <Badge colorScheme={currentOrder?.payment?.status === 'success' ? 'green' : 'red'}>
                    {currentOrder?.payment?.status}
                  </Badge>
                </HStack>

                {currentOrder?.paymentDetails?.txnId && (
                  <Text fontSize="sm" color="gray.600">
                    Transaction ID: {currentOrder.paymentDetails.txnId}
                  </Text>
                )}
              </VStack>
            </CardBody>
          </Card>

          {/* Order Summary */}
          <Card bg={bg} borderColor={'red'} mb={6}>
            <CardBody>
              <Heading size="md" mb={4} color="brand.primary">
                Order Summary
              </Heading>

              <VStack spacing={3} align="stretch">
                <HStack justify="space-between">
                  <Text>Order Number</Text>
                  <Text fontWeight="medium">#{currentOrder.orderNo}</Text>
                </HStack>

                <HStack justify="space-between">
                  <Text>Order Date</Text>
                  <Text fontSize="sm">
                    {new Date(currentOrder.createdAt).toLocaleDateString('en-IN')}
                  </Text>
                </HStack>

                <HStack justify="space-between">
                  <Text>Total Items</Text>
                  <Text>{currentOrder.items.reduce((sum, item) => sum + item.qty, 0)}</Text>
                </HStack>

                <HStack justify="space-between">
                  <Text>Estimated Delivery</Text>
                  <Text fontSize="sm">{currentOrder.estimatedDeliveryTime || '30-45 minutes'}</Text>
                </HStack>
              </VStack>
            </CardBody>
          </Card>




          <HStack spacing={3} wrap="wrap" mb={24}    >
            <Button
              variant="outline"
              size="sm"
              leftIcon={<RepeatIcon />}
              onClick={() => handleQuickRepeat(currentOrder?._id)}
            >
              Quick Repeat
            </Button>
            {canCancelOrder(currentOrder.currentOrderStatus) && (
              <Button
                variant="outline"
                size="sm"
                colorScheme="red"
                onClick={onOpen}
              >
                Cancel Order
              </Button>
            )}
          </HStack>
        </Box>

      </Flex>

      {/* Cancel Order Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent
          bg={bg}
          color={color}
          p={4}
          backdropFilter="blur(4px)"
          boxShadow="0 0 20px 4px rgba(255, 255, 255, 0.2)"
          border="1px solid rgba(255, 255, 255, 0.1)"
        >
          <ModalHeader>Cancel Order</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Reason for Cancellation</FormLabel>
              <Select
                placeholder="Select reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="Changed my mind">Changed my mind</option>
                <option value="Ordered by mistake">Ordered by mistake</option>
                <option value="Found cheaper elsewhere">Found cheaper elsewhere</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Additional Comments (Optional)</FormLabel>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add any extra details..."
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" onClick={handleCancel}>
              Cancel Order
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default OrderDetails
