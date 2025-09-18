import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Grid,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure
} from '@chakra-ui/react'
import {
  Eye as EyeIcon,
  Search as SearchIcon
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MenuHeader from '../components/MenuHeader'
import { useBrandColors } from '../hooks/useBrandColors'
import OrdersSkeleton from '../Skeletons/OrdersSkeleton'
import { getMyOrders, quickRepeatOrder } from '../store/slices/orderSlice'

const Orders = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { bg, borderColor } = useBrandColors()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { orders, loading } = useSelector((state) => state.order)



  useEffect(() => {
    dispatch(getMyOrders())
  }, [dispatch])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value)
  }

  const handleViewOrder = (order) => {
    console.log(order)
    setSelectedOrder(order)
    navigate(`/orders/${order._id}/${order?.cartId}`)
    // onOpen()
  }

  const handleQuickRepeat = async (order) => {
    try {
      await dispatch(quickRepeatOrder(order.id)).unwrap()
      toast.success('Order added to cart!')
      navigate('/cart')
    } catch (error) {
      toast.error('Failed to repeat order', error)
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

  const filteredOrders = orders.filter((order) => {
    const lowerSearch = searchTerm.toLowerCase();

    const matchesSearch =
      order?.orderNo?.toLowerCase().includes(lowerSearch) ||
      order?.items?.some((it) =>
        it?.item?.name?.toLowerCase().includes(lowerSearch) // ✅ item.item.name use karo
      );

    const matchesStatus =
      statusFilter === 'all' ||
      order?.currentOrderStatus?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });


  if (loading) {
    return (
      <OrdersSkeleton />
    )
  }

  return (
    <Box >
      <MenuHeader title={'My Orders'}
        subtitle={'Search by Order ID, filter by current status, and quickly view order details in one place'}
        showBack={true}
      />

      {/* Filters and Search */}
      <Flex direction={{ base: 'column', md: 'row' }} gap={4} mb={8}>
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search orders by order number or item name..."
            value={searchTerm}
            onChange={handleSearch}
            bg={bg}
            borderColor={borderColor}
          />
        </InputGroup>

        <Select
          value={statusFilter}
          onChange={handleStatusFilter}
          w={{ base: 'full', md: '200px' }}
          bg={bg}
          borderColor={borderColor}
        >
          {
            [
              "ALL Status",
              "PLACED",
              "CONFIRMED",
              "PREPARING",
              "READY",
              "ASSIGNED",
              "PICKED",
              "OUT_FOR_DELIVERY",
              "DELIVERED",
              "CANCELLED",
              "REFUNDED",
              "COMPLETE",
            ].map((status) => (
              <option key={status} value={status.toLowerCase()}>
                {status}
              </option>
            ))
          }
        </Select>
      </Flex>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <Box textAlign="center" py={20}>
          <Heading size="lg" color="gray.500" mb={4}>
            {searchTerm || statusFilter !== 'all' ? 'No orders found' : 'No orders yet'}
          </Heading>
          <Text color="gray.600" mb={8}>
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your search or filters.'
              : 'Start ordering delicious food to see your order history here!'}
          </Text>
          {!searchTerm && statusFilter === 'all' && (
            <Button colorScheme="red" size="lg" onClick={() => navigate('/')} variant={'outline'} >
              Browse Menu
            </Button>
          )}
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} align="stretch" pb={16} >
          {filteredOrders.map((order) => (
            <Card key={order._id} bg={bg} borderColor={borderColor} shadow="md" rounded="xl">
              <CardBody>
                {/* Order Header */}
                <Flex
                  direction={{ base: "column", md: "row" }}
                  justify="space-between"
                  align={{ base: "flex-start", md: "center" }}
                  mb={4}
                >
                  <VStack align="flex-start" spacing={2}>
                    <HStack>
                      <Text fontWeight="bold" fontSize="lg">
                        #{order.orderNo}
                      </Text>
                      <Badge
                        px={3}
                        py={1}
                        rounded="full"
                        fontSize="0.8em"
                        colorScheme={getStatusColor(order?.currentOrderStatus)}
                      >
                        {getStatusText(order.currentOrderStatus)}
                      </Badge>
                    </HStack>
                    <Text fontSize="sm" color="gray.600">
                      Placed on{" "}
                      {new Date(order?.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </VStack>


                </Flex>

                <Divider mb={4} />

                {/* Order Items Preview */}
                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(auto-fit, minmax(200px, 1fr))" }}
                  gap={4}
                  mb={4}
                >
                  {order.items.slice(0, 3).map(({ item, qty, unitPrice }, index) => (
                    <HStack key={index} spacing={3} align="flex-start">
                      <Image
                        src={item?.image || "https://via.placeholder.com/50x50?text=Food"}
                        alt={item?.name}
                        boxSize="50px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      <Box flex="1">
                        <Text fontWeight="medium" fontSize="sm">
                          {item?.name}
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                          Qty: {qty} × ₹{unitPrice}
                        </Text>
                      </Box>
                    </HStack>
                  ))}
                  {order.items.length > 3 && (
                    <Text fontSize="sm" color="gray.500" textAlign="center">
                      +{order.items.length - 3} more items
                    </Text>
                  )}
                </Grid>

                <Divider mb={4} />
                <HStack spacing={3} mt={{ base: 4, md: 0 }}>
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="red"
                    leftIcon={<EyeIcon />}
                    onClick={() => handleViewOrder(order)}
                  >
                    View Details
                  </Button>

                </HStack>


              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

      )}


    </Box>
  )
}

export default Orders
