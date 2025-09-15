import { Box, Flex, SimpleGrid, Skeleton, SkeletonText } from '@chakra-ui/react';

const MenuSkeleton = () => {
  const skeletonItems = Array(6).fill(null);
  return (
    <Box>


      <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 3 }} columnGap={8} rowGap={8}>
        {skeletonItems.map((_, idx) => (
          <Box
            key={idx}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            bg="whiteAlpha.100"
            p={4}
          >
            {/* Image skeleton */}
            <Skeleton height="250px" borderRadius="md" mb={3} />

            {/* Name + Price */}
            <Flex justify="space-between" align="center" mb={2}>
              <Skeleton height="20px" width="60%" />
              <Skeleton height="20px" width="50px" />
            </Flex>

            {/* Category */}
            <Skeleton height="14px" width="40%" mb={2} />

            {/* Description */}
            <SkeletonText noOfLines={2} spacing="2" mb={2} />

            {/* Badges */}
            <Flex flexWrap="wrap" gap={2} mb={3}>
              <Skeleton height="20px" width="70px" borderRadius="md" />
              <Skeleton height="20px" width="50px" borderRadius="md" />
              <Skeleton height="20px" width="80px" borderRadius="md" />
            </Flex>

            {/* Action buttons */}
            <Flex justify="start" gap={3} mt={4} flexDirection={{ sm: "column", md: "column", lg: "row" }}>
              <Skeleton height="32px" width="70px" borderRadius="md" />
              <Skeleton height="32px" width="70px" borderRadius="md" />
              <Skeleton height="32px" width="140px" borderRadius="md" />
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default MenuSkeleton;
