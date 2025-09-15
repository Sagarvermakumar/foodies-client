import { extendTheme } from '@chakra-ui/react';
import * as config from "../brand.config.js";
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      primary: config.brandPrimary,
    },
  },
  fonts: {
    heading: config.brandFontHeading,
    body: config.brandFontBody,
  },
  components: {
Button: {
      defaultProps: {
        colorScheme: "yellow",
        variant: "solid",
      },
      variants: {
        solid: {
          bg: "brand.primary",
          color: "white",
          _hover: {
            bg: config.brandBtnHoverBg,
            color: "white",
            border: "1px solid transparent",
          },
          _active: {
            bg: config.brandBtnHoverBg,
            transform: "scale(0.98)",
            border:"1px solid transparent"
          },
          _focus: {
            boxShadow: "0 0 0 2px rgba(0,0,0,0.1)",
            border:"1px solid transparent",
            outline: "none",
            
          },
        },

        outline: {
          border: "1px solid",
          borderColor: config.brandPrimary,
          color: config.brandPrimary,
          bg: "transparent",
          _hover: {
            bg: "transparent",
            color: "brand.primary",
            borderColor: config.brandBtnHoverBg,
            boxShadow: `0px 0px 10px ${config.brandPrimary}`,
          },
          _active: {
            bg: config.brandBtnHoverBg,
            transform: "scale(0.98)",
          },
          _focus: {
            boxShadow: "0 0 0 2px rgba(0,0,0,0.1)",
          },
        },

        ghost: {
          bg: "transparent",
          color: config.brandPrimary,
          _hover: {
            bg: `${config.brandPrimary}1A`, // transparent hover
            border: "none"
          },
          _active: {
            bg: `${config.brandPrimary}33`,
            transform: "scale(0.98)",
            // border: "none"
          },
          _focus: {
            boxShadow: "0 0 0 2px rgba(0,0,0,0.1)",
            border: "none",
            outline: "none",
          },
        },

        link: {
          bg: "transparent",
          color: config.brandPrimary,
          px: 0,
          height: "auto",
          fontWeight: "medium",
          _hover: {
            textDecoration: "underline",
            color: config.brandBtnHoverBg,
          },
          _active: {
            color: config.brandBtnHoverBg,
          },
          _focus: {
            boxShadow: "none",
          },
        },
      },
    },

    Input: {
      defaultProps: {
        focusBorderColor: 'brand.primary',
      },
      variants: {
        filled: {
          field: {
            bg: 'gray.50',
            _hover: {
              bg: 'gray.100',
            },
            _focus: {
              bg: 'white',
            },
          },
        },
      },
    },
    Select: {
      defaultProps: {
        focusBorderColor: 'brand.primary',
      },
      variants: {
        filled: {
          field: {
            bg: 'gray.50',
            _hover: {
              bg: 'gray.100',
            },
            _focus: {
              bg: 'white',
            },
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: '2xl',
          boxShadow: 'lg',
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          borderRadius: '2xl',
        },
      },
    },
    Tabs: {
      defaultProps: {
        colorScheme: 'yellow',
      },
    },
    Tab: {
      _hover: { bg: 'brand.primary' },
      _active: { bg: 'transparent', border: 'none', outline: 'none' },
      _focus: { boxShadow: 'none', border: 'none', outline: 'none' },
      _focusVisible: { boxShadow: 'none', border: 'none', outline: 'none' },
    },
  },

  styles: {
    global: (props) => ({
      body: {
        bg: 'transparent',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
})

export default theme
