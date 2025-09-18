import {
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Grid,
  HStack,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack
} from "@chakra-ui/react";
import { SearchIcon } from "lucide-react";
import { useBrandColors } from "../hooks/useBrandColors";

const OrdersSkeleton = () => {
  const { bg } = useBrandColors()
  return (
    <Box my={8}>
      {/* Header */}
      <VStack spacing={3} mb={4} mt={4} w="100%" align={{ base: "flex-start", lg: "center" }}>
        {/* Title Row with Back Button */}
        <HStack w="100%" spacing={3} justify={{ base: "flex-start", lg: "center" }}>

          <Skeleton height="32px" width="32px" borderRadius="md" />


          <Skeleton height="28px" width="200px" borderRadius="md" /> {/* Title */}
        </HStack>

        {/* Subtitle */}
        <SkeletonText noOfLines={1} spacing="4" width="280px" />
      </VStack>

      {/* Filters and Search */}
      <Flex direction={{ base: "column", md: "row" }} gap={4} mb={8}>
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Skeleton height="40px" w="full" borderRadius="md" />
        </InputGroup>
        <Skeleton height="40px" w={{ base: "full", md: "200px" }} borderRadius="md" />
      </Flex>

      {/* Orders List Skeleton */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} align="stretch" pb={16}>
        {[...Array(4)].map((_, i) => (
          <Card key={i} shadow="md" rounded="xl" bg={bg} >
            <CardBody>
              {/* Order Header */}
              <Flex
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                align={{ base: "flex-start", md: "center" }}
                mb={4}
              >
                <VStack align="flex-start" spacing={2} w="full">
                  <HStack>
                    <Skeleton height="20px" width="60px" />
                    <Skeleton height="20px" width="80px" borderRadius="full" />
                  </HStack>
                  <Skeleton height="14px" width="120px" />
                </VStack>
              </Flex>

              <Divider mb={4} />

              {/* Order Items Preview */}
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(auto-fit, minmax(200px, 1fr))" }}
                gap={4}
                mb={4}
              >
                {[...Array(3)].map((_, idx) => (
                  <HStack key={idx} spacing={3} align="flex-start">
                    <SkeletonCircle size="12" />
                    <Box flex="1">
                      <SkeletonText noOfLines={2} spacing="2" />
                    </Box>
                  </HStack>
                ))}
              </Grid>

              <Divider mb={4} />

              {/* Buttons Skeleton */}
              <HStack spacing={3}>
                <Skeleton height="32px" width="100px" borderRadius="md" />
                <Skeleton height="32px" width="100px" borderRadius="md" />
              </HStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default OrdersSkeleton;
