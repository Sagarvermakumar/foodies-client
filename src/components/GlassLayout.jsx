"use client";

import { Box } from "@chakra-ui/react";

const GlassLayout = () => {
  return (
    <Box
      position="relative"
      w="100%"
      minH="100%"
      overflow="hidden"
    >
      {/* 🔮 Neon Glow Shapes */}
      <Box
        position="absolute"
        top="80px"
        left="5%"
        w="300px"
        h="400px"
        bg="#ff0080a7"
        borderRadius="50%"
        filter="blur(140px)"
        opacity={0.5}
        zIndex={0}
      />

      <Box
        position="absolute"
        bottom="-10%"
        right="0px"
        w="450px"
        h="250px"
        bg="rgba(255, 0, 0, 0.89)"
        borderRadius="full"
        filter="blur(110px)"
        opacity={0.2}
        zIndex={0}
      />

      <Box
        position="absolute"
        top="0%"
        right="0px"
        w="480px"
        h="200px"
        bg="#8a2be2"
        borderRadius="50%"
        filter="blur(160px)"
        opacity={0.4}
        zIndex={0}
        display={{ sm: "none", md: "block" }}
      />

      <Box
        position="absolute"
        bottom="60px"
        left="5%"
        w="350px"
        h="180px"
        bg="darkgreen"
        borderRadius="50%"
        filter="blur(110px)"
        opacity={0.4}
        zIndex={0}
        display={{ sm: "none", md: "block" }}
      />



    </Box>
  );
};

export default GlassLayout;
