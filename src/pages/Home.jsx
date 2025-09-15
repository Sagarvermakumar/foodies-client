import {
  Box,
  Card,
  CardBody,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useBrandColors } from '../hooks/useBrandColors.js'
import { useCartActions } from '../hooks/useCartActions'
import { authSelectors } from '../store/selectors/authSelectors'
import { setQuantity } from '../store/slices/cartUISlice'

import { features } from '../assets/index.js'
import CTASection from '../components/CTASection.jsx'
import HeroSection from '../components/HeroSection.jsx'
import CategoryList from '../components/List/CategoryList.jsx'
import MenuItemList from '../components/List/MenuItemList.jsx'
import MenuHeader from '../components/MenuHeader.jsx'
import CategoryListSkeleton from '../Skeletons/CategoryList.jsx'
import MenuSkeleton from '../Skeletons/MenuSkeleton.jsx'
import { categorySelectors } from '../store/selectors/categorySelectors.js'
import {
  getCategories,
  getMenusByCategory,
} from '../store/slices/categorySlice'

const MotionCard = motion(Card)

const Home = () => {
  const { borderColor, color, bg } = useBrandColors()
  const dispatch = useDispatch()
  const user = useSelector(authSelectors.getUser)
  const isAuthenticated = useSelector(authSelectors.isAuthenticated)

  const categories = useSelector(categorySelectors.getCategories)
  const categoryItems = useSelector(categorySelectors.getCategoryItems)
  const isLoadingCategory = useSelector(categorySelectors.isLoading('category'))
  const isLoadingItems = useSelector(categorySelectors.isLoading('items'))

  const [selectedCategory, setSelectedCategory] = useState('')
  console.log("cat : ", categories)
  const { quantities } = useSelector((state) => state.cartUI)
  const { handleAddToCart, loadingItemId } = useCartActions()

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    if (Array.isArray(categories) && categories.length > 0) {
      setSelectedCategory(categories[0]._id)
    }
  }, [categories])

  useEffect(() => {
    if (selectedCategory) {
      dispatch(getMenusByCategory(selectedCategory))
    }
  }, [dispatch, selectedCategory])

  useEffect(() => {
    if (Array.isArray(categoryItems) && categoryItems.length > 0) {
      const initialQuantities = {}
      categoryItems.forEach((item) => {
        initialQuantities[item.id] = 1
      })
      dispatch(setQuantity(initialQuantities))
    }
  }, [categoryItems, dispatch])

  const handleQuantityChange = (itemId, value) => {
    dispatch(setQuantity({ itemId, value }))
  }

  return (
    <Stack spacing={{ sm: 4, md: 8 }} m={0} p={0} width={'100%'} >
      {/* Hero Section */}

      <HeroSection />

      {/* Features Section */}
      <MenuHeader title={'Why Choose Zayka Express?'} mt={4} />
      <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 4 }} spacing={4} m={0} >
        {Array.isArray(features) &&
          features.map((feature, index) => (
            <MotionCard
              key={index}
              textAlign="center"
              bg={bg}
              border={'1px solid'}
              borderColor={borderColor}
              direction="row"
              align="center"
              gap={3}
              p={4}
              w="100%"
              mx="auto"
              borderRadius="2xl"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              m={0}
            >
              <CardBody bg={'transparent'} m={0} >
                <VStack spacing={4}>

                  {feature.icon && (
                    <Icon as={feature.icon} boxSize={8} color="brand.primary" />
                  )}
                  <Heading size="md">{String(feature.title || '')}</Heading>
                  <Text color="gray.600" fontSize="sm">
                    {String(feature.description || '')}
                  </Text>
                </VStack>
              </CardBody>
            </MotionCard>
          ))}
      </SimpleGrid>

      {/* Categories Section */}
      <Box mb={12} id="menu" my={4}>
        <MenuHeader
          title={'Choose Your Favorite Category'}
          subtitle={
            'Explore a variety of delicious dishes curated just for you. Browse, select, and enjoy your meal with ease!'
          }
        />
        {isLoadingCategory ? (
          <CategoryListSkeleton />
        ) : (
          Array.isArray(categories) && (
            <CategoryList
              categories={categories}
              setSelectedCategory={setSelectedCategory}
            />
          )
        )}
      </Box>

      {/* Menu List */}
      <Box  >
        {isLoadingItems ? (
          <MenuSkeleton />
        ) : (
          <>
            <MenuHeader
              title="Our Delicious Menu"
              subtitle="Explore a variety of dishes prepared with fresh ingredients for every taste."
            />
            {Array.isArray(categoryItems) && (
              <MenuItemList
                onAddToCart={handleAddToCart}
                loadingItemId={loadingItemId}
                quantities={quantities}
                filteredItems={categoryItems}
                onQuantityChange={handleQuantityChange}
              />
            )}
          </>
        )}
      </Box>

      {/* CTA Section */}
      <CTASection color={color} isAuthenticated={isAuthenticated} />
    </Stack>
  )
}

export default Home
