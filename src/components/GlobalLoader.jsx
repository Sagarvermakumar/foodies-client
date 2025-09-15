import { Box, Progress, Spinner, Text, useColorModeValue, VStack } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { useEffect, useState } from 'react'

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`

const GlobalLoader = () => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing...')

  const textColor = useColorModeValue('gray.600', 'gray.300')
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  const progressColor = useColorModeValue('brand.primary', 'brand.primary')

  const loadingMessages = [
    'Initializing...',
    'Loading components...',
    'Preparing your experience...',
    'Almost ready...',
    'Welcome to Zayka Express!'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        const currentIndex = loadingMessages.indexOf(prev)
        const nextIndex = (currentIndex + 1) % loadingMessages.length
        return loadingMessages[nextIndex]
      })
    }, 1500)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [loadingMessages])

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={bgColor}
      position="relative"
      overflow="hidden"
      w="100vw"
    >
      {/* Background Pattern */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity="0.03"
        backgroundImage="radial-gradient(circle at 25% 25%, #E11D48 0%, transparent 50%), radial-gradient(circle at 75% 75%, #22D3EE 0%, transparent 50%)"
        backgroundSize="200px 200px"
        animation={`${pulse} 3s ease-in-out infinite`}
      />

      <VStack spacing={8} maxW="400px" textAlign="center" px={6}>
        {/* Logo/Icon Placeholder */}
        <Box
          w="80px"
          h="80px"
          borderRadius="full"
          bg="brand.primary"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="lg"
          animation={`${pulse} 2s ease-in-out infinite`}
        >
          <Text fontSize="2xl" fontWeight="bold" color="white">
            ZE
          </Text>
        </Box>

        {/* Progress Bar */}
        <Box w="full">
          <Progress
            value={progress}
            colorScheme="red"
            size="lg"
            borderRadius="full"
            bg={useColorModeValue('gray.200', 'gray.700')}
            sx={{
              '& > div': {
                background: `linear-gradient(90deg, ${progressColor} 0%, #22D3EE 100%)`,
                borderRadius: 'full',
                transition: 'width 0.3s ease-in-out'
              }
            }}
          />
        </Box>

        {/* Loading Text */}
        <VStack spacing={2}>
          <Text
            fontSize="xl"
            fontWeight="semibold"
            color={textColor}
            animation={`${pulse} 1.5s ease-in-out infinite`}
          >
            {loadingText}
          </Text>
          <Text fontSize="sm" color={textColor} opacity="0.8">
            {Math.round(progress)}% Complete
          </Text>
        </VStack>

        {/* Spinner */}
        <Spinner
          thickness="3px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.primary"
          size="lg"
        />

        {/* Subtitle */}
        <Text fontSize="sm" color={textColor} opacity="0.7" maxW="300px">
          Preparing your delicious food experience with modern technology
        </Text>
      </VStack>
    </Box>
  )
}

export default GlobalLoader
