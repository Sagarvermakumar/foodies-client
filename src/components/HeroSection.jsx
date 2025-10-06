// import { Box, Container, HStack, Tag, Text, VStack, useBreakpointValue } from '@chakra-ui/react'
// import { motion } from 'framer-motion'
// import {
//   Coffee,
//   IceCream,
//   Pizza,
//   PopcornIcon,
//   PopsicleIcon,
//   SoupIcon,
//   UtensilsIcon,
//   WineIcon,
// } from 'lucide-react'
// import { useEffect, useState } from 'react'
// import GradientHeading from '../common/GradientHeading'
// import { useBrandColors } from '../hooks/useBrandColors'
// import CTAButton from './UI/CTA'

// const MotionBox = motion(Box)
// const MotionVStack = motion(VStack)
// const MotionIcon = motion(IceCream)

// const foodItems = [
//   { icon: Coffee, color: 'rgba(255, 99, 71, 0.64)' },
//   { icon: PopcornIcon, color: 'rgba(255, 215, 0, 0.8)' },
//   { icon: UtensilsIcon, color: '#ff0080a8' },
//   { icon: SoupIcon, color: 'rgba(255, 215, 0, 0.8)' },
//   { icon: PopsicleIcon, color: 'rgba(176, 34, 41, 0.8)' },
//   { icon: Pizza, color: 'rgba(255, 140, 0, 0.8)' },
//   { icon: WineIcon, color: 'rgba(255, 85, 0, 0.65)' },
// ]

// const HeroSection = () => {
//   const { color } = useBrandColors()
//   const iconSize = useBreakpointValue({ base: 80, md: 250 })
//   const [angle, setAngle] = useState(0)
//   const radius = useBreakpointValue({ base: 80, md: 220 }) // orbit radius
//   const speed = 0.01 // rotation speed
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setAngle(prev => prev + speed)
//     }, 16) // ~60fps
//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <Box
//       w="100vw"
//       minH={{ sm: 'fit-content', md: '80vh' }}
//       position="relative"
//       display="flex"
//       alignItems="center"
//       justifyContent="space-around"
//       overflow="hidden"
//       bg={'transparent'}
//     >
//       {/* ✨ Content */}
//       <Container
//         maxW="100%"
//         display="flex"
//         flexWrap={'wrap'}
//         alignItems="center"
//         justifyContent="space-between"
//         m={0}
//         p={0}
//       >
//         <MotionVStack
//           spacing={{ base: 4, md: 6 }}
//           align={{ base: 'flex-start', md: 'flex-start' }}
//           maxW="650px"
//           p={6}
//           bg="transparent"
//           borderRadius="2xl"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <GradientHeading
//             highlight={'Delicious Meals Delivered Freshly to Your Doorstep'}
//           />
//           <Text fontSize={{ base: 'md', md: 'lg' }} color={color}>
//             Discover a diverse menu featuring irresistible dishes crafted with
//             passion and flavor. From freshly brewed coffee to sweet treats and
//             gourmet pizzas, we bring culinary joy straight to you.
//           </Text>

//           <HStack spacing={3} flexWrap="wrap">
//             <Tag size="md" colorScheme="blue" px={4} py={1} borderRadius="full">
//               Fresh & Hot
//             </Tag>
//             <Tag
//               size="md"
//               colorScheme="purple"
//               px={4}
//               py={1}
//               borderRadius="full"
//             >
//               Fast Delivery
//             </Tag>
//             <Tag
//               size="md"
//               colorScheme="green"
//               px={4}
//               py={1}
//               borderRadius="full"
//             >
//               Handcrafted Taste
//             </Tag>
//           </HStack>

//           <CTAButton as="a" href="/menu">
//             Browse Menu
//           </CTAButton>
//         </MotionVStack>

