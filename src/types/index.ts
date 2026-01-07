export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'artist' | 'user';
  avatar: string;
  bio?: string;
}

export interface Product {
  id: number;
  title: string;
  category: 'Paintings' | 'Sketches' | 'Digital Art' | 'Sculptures';
  artistId: number;
  artistName: string;
  price: number;
  discount: number;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  orderId: string;
  userId: number;
  items: {
    productId: number;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'Pending' | 'Completed' | 'Cancelled';
  date: string;
}

export type Category = 'All' | 'Paintings' | 'Sketches' | 'Digital Art' | 'Sculptures';
export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
