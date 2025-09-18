import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HERO_IMAGES } from "../assets";
import CTAButton from "./UI/CTA";

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);




const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 7000); // 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      w="100%"
      minH="80vh"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius={{ sm: "xl", base: "2xl" }}
      overflow="hidden"
    >
      {/* Animated Background */}
      <AnimatePresence mode="wait">
        <MotionBox
          key={currentIndex}
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bgImage={`url(${HERO_IMAGES[currentIndex]})`}
          bgSize="cover"
          objectFit={'cover'}
          bgPos="center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* Overlay for dark effect */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        opacity={0.7}
        zIndex={0}
        bg={'transparent'}
        backdropFilter="blur(2px)"
      />

      {/* Content */}
      <Container maxW="container.lg" zIndex={1}>
        <MotionVStack
          spacing={6}
          align={{ base: "flex-start", lg: "flex-start" }}
          maxW="600px"
          color="white"
          initial={{ opacity: 0, y: 20 }}
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
            <Text fontSize="lg" color={"#f5f5f5"}>
              Choose from a diverse menu, featuring a delectable array of dishes.
              Our mission is to satisfy your cravings and elevate your dining
              experience, one delicious meal at a time.
            </Text>
          </MotionBox>

          <CTAButton as="a" href="#menu">
            Browse Menu
          </CTAButton>
        </MotionVStack>
      </Container>
    </Box>
  );
};

export default HeroSection;
