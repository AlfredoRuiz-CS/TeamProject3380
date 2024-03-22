// Imports for state management
import type {} from '@redux-devtools/extension'; // required for devtools typing
import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // required for devtools typing
import { dummyProducts } from '@/pages/Products';

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
  isMember: boolean;
  fname: string;
  lname: string;
  email: string;
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
  cartItems: Map<productItem, number>;

  // Actions for user login
  // setUserfName: (firstname: string) => void;
  // setUserlName: (lastname: string) => void;
  // setUserEmail: (email: string) => void;
  // setUserPhone: (phone: string) => void;
  // setUserAddress: (address: object) => void;
  setUserDetails: (details: Partial<UserState>) => void;
  login: () => void;
  logout: () => void;
  addToCart: (product: productItem) => void;
  addToList: (product: productItem) => void;
  removeFromCart: (product: productItem) => void;
  changeQuantity: (product: productItem, quantity: number) => void;
  resetCart: () => void;
};

const userStore: StateCreator<UserState, [['zustand/persist', unknown]]> = (
  set
) => ({
  loggedIn: false,
  fname: '',
  lname: '',
  isAdmin: false,
  isMember: false,
  accountCreatedDate: new Date(),
  accountType: 'customer',
  email: 'test@nothing.com',
  phone: '123-456-7890',
  address: {
    street: '1234 Main St.',
    city: 'Nowhere',
    state: 'CA',
    zip: '12345',
  },
  cartItemsNumber: 0,
  cartItems: new Map<productItem, number>(
    dummyProducts.slice(0, 3).map((product, i) => [product, i + 1])
  ),
  List: [],
  setUserDetails: (details: Partial<UserState>) => set((state) => ({ ...state, ...details })),
  logout: () => set({ loggedIn: false, fname: '', lname: '', email: '', phone: '', address: {street: '', city: '', state: 'CA', zip: '', }}),
  login: () => set({ loggedIn: true }),
  addToCart: (product) =>
    set((state) => {
      state.cartItems.set(product, (state.cartItems.get(product) || 0) + 1);
      return {
        cartItemsNumber: state.cartItemsNumber + 1,
        cartItems: state.cartItems,
      };
    }),
  addToList: (product) =>
    set((state) => ({
      List: state.List.concat(product),
    })),
  removeFromCart: (product) =>
    set((state) => {
      const currentQuantity = state.cartItems.get(product);
      if (currentQuantity && currentQuantity > 1) {
        state.cartItems.set(product, currentQuantity - 1);
      } else {
        state.cartItems.delete(product);
      }
      return {
        cartItemsNumber: state.cartItemsNumber - 1,
        cartItems: state.cartItems,
      };
    }),
  changeQuantity: (product, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        state.cartItems.delete(product);
        state.cartItemsNumber -= 1;
      } else {
        state.cartItems.set(product, quantity);
      }
      return {
        cartItemsNumber: state.cartItemsNumber,
        cartItems: state.cartItems,
      };
    }),
  removeFromList: (product: productItem) =>
    set((state) => ({
      List: state.List.filter((item) => item !== product),
    })),
  resetCart: () =>
    set({ cartItemsNumber: 0, cartItems: new Map<productItem, number>() }),
});

const useUserStore = create(
  persist(userStore, {
    name: 'user-store',
    storage: createJSONStorage(() => localStorage),
  })
);

export default useUserStore;
