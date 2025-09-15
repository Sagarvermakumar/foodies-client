import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
const PageNotFound = () => {
    const navigate = useNavigate()
    const handleBackToHome = () => {

        navigate('/')

    };

    return (
        <Box w={'full'} h={'full'} display={'flex'} justifyContent={'center'} alignItems={'center'} >
            <VStack
                spacing={8}
                w={{ sm: "sm", md: "md", lg: 'xl' }}

                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDir={"column"}
                m={16}
                px={4}
                py={16}
                textAlign={'center'}
                bgGradient={'linear(145deg, #131313, #101010)'}
                boxShadow={" 5px 5px 9px #0a0a0a,      -5px -5px 9px #1a1a1a"}
                borderRadius={"8px"}
            >
                {/* Warning Icon */}
                {/* <MediaError/> */}
                <FaMedal size={45} />
                {/* Heading */}
                <Heading size="lg" color="gray.100">
                    Page Not Found
                </Heading>

                {/* Description */}
                <Text color="gray.600" fontSize="md">
                    Sorry, the page you are looking for does not exist or has been moved.
                </Text>

                {/* Go to Home Button */}
                <Button
                    variant="solid"
                    onClick={handleBackToHome}
                >
                    Go to Home
                </Button>
            </VStack>
        </Box>
    );
};



export default PageNotFound