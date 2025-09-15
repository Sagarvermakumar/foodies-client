import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import theme from './theme'

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ChakraProvider theme={theme} >
      <HelmetProvider>
        <App />
      </HelmetProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff'
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff'
            }
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff'
            }
          }
        }}
      />
    </ChakraProvider>
  </Provider>
  // </React.StrictMode>,
)