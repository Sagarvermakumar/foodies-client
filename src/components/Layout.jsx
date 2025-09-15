import { Box, Container, Flex, useColorMode } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import GlassLayout from './GlassLayout'
import Header from './Header'

const MotionBox = motion(Box);
const Layout = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex flexDir="column" minH="100vh" minW="91vw" maxW={'98vw'} m={'auto'} overflowX="hidden" >
      {/* Background */}
      <Box
        position="fixed"
        top={0}
        left={0}
        w="100%"
        h="100%"
        zIndex={-1}
        bg={colorMode === "dark" ? "#000000ff" : "#fff"}
      >
        <GlassLayout />
      </Box>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <Container
        maxW="100%"
        overflowX="hidden"
        minH="100vh"
        pb={{ sm: 20, md: 8 }}
        pt={{ sm: 12, md: 20 }}
        bg={colorMode === "dark" ? "#0000000a" : "transparent"}
      >
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Outlet />
        </MotionBox>
      </Container>
    </Flex>
  )
}

export default Layout
