import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import {
  ClipboardList,
  Home,
  MenuIcon,
  MoonIcon,
  ShoppingCart,
  SunIcon,
  User
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { brandDarkBg } from '../brand.config'
import { useBrandColors } from '../hooks/useBrandColors'
import { authSelectors } from '../store/selectors/authSelectors'
import { logoutUser } from '../store/slices/authSlice'

const MotionFlex = motion(Flex)
const MotionBox = motion(Box)
const MotionButton = motion(Button);
const MotionSpan = motion.span;
const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { borderColor } = useBrandColors()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const isAuthenticated = useSelector(authSelectors.isAuthenticated)
  const user = useSelector(authSelectors.getUser)
  const cart = useSelector((state) => state.cart.items)

  const cartItemCount = cart?.reduce((total, item) => total + item?.qty, 0)

  const navItems = [
    { label: "Home", to: "/", icon: <Home size={20} /> },
    { label: "Menus", to: "/menu", icon: <MenuIcon size={20} /> },
    { label: "Cart", to: "/cart", icon: <ShoppingCart size={20} />, badge: cartItemCount },
    { label: "Orders", to: "/orders", icon: <ClipboardList size={20} /> },
    {
      label: isAuthenticated ? "Profile" : "Login",
      to: isAuthenticated ? "/profile" : "/login",
      icon: <User size={20} />,
    },
  ];



  const isActive = (to) => {
    return to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
  };
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap()
      toast.success('Logged out successfully')
      navigate('/login')
    } catch (error) {
      toast.error('Logout failed', { description: error.message })
    }
  }

  return (
    <>
      {/* ===== Desktop / Tablet Header ===== */}
      <Box
        bg="transparent"
        px={4}
        // borderBottom={1}
        // borderStyle="solid"
        borderColor={borderColor}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        backdropFilter="blur(30px) saturate(50%)"
        display={{ base: 'none', md: 'block' }}
        boxShadow={'1px 1px 50px rgba(255, 25, 0, 0.13)'}
      >
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <RouterLink to="/">
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="brand.primary"
              _hover={{ color: 'red.700' }}
            >
              Zayka Express
            </Text>
          </RouterLink>

          {/* Desktop Nav */}
          <HStack spacing={8} alignItems="center">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;

              return (
                <RouterLink key={item.to} to={item.to}>
                  <button
                    style={{
                      position: "relative",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "16px",
                      fontWeight: isActive ? "600" : "400",
                      color: isActive ? "#E53E3E" : "#444",
                    }}
                  >
                    {item.icon}
                    {item.label}

                    {/* Badge only for Cart */}
                    {item.label === "Cart" && cartItemCount > 0 && (
                      <Badge
                        colorScheme="red"
                        position="absolute"
                        top="-8px"
                        right="-12px"
                        borderRadius="full"
                        fontSize="xs"
                      >
                        {cartItemCount}
                      </Badge>
                    )}

                    {/* Animated underline */}
                    {isActive && (
                      <MotionSpan
                        layoutId="nav-underline" // shared layout for smooth transition
                        style={{
                          position: "absolute",
                          bottom: "-4px",
                          left: 0,
                          right: 0,
                          height: "2px",
                          backgroundColor: "#E53E3E",
                          borderRadius: "2px",
                        }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                </RouterLink>
              );
            })}
          </HStack>

          {/* Right side */}
          <Flex alignItems="center" gap={4}>
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              colorScheme="red"
            />
            {isAuthenticated ? (
              <Menu orientation='vertical' >
                <MenuButton rounded="full">
                  <Avatar src={user?.avatar.url} name={user?.name || 'User'} />
                </MenuButton>
                <MenuList>
                  <RouterLink to="/profile">
                    <MenuItem>Profile</MenuItem>
                  </RouterLink>
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <RouterLink to="/login">
                <Button colorScheme="red" variant="solid">
                  Login
                </Button>
              </RouterLink>
            )}
          </Flex>
        </Flex>
      </Box>

      {/* ===== Mobile Bottom Navigation ===== */}
      <Flex
        display={{ base: "flex", md: "none" }}
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        bg={useColorModeValue("#ffffffcc", brandDarkBg)}
        borderTop="1px solid"
        borderColor={borderColor}
        justify="space-around"
        align="center"
        pt={16}
        py={2}
        zIndex={20}
        backdropFilter="blur(12px)"
        borderTopRadius="2xl"
      >
        {navItems.map((item) => {
          const active = isActive(item.to);
          return item.to && item.label !== "Cart" ? (
            <RouterLink key={item.to} to={item.to}>
              <MotionFlex
                direction="column"
                align="center"
                color={active ? "#f80" : "inherit"}
                whileTap={{ scale: 0.9 }}
              >
                {item.icon}
                <Text fontSize="xs">{item.label}</Text>
                {active && <ActiveIndicator />}
              </MotionFlex>
            </RouterLink>
          ) : (
            <RouterLink key={item.to} to={item.to} style={{ position: "relative" }}>
              <MotionFlex
                direction="column"
                align="center"
                color={active ? "#f80" : "inherit"}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{ scale: cartItemCount > 0 ? 1.2 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.icon}
                </motion.div>
                <Text fontSize="xs">{item.label}</Text>

                {item.badge > 0 && (
                  <Badge
                    position="absolute"
                    top="0"
                    right="-14px"
                    colorScheme="red"
                    borderRadius="full"
                    fontSize="xs"
                  >
                    {item.badge}
                  </Badge>
                )}

                {active && <ActiveIndicator />}
              </MotionFlex>
            </RouterLink>
          );
        })}
      </Flex>
    </>
  )
}

const ActiveIndicator = () => (
  <MotionBox
    layoutId="active-mobile-indicator"
    height="3px"
    bg="#f80"
    width="100%"
    mt={1}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    whileHover={{ scaleX: 1.1 }}
  />
);

export default Header