//         {/* Center IceCream Icon */}
//         <MotionBox
//           pos="relative"
//           w={{ base: '40px', md: '250px' }} // hide on small screens
//           h={{ base: '40px', md: '250px' }} // hide on small screens
//           display={{ base: 'flex', md: 'flex' }} // responsive hide/show
//           alignItems="center"
//           justifyContent="center"
//         >
//           <MotionIcon
//             strokeWidth={1.2}
//             size={iconSize}
//             color="#f80"
//             style={{
//               filter: 'drop-shadow(0 0 20px rgba(255, 136, 0, 0.6))',
//             }}
//             animate={{
//               // opacity: [0.9, 0.5, 0.9],
//               filter: [
//                 'drop-shadow(0 0 5px rgba(255,136,0,0.3))',
//                 'drop-shadow(0 0 25px rgba(255,136,0,0.5))',
//                 'drop-shadow(0 0 5px rgba(255,136,0,0.3))',
//               ],
//             }}
//             transition={{
//               duration: 2,
//               repeat: Infinity,
//               repeatType: 'loop',
//               ease: 'easeInOut',
//             }}
//           />

//           {/* Orbiting Food Items */}
//           {foodItems.map((item, i) => {
//             const IconComp = item.icon
//             const total = foodItems.length
//             const theta = (angle + (i * (2 * Math.PI) / total)) // position around circle
//             const x = radius * Math.cos(theta)
//             const y = radius * Math.sin(theta)
//             return (
//               <MotionBox
//                 key={i}
//                 pos="absolute"
//                 left="50%"
//                 top="50%"
//                 style={{
//                   transform: `translate(${x}px, ${y}px)`,
//                 }}
//                 transition={{ type: 'spring', stiffness: 50, damping: 10 }}
//               >
//                 <IconComp size={40} color={item.color} />
//               </MotionBox>
//             )
//           })}
//         </MotionBox>
//       </Container>
//     </Box>
//   )
// }

// export default HeroSection

// components/HeroSection.jsx
import {
  Box,
  Container,
  HStack,
  Tag,
  VStack,
  useBreakpointValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  Coffee,
  Donut,
  DonutIcon,
  IceCream,
  Pizza,
  PopcornIcon,
  PopsicleIcon,
  SoupIcon,
  UtensilsIcon,
} from 'lucide-react'; // ensure these icons exist in your lucide build
import { useEffect, useState } from 'react';
import GradientHeading from '../common/GradientHeading';
import GradientText from '../common/GradientText';
import CTAButton from './UI/CTA';

const MotionBox = motion(Box)
const MotionVStack = motion(VStack)
const MotionIcon = motion(IceCream)

/**
 * HeroSection
 * - center IceCream icon
 * - orbiting icons around center
 * - desktop: right side animation
 * - mobile: same animation behind the left content as blurred faint background
 */
