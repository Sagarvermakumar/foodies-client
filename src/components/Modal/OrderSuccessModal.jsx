import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useBrandColors } from '../../hooks/useBrandColors'

const MotionSvg = motion.svg
const MotionBox = motion(Box)

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      type: 'spring',
      stiffness: 200,
    },
  }),
}

const OrderSuccessModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate()

  const { bg, color } = useBrandColors()
  const handleTrackOrder = () => {
    navigate('/orders') // ✅ button click pe redirect
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale"  >
      <ModalOverlay bg={bg} w={'full'} backdropFilter="blur(6px)" />
      <ModalContent
        bg={bg}
        w={'full'}
        p={6}
        rounded="2xl"
        shadow="xl"
        border="1px solid rgba(255, 255, 255, 0.2)"
      >
        <MotionBox
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <ModalHeader
            textAlign="center"
            fontSize="xl"
            fontWeight="bold"
            color="green.500"
          >
            🎉 Order Placed Successfully!
          </ModalHeader>
        </MotionBox>

        <ModalBody>
          <VStack spacing={6} textAlign="center">
            {/* ✅ Animated Checkmark SVG */}
            <MotionSvg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
              width="80"
              height="80"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 10 }}
            >
              <circle
                cx="26"
                cy="26"
                r="25"
                fill="none"
                stroke="#38A169"
                strokeWidth="3"
              />
              <motion.path
                fill="none"
                stroke="#38A169"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 27l7 7 17-17"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </MotionSvg>
            <MotionBox
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <Text fontSize="lg" fontWeight="medium" color={color} >
                Your order has been placed successfully.
              </Text>
            </MotionBox>
            <MotionBox
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <Text fontSize="sm" color={color}>
                Redirecting you to Track Order page...
              </Text>
            </MotionBox>
          </VStack>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button

            size="lg"
            rounded="full"
            px={8}
            onClick={handleTrackOrder}
            _hover={{ transform: 'scale(1.05)' }}
            transition="all 0.2s ease"
          >
            Track Order Now
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default OrderSuccessModal
