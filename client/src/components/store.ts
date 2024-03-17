import { productItem } from "../components/ProductCard.tsx";

// Imports for state management
import { create } from "zustand";
import type {} from "@redux-devtools/extension"; // required for devtools typing

export type UserState = {
  // States for user login
  loggedIn: boolean;
  name: string;
  cartItemsNumber: number;
  cartItems: productItem[];

  // Actions for user login
  login: (username: string) => void;
  logout: () => void;
  addToCart: (product: productItem) => void;
  removeFromCart: (product: productItem) => void;
  resetCart: () => void;
};

export const userStore = create<UserState>()((set) => ({
  loggedIn: false,
  name: "",
  cartItemsNumber: 0,
  cartItems: [],
  login: (username: string) => set({ loggedIn: true, name: username }),
  logout: () => set({ loggedIn: false, name: "" }),
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
