import { Product } from '@/app/types/product';




export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'MacBook Pro',
    price: 1299,
    description: 'Ordinateur portable haute performance avec processeur M2',
    image: 'https://via.placeholder.com/200?text=MacBook',
    category: 'Électronique',
    rating: 4.8
  },
  {
    id: '2',
    name: 'iPhone 15',
    price: 999,
    description: 'Dernier modèle iPhone avec caméra améliorée',
    image: 'https://via.placeholder.com/200?text=iPhone',
    category: 'Téléphones',
    rating: 4.7
  },
  {
    id: '3',
    name: 'AirPods Pro',
    price: 249,
    description: 'Écouteurs sans fil avec suppression active du bruit',
    image: 'https://via.placeholder.com/200?text=AirPods',
    category: 'Audio',
    rating: 4.6
  },
  {
    id: '4',
    name: 'iPad Air',
    price: 599,
    description: 'Tablette polyvalente avec écran Retina',
    image: 'https://via.placeholder.com/200?text=iPad',
    category: 'Tablettes',
    rating: 4.5
  }
];