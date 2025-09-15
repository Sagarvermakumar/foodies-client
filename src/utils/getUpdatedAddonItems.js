
/**
 * Get updated addon items
 * @param {*} prev : Previous addon items
 * @param {*} itemId : ID of the item to update
 * @param {*} addon : New addon data
 * @returns : Updated addon items
 */


export   function getUpdatedAddonItems(prev, itemId, addon) {
    return prev.map((item) => {
      if (item._id === itemId) {
        const alreadySelected = item.selectedAddons?.find(
          (a) => a._id === addon._id
        )
        return {
          ...item,
          selectedAddons: alreadySelected
            ? item.selectedAddons.filter((a) => a._id !== addon._id)
            : [...(item.selectedAddons || []), addon],
        }
      }
      return item
    })
  }