import {
  Box,
  Text
} from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MenuSkeleton from '../Skeletons/MenuSkeleton'
import Pagination from '../common/Pagination'
import MenuItemList from '../components/List/MenuItemList'
import MenuHeader from '../components/MenuHeader'
import { useCartActions } from '../hooks/useCartActions'
import { itemSelector } from '../store/selectors/itemselector'
import { getAllItems, setItemPage } from '../store/slices/ItemSlice'
import { setQuantity } from '../store/slices/cartUISlice'

const Menu = () => {
  const dispatch = useDispatch()
  const [searchTerm] = useState('')
  const { quantities } = useSelector((state) => state.cartUI)


  const items = useSelector(itemSelector.getAllItems);
  const isLoadingItems = useSelector(itemSelector.isLoading('items'));


  const filteredItems = items?.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const { handleAddToCart, loadingItemId } = useCartActions()

  const currentPage = useSelector(itemSelector.pagination).page
  const pagination = useSelector(state => state.item.pagination)



  useEffect(() => {
    dispatch(getAllItems(currentPage))
  }, [dispatch, currentPage])




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
        <Text color="gray.500">Item not found</Text>
      </Box>
    )
  }

  return (
    <Box mb={{ sm: 24 }}>


      {/* Search Bar */}


      {/* Menu Items */}
      {filteredItems.length === 0 ? (
        <Box textAlign="center" py={20}>
          <Text color="gray.500" fontSize="lg">
            {searchTerm
              ? 'No dishes found matching your search.'
              : 'No dishes available in this category.'}
          </Text>
        </Box>
      ) : (
        <Box my={6} >

          <MenuHeader
            title="Our Delicious Menu"
            subtitle="Explore a variety of dishes prepared with fresh ingredients for every taste."
          />
          <MenuItemList
            onAddToCart={handleAddToCart}
            onQuantityChange={handleQuantityChange}
            loadingItemId={loadingItemId}
            quantities={quantities}
            filteredItems={filteredItems}
            limit={9}
          />
          <Pagination pagination={pagination} fetchAction={getAllItems} setPageAction={setItemPage} />
        </Box>
      )}
    </Box>
  )
}

export default Menu
