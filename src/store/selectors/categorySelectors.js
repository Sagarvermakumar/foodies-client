export const categorySelectors = {
  // Get all categories
  getCategories: (state) => state.category.categories,

  // Get current category
  getCurrentCategory: (state) => state.category.currentCategory,

  // Get category items
  getCategoryItems: (state) => state.category.categoryItems,

  // Get loading state
  isLoading: key=> (state) => state.category.loading[key],

  // Get error state
  getError: (state) => state.category.error
}
