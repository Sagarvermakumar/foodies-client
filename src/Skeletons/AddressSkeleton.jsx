import {
  Box,
  Card,
  CardBody,
  Flex,
  Grid,
  HStack,
  Heading,
  IconButton,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Tooltip,
  VStack
} from "@chakra-ui/react";
import { PlusIcon } from "lucide-react";

const AddressSkeleton = () => {
  return (
    <>
      {/* Header Skeleton */}
      <HStack justify={"space-between"}>
        <Heading
          color="brand.primary"
          my={4}
          fontSize={{ sm: "sm", md: "md", lg: "lg" }}
        >
          🏠 Address
        </Heading>
        <Tooltip label="Add New Address" hasArrow>
          <IconButton
            width={"fit-content"}
            icon={<PlusIcon />}
            variant="outline"
            size="sm"
            aria-label="Add New address"
            isDisabled
          />
        </Tooltip>
      </HStack>

      {/* Grid Skeleton */}
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(auto-fit, minmax(400px, 1fr))",
        }}
        gap={6}
      >
        {Array.from({ length: 2 }).map((_, i) => (
          <Card
            key={i}
            bg={"transparent"}
            boxShadow="lg"
            borderRadius="xl"
            px={4}
          >
            <CardBody>
              <VStack spacing={4} align="stretch">
                {/* Header Row */}
                <Flex justify="space-between" align="center">
                  <HStack width={"full"} justify={"space-between"}>
                    <Box width={"100%"}>
                      <SkeletonText noOfLines={1} w="40%" mb={2} />
                      <Skeleton h="20px" w="60px" borderRadius="md" />
                    </Box>
                    <SkeletonCircle size="8" />
                  </HStack>
                </Flex>

                {/* Address Details */}
                <Box fontSize="sm">
                  <SkeletonText noOfLines={2} spacing="2" />
                </Box>

                {/* Contact Info */}
                <Box fontSize="sm">
                  <SkeletonText noOfLines={2} spacing="2" />
                </Box>

                {/* Action Buttons */}
                <Flex justify="space-between" align="center" flexWrap={"wrap"}>
                  <HStack spacing={3}>
                    <Skeleton h="30px" w="70px" borderRadius="md" />
                    <Skeleton h="30px" w="100px" borderRadius="md" />
                  </HStack>
                </Flex>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </>
  );
};

export default AddressSkeleton;
