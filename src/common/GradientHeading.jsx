import { Heading, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import FadeUpAnimation from "../common/FadeUpAnimation";

const MotionVStack = motion(VStack);
const GradientHeading = ({
  title,
  highlight,
  fontsize,
  textAlign = "left",
}) => {
  const mainGradient = useColorModeValue(
    // Light mode -> orange to pink
    "linear(to-r, #f80, #ff0080)",
    // Dark mode -> deeper pink to soft orange
    "linear(to-r, #ff0080, #ffb347)"
  );

  const highlightGradient = useColorModeValue(
    // Light mode -> pink to orange highlight
    "linear(to-r, #ff0080, #f80)",
    // Dark mode -> orange to pink highlight
    "linear(to-r, #f80, #ff0080)"
  );

  const textShadow = useColorModeValue(
    // Light mode -> glowing pink/orange
    "2px 2px 8px rgba(255, 0, 128, 0.01), 0 0 8px rgba(255, 136, 0, 0.06)",
    // Dark mode -> subtle glow with same combo
    "2px 2px 8px rgba(255, 136, 0, 0.7), 0 0 6px rgba(255, 0, 128, 0.5)"
  );



  return (
    <FadeUpAnimation duration={0.5} >
      <Heading
        fontSize={fontsize}
        fontWeight="extrabold"
        lineHeight="shorter"
        bgGradient={mainGradient}
        bgClip="text"
        // textShadow={textShadow}
        textAlign={textAlign}
      >
        {title}{" "}
        <Text as="span" bgGradient={highlightGradient} bgClip="text">
          {highlight}
        </Text>
      </Heading>
    </FadeUpAnimation>
  );
};

export default GradientHeading;
