export interface Product {
  id?: string;
  name: string;
  // subtitle: string[];
  subtitles: [{ id: string; text: string }];
  outer_image: string;
  all_images?: { url: string }[];
  price: number;
  rating: number;
  overview: string;
  company_name: string;
  category: string;
  subcategory: string;
  quantity: number;
  discount: number;
}

export interface Details {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phonenumber: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// export interface Address {
//   name: string;
//   id: string;
//   phonenumber: string;
//   pincode: string;
//   locality: string;
//   com_address: string;
//   city: string;
//   state: string;
//   landmark: string;
//   alternate_phonenumber: string;
//   address_type: string;
//   isActiveAddress: boolean;
// }
// src/component/interfaceTypes/types.ts
export interface Address {
  id?: string;
  address_type: "HOME" | "WORK"; // Only HOME or WORK are allowed
  name: string;
  phonenumber: string;
  com_address: string;
  pincode: string;
  locality: string;
  city: string;
  state: string;
  landmark: string;
  alternate_phonenumber: string;
  isActiveAddress?: boolean;
}

export interface Order {
  id: string;
  quantity: number;
  status: "CART" | "ORDERED" | "WISHLIST";
  product: ProductDetails[];
}

export interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

export interface OrderPayload {
  userId: string;
  productId: string;
  quantity: number;
  status: "CART" | "ORDERED" | "WISHLIST";
  // navigate: any;
}

//product details slice
export interface ProductDetails {
  id: string;
  name: string;
  subtitles: { id: string; text: string }[];
  outer_image: string;
  images: { id: string; image: string }[];
  price: number;
  rating: number;
  overview: string;
  company_name: string;
  category: string;
  subcategory: string;
  quantity: number;
  discount: number;
}

export interface ProductDetailsState {
  product: ProductDetails | null;
  loading: boolean;
  error: string | null;
}

export interface CarouselProduct {
  product: ProductDetails;
}
