import { Box, Container, HStack, Tag, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import {
  Coffee,
  IceCream,
  Pizza,
  PopcornIcon,
  PopsicleIcon,
  SoupIcon,
  UtensilsIcon,
  WineIcon,
} from 'lucide-react'
import GradientHeading from '../common/GradientHeading'
import { useBrandColors } from '../hooks/useBrandColors'
import CTAButton from './UI/CTA'

const MotionBox = motion(Box)
const MotionVStack = motion(VStack)
const foodItems = [
  // Left/top icons
  {
    icon: Coffee,
    x: '59%',
    y: '32%',
    size: 40,
    animY: [-5, 5],
    animX: [-3, 3],
    duration: 6,
    color: 'rgba(255, 99, 71, 0.64)',
  },
  {
    icon: PopcornIcon,
    x: '73%',
    y: '10%',
    size: 40,
    animY: [-5, 5],
    animX: [-3, 3],
    duration: 6,
    color: 'rgba(255, 215, 0, 0.8)',
  },
  {
    icon: UtensilsIcon,
    x: '60%',
    y: '66%',
    size: 40,
    animY: [-7, 7],
    animX: [-4, 4],
    duration: 5,
    color: '#ff0080a8',
  },

  // Right/bottom icons
  {
    icon: SoupIcon,
    x: { sm: '10%', md: '87%' },
    y: '67%',
    size: 40,
    animY: [-6, 6],
    animX: [-2, 2],
    duration: 7,
    color: 'rgba(255, 215, 0, 0.8)',
  },
  {
    icon: PopsicleIcon,
    x: { sm: '15%', md: '87%' },
    y: '23%',
    size: 40,
    animY: [-4, 4],
    animX: [-3, 3],
    duration: 6.5,
    color: 'rgba(176, 34, 41, 0.8)',
  },

  // Bottom/left icons
  {
    icon: Pizza,
    x: '73%',
    y: '85%',
    size: 40,
    animY: [-6, 6],
    animX: [-3, 3],
    duration: 6.8,
    color: 'rgba(255, 140, 0, 0.8)',
  },
  {
    icon: WineIcon,
    x: '6%',
    y: '3%',
    size: 40,
    animY: [-6, 6],
    animX: [-3, 3],
    duration: 6.8,
    color: 'rgba(255, 85, 0, 0.65)',
  },

  // Center big Pizza icon
]

const MotionIcon = motion(IceCream)
const HeroSection = () => {
  const { color } = useBrandColors()

  return (
    <Box
      w="100vw"
      minH={{ sm: '60vh', md: '100vh' }}
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      overflow="hidden"
      bg={'transparent'}
    >
      {/* 🍔 Animated Food Icons */}
      {foodItems.map((item, i) => {
        const IconComp = item.icon
        return (
          <MotionBox
            key={i}
            position="absolute"
            top={item.y}
            left={item.x}
            animate={{
              y: item.animY,
              x: item.animX,
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
            zIndex={1}
          >
            <IconComp size={item.size} color={item.color} visibility={0} />
          </MotionBox>
        )
      })}

      {/* ✨ Content */}
      <Container
        maxW="100%"
        display="flex"
        flexWrap={'wrap'}
        alignItems="center"
        justifyContent="space-between"
      >
        <MotionVStack
          spacing={{ sm: 6, md: 8 }}
          align={{ base: 'flex-start', md: 'flex-start' }}
          maxW="650px"
          color="whiteAlpha.900"
          p={6}
          bg="transparent"
          borderRadius="2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <GradientHeading
            highlight={'Delicious Meals Delivered Freshly to Your Doorstep'}
          />
          <Text fontSize={{ base: 'md', md: 'lg' }} color={color}>
            Discover a diverse menu featuring irresistible dishes crafted with
            passion and flavor. From freshly brewed coffee to sweet treats and
            gourmet pizzas, we bring culinary joy straight to you.
          </Text>

          <HStack spacing={3} flexWrap="wrap">
            <Tag size="md" colorScheme="blue" px={4} py={1} borderRadius="full">
              Fresh & Hot
            </Tag>
            <Tag
              size="md"
              colorScheme="purple"
              px={4}
              py={1}
              borderRadius="full"
            >
              Fast Delivery
            </Tag>
            <Tag
              size="md"
              colorScheme="green"
              px={4}
              py={1}
              borderRadius="full"
            >
              Handcrafted Taste
            </Tag>
          </HStack>

          <CTAButton as="a" href="/menu">
            Browse Menu
          </CTAButton>
        </MotionVStack>

        {/* Right Side Hero Image/Icon */}
        <MotionBox
          pos={'relative'}
          w={{ base: '150px', md: '250px' }}
          h={{ base: '150px', md: '250px' }}
          initial={{ visibility: 1 }}

          animate={{ y: [-10, 10], x: [-5, 5], visibility: 0.8 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          pl={20}
        >
          <Box pos="absolute" right={{ sm: '15%', md: '83%' }}>
            <MotionIcon
              strokeWidth={1.5}
              size={{ base: 20, sm: 20, md: 250 }}
              color="#f80"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(255, 136, 0, 0.6))',
              }}
              animate={{
                // opacity: [0.9, 0.5, 0.9],
                filter: [
                  'drop-shadow(0 0 5px rgba(255,136,0,0.3))',
                  'drop-shadow(0 0 25px rgba(255,136,0,0.8))',
                  'drop-shadow(0 0 5px rgba(255,136,0,0.3))',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
              }}
            />
          </Box>
        </MotionBox>
      </Container>
    </Box>
  )
}

export default HeroSection
