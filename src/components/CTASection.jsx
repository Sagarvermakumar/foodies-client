import { Box, Button, Container, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import CTAButton from "./UI/CTA";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

export default function CTASection({ isAuthenticated, color }) {
  const navigate = useNavigate()
  return (
    <Box
      bg="transparent"
      py={16}
      mb={{ base: 12, md: 0 }}
      borderRadius="2xl"
      textAlign="center"
      display="flex"
      justifyContent="center"
    >
      <Container maxW="container.md" p={0}>
        <VStack spacing={8}>
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Heading size="xl" color={color}>
              Hungry? We’ve Got You Covered 🍴
            </Heading>
          </motion.div>

          {/* Sub Text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Text fontSize="lg" color="gray.500">
              From quick bites to full meals — <b>Zayka Express</b> delivers fresh, hot,
              and delicious food right at your doorstep in minutes.
            </Text>
          </motion.div>

          {/* Buttons */}
          <HStack spacing={4} pt={4}>
            <CTAButton size="lg" onClick={() => navigate('/menu')} >
              Browse All Menu
            </CTAButton>

            {!isAuthenticated && (
              <MotionButton
                as={RouterLink}
                to="/register"
                size="lg"
                variant="outline"
                colorScheme="red"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Sign Up & Save 20%
              </MotionButton>
            )}
          </HStack>

          {/* Extra Trust Line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Text fontSize="sm" color="gray.400" mt={4}>
              🚚 Free delivery on your first order • 🔒 100% Secure Payments • ⭐ Trusted by 10,000+ foodies
            </Text>
          </motion.div>
        </VStack>
      </Container>
    </Box>
  );
}
