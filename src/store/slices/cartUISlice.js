
/**
 * Cart UI slice for managing cart-related UI state
 * @module cartUISlice
 */

import { createSlice } from "@reduxjs/toolkit";

const cartUISlice = createSlice({
  name: "cartUI",
  initialState: {
    quantities: {},
    selectedVariations: {},
    selectedAddons: {},
  },
  reducers: {
    setQuantity: (state, action) => {
      const { itemId, value } = action.payload;
      state.quantities[itemId] = Math.max(1, Math.min(99, value));
    },
    setVariation: (state, action) => {
      const { itemId, variation } = action.payload;
      state.selectedVariations[itemId] = variation;
    },
    toggleAddon: (state, action) => {
      const { itemId, addon } = action.payload;
      const current = state.selectedAddons[itemId] || [];
      const exists = current.find((a) => a._id === addon._id);

      state.selectedAddons[itemId] = exists
        ? current.filter((a) => a._id !== addon._id)
        : [...current, addon];
    },
    resetCartUI: (state) => {
      state.quantities = {};
      state.selectedVariations = {};
      state.selectedAddons = {};
    },
  },
});

export const { setQuantity, setVariation, toggleAddon, resetCartUI } =
  cartUISlice.actions;

export default cartUISlice.reducer;
