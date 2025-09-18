import {
  Clock,
  HomeIcon,
  ListOrdered,
  ListStartIcon,
  MapPinCheckIcon,
  Utensils,
} from 'lucide-react'

import hero1 from './images/h1.avif'
import hero2 from './images/h2.avif'
import hero3 from './images/h3.avif'
import hero4 from './images/h4.avif'
import hero5 from './images/h5.avif'
import hero6 from './images/h6.avif'

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
    label: 'Home',
    path: '/',
    icon: HomeIcon,
  },
  {
    label: 'Orders',
    path: '/orders',
    icon: ListOrdered,
  },
]

export const ORDER_STATUS = [
  'PLACED',
  'CONFIRMED',
  'PREPARING',
  'READY',
  'PICKED',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'CANCELLED',
  'REFUNDED',
  'COMPLETE',
]

export const HERO_IMAGES = [hero1, hero2, hero3, hero4, hero5, hero6]
