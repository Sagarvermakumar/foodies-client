import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useBrandColors } from "../hooks/useBrandColors";

const MotionBox = motion(Box);

const AuthInfoBox = ({ type, }) => {
  const { color } = useBrandColors();

  // Content map for both login methods
  const content = {
    email: {
      title: "Welcome Back 👋",
      subtitle: "Access your Zayka Express account with email & password.",
    },
    otp: {
      title: "Quick Login ⚡",
      subtitle: "Get instant access using secure OTP sent to your email.",
    },
    register: {
      title: "Join the Foodies Family 🍔",
      subtitle:
        "Create your Zayka Express account to enjoy quick food delivery, exclusive offers, and loyalty rewards.",
    },
    forgotPassword: {
      title: "Reset Your Password 🔒",
      subtitle:
        "Forgot your password? Don’t worry — reset it easily and get back to enjoying your favorite meals.",
    },
  };

  return (
    <MotionBox
      display={{ base: "block", md: "none" }} // only visible in small screens
      p={4}
      mb={4}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Flex direction="column" textAlign="center">
        <Heading size="lg" mb={2} color={color}>
          {content[type].title}
        </Heading>
        <Text fontSize="sm" color="gray.500">
          {content[type].subtitle}
        </Text>
      </Flex>
    </MotionBox>
  );
};

export default AuthInfoBox;
