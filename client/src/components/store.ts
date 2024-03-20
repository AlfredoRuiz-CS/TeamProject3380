// Imports for state management
import type { } from '@redux-devtools/extension'; // required for devtools typing
import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
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
    totalFat?: string;
    sodium?: string;
    totalCarbohydrates?: string;
    dietaryFiber?: string;
    sugars?: string;
    protein?: string;
    potassium?: string;
    vitaminA?: string;
    vitaminC?: string;
    calcium?: string;
    iron?: string;
  };
  shippingDetails?: {
    dimensions: { length: string; width: string; height: string };
    weight: string;
  };

  // * I have no idea how to grab an image from the backend...
  image: string;
  stock: number;
  supplier: string;
  supplierStock: number;
  portion: 'lb.' | 'oz.' | 'item';
};

type UserState = {
  // States for user login
  loggedIn: boolean;
  isAdmin: boolean;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  accountCreatedDate: Date;
  accountType: 'customer' | 'admin';
  cartItemsNumber: number;
  List: productItem[];
  cartItems: productItem[];

  // Actions for user login
  setUserName: (username: string) => void;
  login: () => void;
  logout: () => void;
  addToCart: (product: productItem) => void;
  addToList: (product: productItem) => void;
  removeFromCart: (product: productItem) => void;
  resetCart: () => void;
};

const userStore: StateCreator<UserState, [['zustand/persist', unknown]]> = (
  set
) => ({
  loggedIn: false,
  name: '',
  isAdmin: false,
  accountCreatedDate: new Date(),
  accountType: 'customer',
  email: 'test@nothing.com',
  password: 'greatgooglymoogly123',
  phone: '123-456-7890',
  address: {
    street: '1234 Main St.',
    city: 'Nowhere',
    state: 'CA',
    zip: '12345',
  },
  cartItemsNumber: 0,
  cartItems: [],
  List: [],
  setUserName: (username: string) => set({ loggedIn: true, name: username }),
  logout: () => set({ loggedIn: false, name: '' }),
  login: () => set({ loggedIn: true }),
  addToCart: (product) =>
    set((state) => ({
      cartItemsNumber: state.cartItemsNumber + 1,
      cartItems: state.cartItems.concat(product),
    })),
  addToList: (product) =>
    set((state) => ({
      List: state.List.concat(product),
    })),
  removeFromCart: (product) =>
    set((state) => ({
      ...state,
      cartItems: state.cartItems.filter((item) => item !== product),
      cartItemsNumber: state.cartItemsNumber - 1,
    })),
  resetCart: () => set({ cartItemsNumber: 0, cartItems: [] }),
});

const useUserStore = create(
  persist(userStore, {
    name: 'user-store',
    storage: createJSONStorage(() => localStorage),
  })
);

export default useUserStore;
