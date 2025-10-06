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





  return (
    <FadeUpAnimation duration={0.5} >
      <Heading
        fontSize={fontsize}
        fontWeight="extrabold"
        lineHeight="shorter"
        bgGradient={mainGradient}
        bgClip="text"
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
