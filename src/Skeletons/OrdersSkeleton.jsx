import {
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Grid,
  HStack,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  VStack
} from "@chakra-ui/react";

const OrdersSkeleton = ({ count = 4 }) => {
  return (
    <Box>
      <Flex
        justify="space-between"
        align="center"
        mb={6}
        direction={{ base: "column", md: "row" }}
        gap={4}
      >
        <Skeleton height="28px" width="180px" /> {/* Heading */}
        <HStack spacing={4} w={{ base: "100%", md: "auto" }}>
          <Skeleton height="36px" width={{ base: "100%", md: "200px" }} rounded="md" /> {/* Input */}
          <Skeleton height="36px" width={{ base: "100%", md: "150px" }} rounded="md" /> {/* Select */}
        </HStack>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} align="stretch">
        {Array.from({ length: count }).map((_, idx) => (
          <Card key={idx} shadow="md" rounded="xl">
            <CardBody>
              {/* Header */}
              <Flex
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                align={{ base: "flex-start", md: "center" }}
                mb={4}
              >
                <VStack align="flex-start" spacing={2}>
                  <HStack>
                    <Skeleton height="20px" width="60px" />
                    <Skeleton height="20px" width="80px" rounded="full" />
                  </HStack>
                  <Skeleton height="14px" width="160px" />
                </VStack>
              </Flex>

              <Divider mb={4} />

              {/* Items preview */}
              <Grid
                templateColumns={{
                  base: "1fr",
                  md: "repeat(auto-fit, minmax(200px, 1fr))",
                }}
                gap={4}
                mb={4}
              >
                {Array.from({ length: 3 }).map((__, i) => (
                  <HStack key={i} spacing={3} align="flex-start">
                    <Skeleton boxSize="50px" borderRadius="md" />
                    <Box flex="1">
                      <SkeletonText mt="2" noOfLines={2} spacing="2" />
                    </Box>
                  </HStack>
                ))}
              </Grid>

              <Divider mb={4} />

              <HStack spacing={3}>
                <Skeleton height="32px" width="90px" rounded="md" />
                <Skeleton height="32px" width="90px" rounded="md" />
              </HStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default OrdersSkeleton;
