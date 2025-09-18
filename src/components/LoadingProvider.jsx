import { Box, useColorModeValue } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import GlobalLoader from './GlobalLoader'

const LoadingContext = createContext()

const slideIn = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(0); }
`



export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const startLoading = useCallback((message = 'Loading...') => {
    setLoadingMessage(message)
    setIsLoading(true)
  }, [])

  const stopLoading = useCallback(() => {
    setIsLoading(false)
    setLoadingMessage('')
  }, [])

  const value = useMemo(() => ({
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading
  }), [isLoading, loadingMessage, startLoading, stopLoading])

  return (
    <LoadingContext.Provider value={value}>
      {children}

      {/* Global Loading Overlay */}
      {isLoading && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="9999"
          bg={bgColor}
          backdropFilter="blur(4px)"
          animation={`${slideIn} 0.3s ease-out`}
          borderColor={borderColor}
        >
          <GlobalLoader />
        </Box>
      )}

      {/* Top Loading Bar */}
      {isLoading && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          height="3px"
          bg="brand.primary"
          zIndex="10000"
          animation={`${slideIn} 0.3s ease-out`}
          boxShadow="0 0 10px rgba(225, 29, 72, 0.5)"
        />
      )}
    </LoadingContext.Provider>
  )
}


export default LoadingProvider