import { Text, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import FadeUpAnimation from "../common/FadeUpAnimation";


const GradientText = ({
  children,
  fontSize = { base: "md", md: "lg", lg: "xl" },
  fontWeight = "bold",
  textAlign = "left",
}) => {
  // Light/Dark ke liye dynamic gradients
  const gradient = useColorModeValue(
    "linear(to-r, #1a1a1a, #424242)", // Light mode -> dark gradient
    "linear(to-r, #ffffff, #f8bbd0)"  // Dark mode -> light gradient
  );

  const textShadow = useColorModeValue(
    "1px 1px 4px rgba(255,255,255,0.5)", // Light mode -> white glow
    "1px 1px 4px rgba(0,0,0,0.5)"       // Dark mode -> black shadow
  );

  return (
    <FadeUpAnimation duration={0.7}>

    <Text
      fontSize={fontSize}
      fontWeight={fontWeight}
      bgGradient={gradient}
      bgClip="text"
      textShadow={textShadow}
      textAlign={textAlign}
      
      >
      {children}
    </Text>
      </FadeUpAnimation>
  );
};

export default GradientText;
