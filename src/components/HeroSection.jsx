import { Box, Button, Container, Heading, Text, useColorMode, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import CTAButton from "./UI/CTA";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionButton = motion(Button);

const HeroSection = () => {
  const { colorMode } = useColorMode()
  return (
    <Box
      w="100%"
      minH="80vh"
      bgImage="url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092')"
      bgSize="cover"
      bgPos="center"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius={{ sm: "xl", base: "2xl" }}
      overflow="hidden"
    >
      {/* Overlay for dark effect */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        opacity={0.75}
        zIndex={0}
        bg={colorMode === "dark" ? 'blackAlpha.500' : "blackAlpha.100"}
        backdropFilter="blur(1px)"
      />

      {/* Content */}
      <Container maxW="container.lg" zIndex={1}  >
        <MotionVStack
          spacing={6}
          align={{ base: "flex-start", lg: "flex-start" }}
          maxW="600px"
          color="white"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <MotionBox
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Heading
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              lineHeight="1.2"
              bgGradient="linear(to-r, #ff8800, rgba(0, 255, 85, 1))"
              bgClip="text"
              fontWeight="bold"
            >
              Delicious Food Delivered to Your Doorstep
            </Heading>
          </MotionBox>

          <MotionBox
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 0.95 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Text fontSize="lg" color={"#f5f5f5"} >
              Choose from a diverse menu, featuring a delectable array of dishes.
              Our mission is to satisfy your cravings and elevate your dining
              experience, one delicious meal at a time.
            </Text>
          </MotionBox>

          <CTAButton
            as="a"
            href="#menu"
          > Browse Menu
          </CTAButton>
        </MotionVStack>
      </Container>
    </Box>
  );
};

export default HeroSection;
