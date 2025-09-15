import { brandName } from "../brand.config";

export const seoRoutes = {
  '/': {
    title: ` ${brandName} | Home`,
    description: 'Order tasty fast food online from Zayka Express with quick delivery!',
    ogImage: 'https://example.com/home-og-image.jpg',
  },
  '/cart': {
    title: 'Your Cart - Zayka Express',
    description: 'Review your cart before placing your order at Zayka Express.',
    ogImage: 'https://example.com/cart-og-image.jpg',
  },
  '/orders': {
    title: 'Your Orders - Zayka Express',
    description: 'Track all your orders from Zayka Express in one place.',
    ogImage: 'https://example.com/orders-og-image.jpg',
  },
  '/profile': {
    title: 'Your Profile - Zayka Express',
    description: 'Manage your profile and preferences at Zayka Express.',
    ogImage: 'https://example.com/profile-og-image.jpg',
  },
  // Add more routes here
};

