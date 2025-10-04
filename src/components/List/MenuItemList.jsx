import {
  Badge,
  Box,
  Flex,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Text
} from '@chakra-ui/react';
import { motion } from "framer-motion";
import { useBrandColors } from '../../hooks/useBrandColors';
import CTAButton from '../UI/CTA';
// Motion wrapper
const MotionBox = motion(Box);
const MenuItemList = ({ filteredItems, onQuantityChange, onAddToCart, loadingItemId, quantities, limit = 8 }) => {

  const itemsToRender = limit ? filteredItems.slice(0, limit) : filteredItems;
  const { borderColor, color } = useBrandColors()

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 60, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <MotionBox
      variants={containerVariants}
      initial="hidden"
      animate="show"
      maxW={'100%'}
      viewport={{ once: true, amount: 0.2 }}
    >

      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 3, lg: 4 }}
        columnGap={8}
        rowGap={8}
      >
        {itemsToRender.map((item) => (

          <MotionBox
            key={item._id}
            borderWidth="1px"
            borderColor={borderColor}
            variant={cardVariants}
            borderRadius="md"
            overflow="hidden"
            boxShadow="xl"
            bg="transparent"
            color="white"
            maxH={'500px'}
            _hover={{
              boxShadow: " 0 4px 60px rgba(252, 1, 189, 0.3)",
              transition: "0.2s ease-in-out",
            }}


            variants={cardVariants}
            whileHover={{
              colorRendering: "#0000006d",
              boxShadow: "0px 8px 25px rgba(234, 90, 7, 0.15)",
              transition: { duration: 0.3 },
            }}

          >

            <Image
              src={item.image}
              alt={item.name}
              objectFit="fill"
              width="100%"
              height="250px"
              borderRadius="md"
              mb={3}
            />

            <Box p={4}>

              <Flex justify="space-between" align="center" mb={2}>
                <Text fontSize="xl" fontWeight="bold" color={color} >
                  {item.name}
                </Text>
                <Badge
                  px={3}
                  py={1}
                  rounded="full"
                  colorScheme="red"
                  fontSize="md"
                >
                  ₹{parseInt(item.price)}
                </Badge>
              </Flex>


              {item.discount > 0 && (
                <Text fontSize="sm" color="orange.500" mb={2}  >
                  🎉 {item.discount}% OFF
                </Text>
              )}


              <Flex flexWrap="wrap" gap={2} mb={3}>
                {item.isAvailable ? (
                  <Badge colorScheme="green" rounded="md">
                    Available
                  </Badge>
                ) : (
                  <Badge colorScheme="red" rounded="md">
                    Unavailable
                  </Badge>
                )}
                {item.isVeg ? (
                  <Badge colorScheme="green" rounded="md">
                    Vegetarian
                  </Badge>
                ) : (
                  <Badge colorScheme="purple" rounded="md">
                    Non-Veg
                  </Badge>
                )}
                {item.category?.name && (
                  <Badge colorScheme="blue" rounded="md">
                    {item.category.name}
                  </Badge>
                )}
              </Flex>


              <Text fontSize="sm" noOfLines={2} mb={2} color={color}>
                {item.description}
              </Text>


              {item.variations?.length > 0 && (
                <Box mb={2}>
                  <Text fontSize="sm" fontWeight="bold" color={color} mb={1}>
                    Variations:
                  </Text>
                  <Flex wrap="wrap" gap={2}>
                    {item.variations.map((v) => (
                      <Badge key={v._id} colorScheme="cyan" rounded="md">
                        {v.name} - ₹{v.price}
                      </Badge>
                    ))}
                  </Flex>
                </Box>
              )}

              {item.addons?.length > 0 && (
                <Box mb={2}>
                  <Text fontSize="sm" fontWeight="bold" color={color} mb={1}>
                    Add-ons:
                  </Text>
                  <Flex wrap="wrap" gap={2}>
                    {item.addons.map((a) => (
                      <Badge key={a._id} colorScheme="pink" rounded="md">
                        {a.name} (+₹{a.price})
                      </Badge>
                    ))}
                  </Flex>
                </Box>
              )}



              {/* Action Buttons */}
              <Flex
                justify="space-between"
                gap={3}
                mt={4}
                flexDirection={'row'}
              >
                <NumberInput
                  value={quantities[item._id] || 1}
                  min={1}
                  max={99}
                  color={color}

                  borderColor={'brand.primary'}
                  border={'none'}
                  borderRadius={'md'}
                  onChange={(valueString) =>
                    onQuantityChange(item._id, parseInt(valueString))
                  }
                  size="md"
                  w="80px"

                >
                  <NumberInputField color={'bran.primary'} border={'1px solid '} borderColor={'brand.primary'} outline={'none'} boxShadow={'none'}
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
                  <NumberInputStepper  >
                    <NumberIncrementStepper color={'brand.primary'} />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>






                <CTAButton
                  onClick={() => onAddToCart(item)}
                  isLoading={loadingItemId === item._id}

                >
                  Add to Cart
                </CTAButton>
              </Flex>
            </Box>
          </MotionBox>
        ))}


      </SimpleGrid>

    </MotionBox>
  )
}

export default MenuItemList