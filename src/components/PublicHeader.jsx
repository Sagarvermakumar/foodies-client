import {
  Box,
  Button,
  Flex,
  IconButton,
  Text,
  useColorMode
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import {
  MoonIcon,
  SunIcon
} from 'lucide-react'
import { Link as RouterLink } from 'react-router-dom'
import { useBrandColors } from '../hooks/useBrandColors'

const MotionFlex = motion(Flex)
const MotionBox = motion(Box)
const MotionButton = motion(Button);
const MotionSpan = motion.span;
const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { borderColor } = useBrandColors()




  return (
    <Box
      bg="transparent"
      px={4}
      // borderBottom={1}
      // borderStyle="solid"
      borderColor={borderColor}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      backdropFilter="blur(30px) saturate(50%)"
      display={{ base: 'none', md: 'block' }}
      boxShadow={'1px 1px 50px rgba(255, 25, 0, 0.13)'}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <RouterLink to="/">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="brand.primary"
            _hover={{ color: 'red.700' }}
          >
            Zayka Express
          </Text>
        </RouterLink>


        {/* Right side */}
        <Flex alignItems="center" gap={4}>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            colorScheme="red"
          />

        </Flex>
      </Flex>
    </Box>


  )
}

export default Header
