import { Heading, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionVStack = motion(VStack);

const MenuHeader = ({ title, subtitle, mt = 0 }) => {
  return (
    <MotionVStack
      spacing={2}
      mb={8}
      mt={mt}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      align={{ base: "flex-start", lg: "center" }}
    >
      {/* Title */}
      <MotionVStack
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Heading
          size={{ base: "lg", md: "xl" }}
          color="brand.primary"
          textAlign={{ base: "center", lg: "center" }}
        >
          {title}
        </Heading>
      </MotionVStack>

      {/* Subtitle */}
      {
        subtitle && (<MotionVStack
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="gray.500"
            textAlign={{ base: "center", lg: "center" }}
          >
            {subtitle}
          </Text>
        </MotionVStack>
        )}
    </MotionVStack>
  );
};

export default MenuHeader;
