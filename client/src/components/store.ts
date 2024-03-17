import { productItem } from "../components/ProductCard.tsx";

// Imports for state management
import { create } from "zustand";
import type {} from "@redux-devtools/extension"; // required for devtools typing

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
  name: "",
  cartItemsNumber: 0,
  cartItems: [],
  setUserName: (username: string) => set({ loggedIn: true, name: username }),
  logout: () => set({ loggedIn: false, name: "" }),
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
