


export const itemSelector = {
  // get all items
  getAllItems: (state) => state.item.items,

  // get loading state
  isLoading: (key) => (state) => state.item.isLoading[key],

  pagination : state => state.item.pagination
}
