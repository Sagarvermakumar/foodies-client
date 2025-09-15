import { Box, Flex, Skeleton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useBrandColors } from "../hooks/useBrandColors";

const MotionBox = motion(Box);

const CategoryListSkeleton = () => {
  const { color } = useBrandColors()
  const skeletonItems = Array(6).fill(null)
  return (
    <Box
      w="100%"
      overflowX="auto"
      // py={4}
      px={2}
      display={'flex'}
      justifyContent={{ base: "flex-start", md: "center" }}
      css={{ "&::-webkit-scrollbar": { display: "none" } }}
      maxW="90vw"
    >
      <Flex gap={4} wrap="nowrap">
        {skeletonItems.map((_, index) => (
          <MotionBox
            key={"category" + 1}
            flex="0 0 auto"
            w="110px"
            textAlign="center"
            cursor="pointer"
            px={4}
            py={2}
            minW="100px"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ scale: 1.05 }} // Parent scale
          >
            <Skeleton
              width={'100%'}
              w="110px"
              objectFit="cover"
              borderRadius="full"
              mx="auto"
              mb={2}
              // Image grows more on parent hover
              variants={{
                hover: { scale: 1.2 },
                initial: { scale: 1 }
              }}
              initial="initial"
              whileHover="hover"
              transition={{ type: "spring", stiffness: 500 }}
            />
            <Skeleton
              textAlign="center"
              fontSize="sm"
              fontWeight="medium"
              color={color}
              variants={{
                hover: { color: 'brand.primary' },
              }}
              initial="initial"
              whileHover="hover"
              mt={2}
            />

          </MotionBox>

        ))}
      </Flex>

    </Box>
  );
};

export default CategoryListSkeleton;
