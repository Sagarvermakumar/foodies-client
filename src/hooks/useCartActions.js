/**
 * Custom hook to handle cart actions
 * @returns {Object} - Cart action handlers, loading state
 */

import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authSelectors } from "../store/selectors/authSelectors";
import { addToCart } from "../store/slices/cartSlice";

export const useCartActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
    const location = useLocation();
  const user = useSelector(authSelectors.getUser)
  const { quantities, selectedVariations, selectedAddons } = useSelector(
    (state) => state.cartUI
  );
  const [loadingItemId, setLoadingItemId] = useState(null);

  const handleAddToCart = async (item) => {
    if(!item.isAvailable){
     return toast.error("Item Not available")
    }
    const quantity = quantities[item._id] || 1;
    const variation = selectedVariations[item._id] || {};
    const addons = selectedAddons[item._id] || [];

    try {
          if (!user) {
      // 🚪 Agar user nahi hai → login pe redirect with state
      navigate("/login", { state: { from: location } });
      return;
    }
      setLoadingItemId(item._id);


      await dispatch(
        addToCart({
          itemId: item._id,
          quantity,
          variation,
          addons,
          unitPrice: item.price,
          discount: item.discount,
          outletId: item.outlet?._id,
        })
      ).unwrap();

      toast.success(`${item.name} added to cart!`);
    } catch (error) {
      toast.error(`Failed to add item to cart: ${error}`);
    } finally {
      setLoadingItemId(null);
    }
  };

  return { handleAddToCart, loadingItemId };
};

