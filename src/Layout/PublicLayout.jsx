import { Box, Flex, useColorMode } from '@chakra-ui/react';
import GlassLayout from '../components/GlassLayout';
const PublicLayout = ({ children }) => {
  const { colorMode } = useColorMode();
  return (
    <Flex flexDir="column" minH="100vh" w="99vw" overflowX="hidden" className="sidebar">
      {/* Background */}
      <Box
        position="fixed"
        top={0}
        left={0}
        w="100%"
        h="100%"
        zIndex={-1}
        bg={colorMode === "dark" ? "#000" : "#fff"}
      >
        <GlassLayout />
      </Box>

      {/* <PublicLayout /> */}


      {/* Main Content */}
      <Box flex="1" minH="100%" px={{ base: 4, md: 4, lg: 8 }} overflowY="auto" pb={{ sm: 28, md: 16, lg: 8 }} m={0} bg={colorMode === "dark" ? "#0000000a" : "transparent"}>

        {children}
      </Box>
    </Flex>







  );
};


export default PublicLayout