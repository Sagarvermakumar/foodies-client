import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useBrandColors } from "../../hooks/useBrandColors";

const MotionButton = motion(Button);

export default function CTAButton({
  children,
  onClick,
  variant = "solid",
  ...props
}) {
  const bgSolid = useColorModeValue("#f60", "#0000006d"); // light/dark bg
  const colorSolid = useColorModeValue("white", "white");
  const hoverBg = useColorModeValue("#f50", "#ff9000");
  const { color } = useBrandColors()
  const borderGradient = useColorModeValue(
    "linear-gradient(90deg, #f60, #f90, #f10, #f60)",
    "linear-gradient(90deg, #f80, #f85, #f0a, #f80)"
  );

  return (
    <MotionButton
      {...props}
      onClick={onClick}
      size={{ base: "md", md: "md" }}
      variant={variant === "solid" ? "solid" : "outline"}
      bg={variant === "solid" ? bgSolid : "transparent"}
      color={variant === "solid" ? colorSolid : bgSolid}
      border={variant === "outline" ? "2px solid transparent" : "none"}
      borderRadius="md"
      px={6}
      py={3}
      fontWeight="bold"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        top: -2,
        left: -2,
        width: "calc(100% + 4px)",
        height: "calc(100% + 4px)",
        borderRadius: "md",
        background: borderGradient,
        backgroundSize: "200% 200%",
        zIndex: 0,
        filter: "blur(8px)",
        opacity: variant === "solid" ? 0.7 : 1,
        animation: "gradientMove 3s linear infinite",
      }}

      _hover={{ transform: 'scale(1.02)', bg: variant === "solid" ? hoverBg : "transparent", color: "#f2f2f2" }}

      _active={{ scale: 0.95 }}
      transition="all 0.2s ease"
      sx={{
        "@keyframes gradientMove": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
      zIndex={1}
    >
      <Box position="relative" zIndex={2}>
        {children}
      </Box>
    </MotionButton>
  );
}
