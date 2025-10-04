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
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      w="100%"
      minH="90vh"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      borderRadius="2xl"
    >
      {/* 🔁 Animated Background */}
      <AnimatePresence mode="wait">
        <MotionBox
          key={currentIndex}
          position="absolute"
          inset="0"
          w="100%"
          h="100%"
          bgImage={`url(${HERO_IMAGES[currentIndex]})`}
          bgSize="cover"
          bgPos="center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* 🌫️ Soft Glass Overlay */}
      <Box
        position="absolute"
        inset="0"
        bg="linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(0,0,0,0.3))"
        backdropFilter="blur(8px) saturate(160%)"
        border="1px solid rgba(255,255,255,0.1)"
        zIndex={0}
      />

      {/* ✨ Content */}
      <Container maxW="container.lg" zIndex={1}>
        <MotionVStack
          spacing={6}
          align={{ base: "flex-start", md: "flex-start" }}
          maxW="100%"
          color="whiteAlpha.900"
          p={6}
          bg="rgba(255, 255, 255, 0.1)"
          border="1px solid rgba(255,255,255,0.15)"
          backdropFilter="blur(10px)"
          borderRadius="2xl"
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.2)"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <MotionBox
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Heading
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              lineHeight="1.2"
              bgGradient="linear(to-r, #ff6a00, #ee0979)"
              bgClip="text"
              fontWeight="extrabold"
              textShadow="0px 2px 10px rgba(0,0,0,0.4)"
            >
              Delicious Food Delivered to Your Doorstep
            </Heading>
          </MotionBox>

          <MotionBox
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 0.95 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Text fontSize={{ base: "md", md: "lg" }} color="whiteAlpha.800">
              Discover a diverse menu featuring irresistible dishes crafted with
              passion and flavor. Experience the joy of dining — wherever you
              are.
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
