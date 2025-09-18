import { Heading, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MoveLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MotionVStack = motion(VStack);

const MenuHeader = ({ title, subtitle, my = 0, showBack = false, alignLg = "center" }) => {
  const navigate = useNavigate();

  return (
    <MotionVStack
      spacing={3}
      mb={{ sm: my, md: 0 }}
      mt={{ sm: 4, md: 0 }}
      w="100%"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      align={{ base: "flex-start", lg: "center" }}
    >
      {/* Title Row with Back Button */}
      <HStack w="100%" spacing={3} justify={{ base: "flex-start", lg: alignLg }} mt={4} >
        {showBack && (
          <IconButton
            aria-label="Go back"
            icon={<MoveLeftIcon />}
            variant="ghost"
            size={{ base: "sm", md: "md" }}
            fontWeight={800}
            onClick={() => navigate(-1)}
          />
        )}

        <MotionVStack
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Heading
            size={{ base: "md", md: "lg" }}
            color="brand.primary"
            textAlign={{ base: "left", lg: "center" }}
          >
            {title}
          </Heading>
        </MotionVStack>
      </HStack>

      {/* Subtitle */}
      {subtitle && (
        <MotionVStack
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}

        >
          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="gray.500"
            textAlign={{ base: "left", lg: "center" }}
            mb={8}
          >
            {subtitle}
          </Text>
        </MotionVStack>
      )}
    </MotionVStack>
  );
};

export default MenuHeader;