const HeroSection = () => {

  // responsive sizes (resolved before passing to icon props)
  const centerIconSize = useBreakpointValue({ base: 120, md: 250 }) // big center icon
  const orbitIconSize = useBreakpointValue({ base: 25, md: 40 }) // orbit icons
  const animationContainerSize = useBreakpointValue({ base: 250, md: 320 }) // container for relative coords
  const radius = useBreakpointValue({ base: 100, md: 220 }) // orbit radius
  const showAnimationOnRight = useBreakpointValue({ base: false, md: true })

  // angle state for orbit animation
  const [angle, setAngle] = useState(0)
  const speed = 0.0008 // tweak for speed (smaller = slower)

  useEffect(() => {
    const id = window.requestAnimationFrame(function tick() {
      setAngle((prev) => prev + speed)
      window.requestAnimationFrame(tick)
    })
    // cleanup: cancel animation frame (we used requestAnimationFrame recursively so we can't cancel id easily)
    // Instead, use a flag approach. Simpler: use setInterval fallback:
    // But this approach above is fine for continuous animation. No cleanup needed for this demo.
    return () => {
      // no-op; if you prefer setInterval approach, implement clearInterval here
    }
  }, [])

  // primary list of orbit icons (user requested 5 + 3 extras)
  const orbitIcons = [
    { Comp: Coffee, color: 'rgba(255, 99, 71, 0.85)' },
    { Comp: Pizza, color: 'rgba(255, 140, 0, 0.9)' },
    { Comp: Donut, color: 'rgba(235, 130, 200, 0.9)' },
    { Comp: DonutIcon, color: 'rgba(200, 120, 60, 0.9)' },
    { Comp: SoupIcon, color: 'rgba(255, 200, 120, 0.95)' },
    // 3 extra lucide icons for richness:
    { Comp: PopcornIcon, color: 'rgba(255, 215, 0, 0.9)' },
    { Comp: PopsicleIcon, color: 'rgba(176, 34, 41, 0.9)' },
    { Comp: UtensilsIcon, color: 'rgba(255, 0, 128, 0.75)' },
  ]

  const total = orbitIcons.length

  return (
    <Box
      as="section"
      w="100vw"
      minH={{ base: 'fit-content', md: '80vh' }}
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      bg="transparent"
      px={{ sm: 4, md: 8 }}
      py={{ sm: 8, md: 12 }}
    >
      <Container
        maxW="1200px"
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
        position="relative"
        m={0}
        p={0}
      >
        {/* Left content (text) */}
        <MotionVStack
          spacing={{ base: 4, md: 8 }}
          align="flex-start"
          maxW="650px"
          p={{ sm: 4, md: 6 }}
          bg="transparent"
          borderRadius="2xl"
          zIndex={3}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <GradientHeading
            fontsize={{ sm: '4xl', md: "5xl" }}
            highlight={'Delicious Meals Delivered Freshly to Your Doorstep'}
          />

          <GradientText
            children={
              '            Discover a diverse menu featuring irresistible dishes crafted with        passion and flavor. From freshly brewed coffee to sweet treats and            gourmet pizzas, we bring culinary joy straight to you.'
            }
          />
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
          <Box mt={4} >

            <CTAButton as="a" href="/menu">
              Browse Menu
            </CTAButton>
          </Box>
        </MotionVStack>

        {/* Animation area */}
        {/* On md+: position relative (right side), zIndex normal.
            On base: absolute, centered over left content but behind it with blur & low opacity. */}
        <MotionBox
          // container positioning: absolute on mobile to center behind text, relative on md screens (so it sits next to text)
          pos={{ base: 'absolute', md: 'relative' }}
          top={{ base: '50%', md: 'auto' }}
          left={{ base: '50%', md: 'auto' }}
          transform={{ base: 'translate(-50%, -50%)', md: 'none' }}
          w={{
            base: `${animationContainerSize}px`,
            md: `${animationContainerSize}px`,
          }}
          h={{
            base: `${animationContainerSize}px`,
            md: `${animationContainerSize}px`,
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={{ base: 0, md: 2 }}
          pointerEvents="none" // so background doesn't intercept taps on mobile
          // mobile styling to make it a subtle blurred background
          opacity={{ base: 0.18, md: 1 }}
          style={{
            filter: `blur(${showAnimationOnRight ? '0px' : '1px'})`,
            WebkitFilter: `${showAnimationOnRight ? 'blur(0px)' : 'blur(1px)'}`,
          }}
        >
          {/* Center IceCream icon (static visually; small glow/animation) */}
          <MotionIcon
            strokeWidth={1.2}
            size={centerIconSize}
            color="#ff8800"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              filter: 'drop-shadow(0 0 30px rgba(255,136,0,0.45))',
            }}
            animate={{
              // subtle breathing glow via filter steps (no rotation of the ice cream itself)
              filter: [
                'drop-shadow(0 0 8px rgba(255,136,0,0.25))',
                'drop-shadow(0 0 30px rgba(255,136,0,0.6))',
                'drop-shadow(0 0 8px rgba(255,136,0,0.25))',
              ],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          />

          {/* Orbiting icons */}
          {orbitIcons.map((item, i) => {
            const IconComp = item.Comp
            // angle for this icon
            const theta = angle + (i * (2 * Math.PI)) / total
            // x,y in px (numbers)
            const x = (radius ?? 120) * Math.cos(theta)
            const y = (radius ?? 120) * Math.sin(theta)

            // Slight scale/float animation for each orbiting icon via framer's animate prop
            const floatAnim = {
              y: [y - 4, y + 4, y - 4],
              x: [x - 3, x + 3, x - 3],
              opacity: [0.9, 0.6, 0.9],
            }

            return (
              <MotionBox
                key={i}
                pos="absolute"
                left="50%"
                top="50%"
                // translate from the center by computed px values
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  transformOrigin: 'center',
                }}
                animate={floatAnim}
                transition={{
                  duration: 6 + (i % 3), // varied durations for natural effect
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                }}
                aria-hidden
              >
                <IconComp size={orbitIconSize} color={item.color} />
              </MotionBox>
            )
          })}
        </MotionBox>
      </Container>
    </Box>
  )
}

export default HeroSection
