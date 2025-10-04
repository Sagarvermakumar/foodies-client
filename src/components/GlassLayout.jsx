


"use client";

import { Box, useColorModeValue } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const move = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: 200px 0; }
`;

const Banner = () => {
  const gridLineColor = useColorModeValue(
    "rgba(0,0,0,0.01)",
    "rgba(255,255,255,0.05)"
  );
  const bgColor = useColorModeValue("#fff", "#000");
  return (
    <Box
      as="section"
      position="relative"
      w="100%"
      h="100vh"
      bg={bgColor}
      color="white"
      overflow="hidden"
    >
      {/* 🔮 Neon Glow Background Shapes */}
      <MotionBox
        position="absolute"
        top="8%"
        left="2%"
        w="200px"
        h="200px"
        bg="blue.500"
        borderRadius="full"
        filter="blur(60px)"
        opacity={0.4}
        animate={{ x: [0, 30, -30, 0], y: [0, -50, 20, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        zIndex={0}
      />

      <MotionBox
        position="absolute"
        bottom="10%"
        right="5%"
        w="150px"
        h="150px"
        bg="pink.600"
        borderRadius="full"
        filter="blur(70px)"
        opacity={0.45}
        animate={{ x: [0, -40, 40, 0], y: [0, 40, -20, 0] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        zIndex={0}
      />

      <MotionBox
        position="absolute"
        bottom="40%"
        left="40%"
        w="150px"
        h="150px"
        bg="purple.500"
        borderRadius="full"
        filter="blur(60px)"
        opacity={0.3}
        animate={{ x: [0, 20, -20, 0], y: [0, -30, 30, 0] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        zIndex={0}
      />

      {/* 🔲 Grid Overlay */}
      <Box
        position="relative"
        w="100%"
        h="100vh"
        overflow="hidden"
        bg="transparent"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          w: "200%",
          h: "200%",
          bgImage: `linear-gradient(to right, ${gridLineColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridLineColor} 1px, transparent 1px)`,
          bgSize: "50px 50px",
          animation: `${move} 10s linear infinite`,
        }}
      ></Box>
    </Box>
  );
};

export default Banner;
