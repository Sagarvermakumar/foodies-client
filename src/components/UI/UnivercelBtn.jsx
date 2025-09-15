import { Box, Button, Spinner, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionButton = motion(Button);

export default function UnivercelBtn({
  children,
  onClick,
  variant = "solid", // solid | outline
  size = "md",
  leftIcon,
  rightIcon,
  isLoading = false,
  ...props
}) {
  const bgSolid = useColorModeValue("#f60", "#0000006d"); // light/dark bg
  const colorSolid = useColorModeValue("white", "white");
  const hoverBg = useColorModeValue("#f50", "#ff9000");

  const borderGradient = useColorModeValue(
    "linear-gradient(90deg, #f60, #f90, #ff0, #f60)",
    "linear-gradient(90deg, #f80, #ff5, #f0a, #f80)"
  );

  return (
    <MotionButton
      onClick={onClick}
      size={size}
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
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      isLoading={isLoading}
      spinner={<Spinner size="sm" color="white" />}
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
        border: "none",
        zIndex: 0,
        filter: "blur(8px)",
        opacity: variant === "solid" ? 0.7 : 1,
        animation: "gradientMove 3s linear infinite",
      }}
      _focus={{
        border: "none"
      }}
      _hover={{
        scale: 1.05,
        color: "white",
        bg: variant === "solid" ? hoverBg : "transparent",
      }}
      _active={{ scale: 0.95, bg: variant === "solid" ? hoverBg : "transparent", border: "none" }}
      sx={{
        "@keyframes gradientMove": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
      zIndex={1}
      {...props}
    >
      <Box position="relative" zIndex={2} display="flex" alignItems="center" gap={2}>
        {children}
      </Box>
    </MotionButton>
  );
}
