  
  /**
   * Get updated variation items
   * @param {*} prev : Previous variation items
   * @param {*} itemId : ID of the item to update
   * @param {*} variation : New variation data
   * @returns : Updated variation items
   */
  
  export function getUpdatedVariationItems(prev, itemId, variation) {
    return prev.map((item, i) => {
      if (item._id === itemId) {
        return {
          ...item,
          selectedVariation: variation,
          priceSnapshot: (variation[i]?.price || 0) ?? (item?.price || 0),
        }
      }
      return item
    })
  }