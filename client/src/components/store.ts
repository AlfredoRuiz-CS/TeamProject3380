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
  category: 'produce' | 'meat' | 'fish' | 'dairy' | 'snacks';
  nutritionFacts?: {
    servingSize: string;
    servingsPerContainer: string;
    calories: number;
    totalFat?: string;
    cholesterol?: string;
    sodium?: string;
    totalCarbohydrates?: string;
    dietaryFiber?: string;
    sugars?: string;
    protein?: string;
    potassium?: string;
    vitaminA?: string;
    vitaminC?: string;
    vitaminD?: string;
    vitaminE?: string;
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
  portion: 'lb.' | 'oz.' | 'item' | 'gal.';
};

type ProductState = {
  products: productItem[];
  setProducts: (products: productItem[]) => void;
};

const productsStore: StateCreator<ProductState, [['zustand/persist', unknown]]> = (set) => ({
  products: [],
  setProducts: (products: productItem[]) => set({ products }),
});

export const useProductsStore = create(
  persist(productsStore, {
    name: 'products-store',
    storage: createJSONStorage(() => localStorage),
  })
);

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
  accountType: 'customer' | 'employee';
  cartItemsNumber: number;
  List: productItem[];
  cartItems: productItem[];
  quantity: number[];

  // Actions for user login
  // setUserfName: (firstname: string) => void;
  // setUserlName: (lastname: string) => void;
  // setUserEmail: (email: string) => void;
  // setUserPhone: (phone: string) => void;
  // setUserAddress: (address: object) => void;
  setUserDetails: (details: Partial<UserState>) => void;
  login: (isEmployee: boolean) => void;
  logout: () => void;
  addToCart: (productToAdd: productItem, quantity: number) => void;
  addToList: (product: productItem) => void;
  // removeFromCart: (product: productItem) => void;
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
  cartItems: [],
  quantity: [],
  List: [],
  setUserDetails: (details: Partial<UserState>) =>
    set((state) => ({ ...state, ...details })),
  logout: () =>
    set({
      loggedIn: false,
      fname: '',
      lname: '',
      email: '',
      phone: '',
      address: { street: '', city: '', state: 'CA', zip: '' },
      cartItemsNumber: 0,
      cartItems: [],
      List: [],
      quantity: []
    }),
  login: (isEmployee) => {
    set((state) => ({ 
      loggedIn: true,
      isAdmin: isEmployee,
      isMember: isEmployee || state.isMember
    }));
  },
  addToCart: (productToAdd, quantity=1) =>
    set((state) => {
      const existingProductIndex = state.cartItems.findIndex(item => item.productId === productToAdd.productId);
      let newCartItems: productItem[] = [...state.cartItems];
      let newQuantity = [...state.quantity];

      if (existingProductIndex >= 0) {
        newQuantity[existingProductIndex] += quantity;
      } else {
        newCartItems = [...newCartItems, productToAdd];
        newQuantity.push(quantity);
      }

      const newCartItemsNumber = newQuantity.reduce((total, qty) => total + qty, 0);
      return {
        cartItemsNumber: newCartItemsNumber,
        cartItems: newCartItems,
        quantity: newQuantity,
      };
    }),
    addToList: (productToAdd) =>
    set((state) => {
      const isProductInList = state.List.some(item => item.productId === productToAdd.productId);
      if (!isProductInList) {
        return {
          List: [...state.List, productToAdd]
        };
      }
      return {};
    }),
  /*removeFromCart: (product) =>
    set((state) => {
      const newCartItems = state.cartItems.filter((item) => item !== product);
      return {
        quantity: state.quantity.filter(
          (q, i) => state.cartItems[i] !== product
        ),
        cartItemsNumber: newCartItems.length,
        cartItems: newCartItems,
      };
    }),*/
  changeQuantity: (product, quantity) =>
    set((state) => {
      const newQuantity = state.quantity.map((q, i) =>
        state.cartItems[i] === product ? quantity : q
      );
      return { quantity: newQuantity };
    }),
  removeFromList: (product: productItem) =>
    set((state) => ({
      List: state.List.filter((item) => item !== product),
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
