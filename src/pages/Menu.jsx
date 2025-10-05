import {
  Box,
  IconButton,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'

import { SlidersHorizontalIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MenuSkeleton from '../Skeletons/MenuSkeleton'
import Pagination from '../common/Pagination'
import MenuItemList from '../components/List/MenuItemList'
import MenuFilters from '../components/MenuFilter'
import MenuHeader from '../components/MenuHeader'
import { useCartActions } from '../hooks/useCartActions'
import { categorySelectors } from '../store/selectors/categorySelectors'
import { itemSelector } from '../store/selectors/itemselector'
import { getAllItems, setItemPage } from '../store/slices/ItemSlice'
import { setQuantity } from '../store/slices/cartUISlice'
import { getCategories } from '../store/slices/categorySlice'

const Menu = () => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { quantities } = useSelector((state) => state.cartUI)
  const categories = useSelector(categorySelectors.getCategories)

  const items = useSelector(itemSelector.getAllItems);
  const isLoadingItems = useSelector(itemSelector.isLoading('items'));

  const { handleAddToCart, loadingItemId } = useCartActions()

  const currentPage = useSelector(itemSelector.pagination).page
  const pagination = useSelector(state => state.item.pagination)



  useEffect(() => {
    dispatch(getAllItems(currentPage))
  }, [dispatch, currentPage])

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])


  const handleApplyFilter = filters => {
    console.log({ filters })
    dispatch(getAllItems({ page: currentPage, ...filters }));
  }
  useEffect(() => {
    // Initialize quantities for all items
    if (items?.length > 0) {
      const initialQuantities = {}
      items.forEach((item) => {
        initialQuantities[item.id] = 1
      })
      dispatch(setQuantity(initialQuantities))
    }
  }, [items, dispatch])

  const handleQuantityChange = (itemId, value) => {
    dispatch(setQuantity({ itemId, value }))
  }



  if (isLoadingItems) {
    return (
      <MenuSkeleton />
    )
  }

  if (!items) {
    return (
      <Box textAlign="center" py={20}>
        <Text color="gray.500" fontSize="lg">

          No dishes found matching your search
        </Text>
      </Box>
    )
  }

  return (
    <Stack spacing={8} mb={{ sm: 24 }}>
      {/* Header with Filter Icon */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <MenuHeader
          showBack={true}
          title="Our Delicious Menu"
          subtitle="Explore a variety of dishes prepared with fresh ingredients for every taste."
        />
        {/* Filter Button */}
        <IconButton
          icon={<SlidersHorizontalIcon />}
          aria-label="Open Filters"
          onClick={onOpen}
          variant="solid"
          borderRadius={'full'}

        />
      </Box>

      {/* Drawer for Filters */}



      <MenuFilters onFilterChange={handleApplyFilter} categories={categories} isOpen={isOpen} onClose={onClose} />



      <MenuItemList
        onAddToCart={handleAddToCart}
        onQuantityChange={handleQuantityChange}
        loadingItemId={loadingItemId}
        quantities={quantities}
        filteredItems={items}
        limit={9}
      />
      <Pagination
        pagination={pagination}
        fetchAction={getAllItems}
        setPageAction={setItemPage}
      />

    </Stack>
  )
}

export default Menu
