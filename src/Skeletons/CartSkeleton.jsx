import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack
} from "@chakra-ui/react";
import { useBrandColors } from "../hooks/useBrandColors";

const CartSkeleton = () => {
  const { bg } = useBrandColors()
  return (
    <Box width="100%">
      <VStack spacing={3} mb={4} mt={4} w="100%" align={{ base: "flex-start", lg: "center" }}>
        {/* Title Row with Back Button */}
        <HStack w="100%" spacing={3} justify={{ base: "flex-start", lg: "center" }}>

          <Skeleton height="32px" width="32px" borderRadius="md" /> // back btn skeleton


          <Skeleton height="28px" width="200px" borderRadius="md" /> {/* Title */}
        </HStack>

        {/* Subtitle */}
        <SkeletonText noOfLines={1} spacing="4" width="280px" />
      </VStack>

      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={8}
        mb={{ base: 16, sm: 16, md: 0 }}
      >
        {/* Cart Items Skeleton */}
        <Box flex="1">
          <VStack spacing={4} align="stretch">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card
                key={i}
                border="1px solid"
                borderColor="gray.200"
                shadow="sm"
                bg={bg}
              >
                <CardBody>
                  <HStack spacing={4} align="flex-start">
                    {/* Image Skeleton */}
                    <Skeleton boxSize="80px" borderRadius="md" />

                    <Box flex="1">
                      <SkeletonText noOfLines={1} w="70%" mb={2} />
                      <SkeletonText noOfLines={2} spacing="2" mb={2} />
                      <SkeletonText noOfLines={1} w="40%" />
                    </Box>

                    <VStack spacing={2} align="center">
                      <Skeleton h="32px" w="80px" borderRadius="md" />
                      <SkeletonCircle size="8" />
                    </VStack>
                  </HStack>
                </CardBody>
              </Card>
            ))}
          </VStack>
        </Box>

        {/* Cart Summary Skeleton */}
        <Box w={{ base: "full", lg: "400px" }} >
          <Card borderColor="gray.200" position="sticky" top="100px" bg={bg}>
            <CardBody>
              <SkeletonText noOfLines={1} w="50%" mb={6} />

              {/* Coupon Section */}
              <Box mb={6}>
                <SkeletonText noOfLines={1} w="40%" mb={3} />
                <HStack>
                  <Skeleton h="32px" flex="1" borderRadius="md" />
                  <Skeleton h="32px" w="70px" borderRadius="md" />
                </HStack>
              </Box>

              <Divider mb={4} />

              {/* Price Breakdown */}
              <VStack spacing={3} align="stretch" mb={6}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <HStack key={i} justify="space-between">
                    <SkeletonText noOfLines={1} w="40%" />
                    <SkeletonText noOfLines={1} w="20%" />
                  </HStack>
                ))}

                <Divider />

                <HStack justify="space-between" fontWeight="bold">
                  <SkeletonText noOfLines={1} w="30%" />
                  <SkeletonText noOfLines={1} w="20%" />
                </HStack>
              </VStack>

              <Button colorScheme="red" size="lg" w="full" isDisabled>
                <SkeletonText noOfLines={1} />
              </Button>
            </CardBody>
          </Card>
        </Box>
      </Flex>
    </Box>
  );
};

export default CartSkeleton;
