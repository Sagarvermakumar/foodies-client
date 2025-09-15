import { Clock, HomeIcon, ListOrdered, ListStartIcon, MapPinCheckIcon, Utensils } from 'lucide-react';















export const features = [
  {
    icon: Clock,
    title: 'Fast Delivery',
    description: 'Get your food delivered in 30 minutes or less',
  },
  {
    icon: ListStartIcon,
    title: 'Quality Food',
    description: 'Fresh ingredients and hygienic preparation',
  },
  {
    icon: MapPinCheckIcon,
    title: 'Wide Coverage',
    description: 'Delivering across the city with multiple locations',
  },
  {
    icon: Utensils,
    title: 'Variety',
    description: 'Hundreds of dishes from different cuisines',
  },
]



// Grouped sidebar items
export const sidebarMenus = [
  {
    label:"Home",
    path:"/",
    icon: HomeIcon
  },
  {
    label:"Orders",
    path:"/orders",
    icon: ListOrdered
  },
];

export const ORDER_STATUS = [
  "PLACED",
  "CONFIRMED",
  "PREPARING",
  "READY",
  "PICKED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
  "COMPLETE",
];

export const  featuredCategories = [
    {
      id: 1,
      name: 'North Indian',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
      description: 'Authentic North Indian cuisine with rich flavors',
      itemCount: 45,
      rating: 4.5
    },
    {
      id: 2,
      name: 'South Indian',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
      description: 'Traditional South Indian dishes and breakfast',
      itemCount: 38,
      rating: 4.3
    },
    {
      id: 3,
      name: 'Chinese',
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d8d5?w=400',
      description: 'Delicious Chinese cuisine with Indian twist',
      itemCount: 52,
      rating: 4.4
    },
    {
      id: 4,
      name: 'Fast Food',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
      description: 'Quick and tasty fast food options',
      itemCount: 67,
      rating: 4.2
    }
  ]