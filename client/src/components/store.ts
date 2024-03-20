// Imports for state management
import { create } from 'zustand';
import type { } from '@redux-devtools/extension'; // required for devtools typing

export type productItem = {
  productId: number;
  name: string;
  price: number;
  description: string[];
  nutritionFacts?: {
    servingSize: string;
    servingsPerContainer: string;
    calories: number;
    totalFat: string;
    sodium: string;
    totalCarbohydrates: string;
    dietaryFiber: string;
    sugars: string;
    protein: string;
    potassium: string;
    vitaminA: string;
    vitaminC: string;
    calcium: string;
    iron: string;
  };
  shippingDetails?: {
    dimensions: { length: string; width: string; height: string };
    weight: string;
  };

  // * I have no idea how to grab an image from the backend...
  image: string;
  stock: number;
  portion: 'lb.' | 'oz.' | 'item';
};

type UserState = {
  // States for user login
  loggedIn: boolean;
  name: string;
  cartItemsNumber: number;
  cartItems: productItem[];

  // Actions for user login
  setUserName: (username: string) => void;
  login: () => void;
  logout: () => void;
  addToCart: (product: productItem) => void;
  removeFromCart: (product: productItem) => void;
  resetCart: () => void;
};

const userStore = create<UserState>((set) => ({
  loggedIn: false,
  name: '',
  cartItemsNumber: 0,
  cartItems: [],
  setUserName: (username: string) => set({ loggedIn: true, name: username }),
  logout: () => set({ loggedIn: false, name: '' }),
  login: () => set({ loggedIn: true }),
  addToCart: (product) =>
    set((state) => ({
      cartItemsNumber: state.cartItemsNumber + 1,
      cartItems: state.cartItems.concat(product),
    })),
  removeFromCart: (product) =>
    set((state) => ({
      ...state,
      cartItems: state.cartItems.filter((item) => item !== product),
      cartItemsNumber: state.cartItemsNumber - 1,
    })),
  resetCart: () => set({ cartItemsNumber: 0, cartItems: [] }),
}));

export default userStore;
