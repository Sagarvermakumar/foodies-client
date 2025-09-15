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
  Icon,
  IconButton,
  Spinner,
  Stack,
  Text,
  Tooltip,
  VStack,
  useColorMode,
  useDisclosure
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  Plus as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Mail as EmailIcon,
  LockIcon,
  LogOutIcon,
  MapPin as MapPinIcon,
  MoonIcon,
  Phone as PhoneIcon,
  ScatterChart,
  Star as StarIcon,
  SunIcon,
  User as UserIcon,
  Verified,
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import AddAddressModal from '../components/Modal/AddAddressModal'
import ProfilePictureUpdater from '../components/ProfilePicUpdator'
import { useBrandColors } from '../hooks/useBrandColors'
import { getAllAddressSelector, makeLoadingSelector } from '../store/selectors/address.selector'
import {
  deleteAddress,
  getAllAddresses,
  setDefaultAddress
} from '../store/slices/addressSlice'
import { logoutUser } from '../store/slices/authSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate()
  const { color, bg } = useBrandColors()
  const [editingAddress, setEditingAddress] = useState(null)
  // const [isEditingProfile, setIsEditingProfile] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [defaultAddressId, setDefaultAddressId] = useState(false)


  const { user, loading: profileLoading } = useSelector((state) => state.auth)
  const addresses = useSelector(getAllAddressSelector);
  const isLoadingAddress = useSelector(makeLoadingSelector("all"))



  useEffect(() => {
    dispatch(getAllAddresses())
  }, [dispatch])



  // open modal as  edit a address
  const handleEditAddress = (address) => {
    setEditingAddress(address)
    onOpen()
  }


  // open  modal as add new address
  const handleAddAddress = () => {
    setEditingAddress(null)
    onOpen()
  }



  // delete a address
  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await dispatch(deleteAddress(addressId)).unwrap()
        toast.success('Address deleted successfully')
      } catch (error) {
        console.log('Error occurred : ', error)
        toast.error('Failed to delete address')
      }
    }
  }



  // set a address default
  const handleSetDefaultAddress = async (addressId) => {
    try {
      await dispatch(setDefaultAddress(addressId)).unwrap()
      setDefaultAddressId(addressId)
      toast.success('Default address updated')
    } catch (error) {
      console.log('Error occurred : ', error)
      toast.error('Failed to update default address')
    } finally {
      setDefaultAddressId(false)
    }
  }




  if (profileLoading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" color="brand.primary" />
        <Text mt={4}>Loading profile...</Text>
      </Box>
    )
  }

  const handleLogout = () => {

    dispatch(logoutUser());

  }

  return (
    <Box
      w="100%"
      maxW="6xl"
      mx="auto"
      rounded="xl"
      mb={{ base: 20, sm: 20, md: 0 }}
    // p={{ base: 4, lg: 8 }}
    >
      {/* Profile Header */}

      <HStack width={'100%'} justify="space-between" my={4}>
        <Heading color="brand.primary" fontSize={{ sm: "sm", md: "md", lg: "lg" }} >
          👤  Personal Information
        </Heading>
        {/* <Tooltip label='Edit Profile Info' hasArrow>
          <IconButton
            size="sm"
            variant="outline"
            onClick={() => setIsEditingProfile(!isEditingProfile)}
          >
            <EditIcon />
          </IconButton>
          
        </Tooltip> */}
        <Tooltip

          label={`${colorMode === 'light' ? "Enable Light Mode" : "Enable Dark Mode"}`}
        >

          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            colorScheme="red"
          />
        </Tooltip>
      </HStack>
      <Divider my={4} />
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"

        gap={4}
      >

        {/* profile & profile settings  */}
        <ProfilePictureUpdater
          name={user?.name}
          avatar={user?.avatar.url}
          id={user?._id}
        />

        <Box flex="1" justifyContent={'flex-start'} >


          <VStack spacing={4} align="stretch">
            <HStack spacing={3} >
              <Icon as={UserIcon} color="brand.primary" />
              <Text fontWeight="medium">Name:</Text>
              <Text>{user?.name || 'N/A'}</Text>
              <Tooltip
                hasArrow
                label={
                  user?.isVerified ? "You're  Verified" : "You're not Verified"
                }
              >
                <Verified color={user?.isVerified ? '#1500ffff' : '#ff0000ff'} />
              </Tooltip>
            </HStack>

            <HStack spacing={3} >
              <Icon as={EmailIcon} color="brand.primary" />
              <Text fontWeight="medium">Email:</Text>
              <Text>{user?.email || 'N/A'}</Text>
            </HStack>

            <HStack spacing={3} >
              <Icon as={PhoneIcon} color="brand.primary" />
              <Text fontWeight="medium">Phone:</Text>
              <Text>{user?.phone || 'N/A'}</Text>
            </HStack>

            {user?.referralCode && (
              <HStack spacing={3} >
                <Icon as={StarIcon} color="brand.primary" />
                <Text fontWeight="medium">Referral Code:</Text>
                <Badge colorScheme="green" variant="subtle">
                  {user.referralCode}
                </Badge>
              </HStack>
            )}
            <HStack spacing={3}>
              <Icon as={ScatterChart} color="brand.primary" />
              <Text fontWeight="medium">Status:</Text>
              <Badge
                px={4}
                py={0}
                rounded="md"
                fontSize="0.9em"
                colorScheme={user.status === 'active' ? 'green' : 'red'}
              >
                {user.status}
              </Badge>
              <IconButton
                bg={'transparent'}
                px={4}
                py={1}
                rounded="md"
                fontSize="0.9em"
                colorScheme={user.isVerified ? 'green' : 'yellow'}
              ></IconButton>
            </HStack>
          </VStack>
        </Box>
      </Flex>

      <Divider my={4} />

      {/* Addresses Tab */}

      {/* Addresses List */}
      {isLoadingAddress ? (
        <Box textAlign="center" py={20}>
          <Spinner size="xl" color="brand.primary" />
          <Text mt={4}>Loading addresses...</Text>
        </Box>
      ) : addresses.length === 0 ? (
        <Card bg={bg}>
          <CardBody textAlign="center">
            <Icon as={MapPinIcon} boxSize={16} color="gray.400" mb={4} />
            <Heading size="lg" color="gray.500" mb={4}>
              No addresses yet
            </Heading>
            <Text color="gray.600" mb={8}>
              Add your first delivery address to get started with ordering.
            </Text>
            <Button
              colorScheme="red"
              size="lg"
              leftIcon={<AddIcon />}
              onClick={handleAddAddress}
            >
              Add Address
            </Button>
          </CardBody>
        </Card>
      ) : (
        <>
          <HStack justify={'space-between'} >
            <Heading color="brand.primary" mt={4} fontSize={{ sm: "sm", md: "md", lg: "lg" }} >
              🏠 Address
            </Heading>
            <Tooltip label="Add New Address" hasArrow>
              <IconButton
                width={'fit-content'}
                icon={<AddIcon />}
                variant="outline"
                size="sm"
                onClick={() => handleAddAddress()}
                aria-label="Add New address"
              />
            </Tooltip>
          </HStack>

          <Grid
            templateColumns={{
              base: '1fr',
              md: 'repeat(auto-fit, minmax(400px, 1fr))',
            }}
            gap={6}
          >

            {addresses?.map((address, i) => (
              <Card
                key={i + address?._id}
                bg={'transparent'}
                boxShadow="lg"
                borderRadius="xl"
                px={4}
              >
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    {/* Header Row */}
                    <Flex justify="space-between" align="center">
                      <HStack>
                        <Text fontWeight="bold" fontSize="xl" color="orange.600">
                          {address?.label}
                        </Text>
                        {address?.isDefaultAddress && (
                          <Badge colorScheme="green" fontSize="0.8em">
                            DEFAULT
                          </Badge>
                        )}
                      </HStack>
                    </Flex>

                    {/* Address Details */}
                    <Box fontSize="sm" color={color}>
                      <Text>{address?.addressLine}{address?.street && `, ${address?.street}`}</Text>
                      {address?.landmark && <Text>Landmark: {address?.landmark}</Text>}
                      <Text>
                        {address?.city && `${address?.city}, `}
                        {address?.state && `${address?.state} - `}
                        {address?.pinCode}
                      </Text>
                      <Text>{address?.country}</Text>
                    </Box>

                    {/* Contact Info */}
                    <Box fontSize="sm" color={color}>
                      <Text><b>Contact:</b> {address?.contactName}</Text>
                      <Text><b>Phone:</b> {address?.contactPhone}</Text>
                      {address?.instructions && (
                        <Text color="gray.500"><b>Note:</b> {address?.instructions}</Text>
                      )}
                    </Box>


                    {/* Action Buttons */}
                    <Flex justify="space-between" align="center" flexWrap={'wrap'}>
                      <HStack spacing={3}>
                        <Button
                          size="sm"
                          variant={'outline'}
                          leftIcon={<EditIcon />}
                          onClick={() => handleEditAddress(address)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant={address?.isDefaultAddress ? 'solid' : 'outline'}
                          leftIcon={<StarIcon />}
                          onClick={() => handleSetDefaultAddress(address?._id)}
                          isDisabled={address?.isDefaultAddress}
                          isLoading={defaultAddressId === address?._id}
                          loadingText="Setting..."
                        >
                          Set Default
                        </Button>
                      </HStack>


                      <Tooltip label="Remove this address" hasArrow >
                        <IconButton

                          icon={<DeleteIcon />}
                          colorScheme="red"
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteAddress(address?._id)}
                          aria-label="Delete address"
                        />
                      </Tooltip>
                    </Flex>
                  </VStack>
                </CardBody>
              </Card>
            ))}


          </Grid>
        </>
      )}
      <Divider />
      {/* user action  */}
      <Box maxW="full" mx="auto" p={{ base: 2, lg: 4 }}>
        <Stack
          spacing={3}
          flexDir={{ sm: 'column', md: 'column', lg: 'row' }}
          mb={{ sm: 4, md: 0 }}
          flexWrap={'wrap'}
        >

          <Button
            leftIcon={<LockIcon />}
            size="sm"
            mt={3}
            onClick={() => navigate('/change-password')}
            w={{ base: "full", sm: "full", md: "fit-content" }}
          >
            Change Password
          </Button>
          <Button
            leftIcon={<LogOutIcon />}
            colorScheme="blue"
            size="sm"
            mt={3}
            w={{ base: "full", sm: "full", md: "fit-content" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Stack>
      </Box>

      {/* Add/Edit Address Modal */}

      <AddAddressModal
        isOpen={isOpen}
        onClose={onClose}
        setEditingAddress={setEditingAddress}
        editingAddress={editingAddress}
      />


    </Box>
  )
}

export default Profile
