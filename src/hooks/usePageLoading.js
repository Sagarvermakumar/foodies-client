import { useEffect } from 'react'
import { useLoading } from '../components/LoadingProvider'

export const usePageLoading = (isLoading, message = 'Loading page...') => {
  const { startLoading, stopLoading } = useLoading()

  useEffect(() => {
    if (isLoading) {
      startLoading(message)
    } else {
      stopLoading()
    }

    return () => {
      stopLoading()
    }
  }, [isLoading, message, startLoading, stopLoading])

  return { isLoading }
}

export default usePageLoading
