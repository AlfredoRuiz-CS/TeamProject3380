// Imports for state management
import type {} from '@redux-devtools/extension'; // required for devtools typing
import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { PaymentMethod } from '@/pages/Profile';
import type {} from '@redux-devtools/extension'; // required for devtools typing

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

  image: string;
  stock: number;
  supplier: string;
  supplierStock: number;
  supplierPrice: number;
  portion: 'lb.' | 'oz.' | 'item' | 'gal.';
};

type ProductState = {
  products: productItem[];
  setProducts: (products: productItem[]) => void;
};

const productsStore: StateCreator<
  ProductState,
  [['zustand/persist', unknown]]
> = (set) => ({
  products: [],
  setProducts: (products: productItem[]) => set({ products }),
});

export const useProductsStore = create(
  persist(productsStore, {
    name: 'products-store',
    storage: createJSONStorage(() => localStorage),
  })
);

export type Supplier = {
  supplierID: number;
  name: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string;
  products: string;
};

type SupplierState = {
  suppliers: Supplier[];
  setSuppliers: (suppliers: Supplier[]) => void;
};

const supplierStore: StateCreator<
  SupplierState,
  [['zustand/persist', unknown]]
> = (set) => ({
  suppliers: [],
  setSuppliers: (suppliers: Supplier[]) => set({ suppliers }),
});

export const useSupplierStore = create(
  persist(supplierStore, {
    name: 'supplier-store',
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
  selectedPaymentMethod: PaymentMethod;
  notificationsCount: number;

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
  removeFromList: (product: productItem) => void;
  removeFromCart: (product: productItem) => void;
  changeQuantity: (product: productItem, quantity: number) => void;
  resetCart: () => void;
  resetList: () => void;
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
  selectedPaymentMethod: {
    cardId: 2,
    nameOnCard: 'NULL NULL',
    cardnumber: '0000 0000 0000 0000',
    expiration: '00/00',
    cvv: '111',
    cardtype: 'Credit',
  },
  cartItemsNumber: 0,
  cartItems: [],
  quantity: [],
  List: [],
  notificationsCount: 0,
  setUserDetails: (details: Partial<UserState>) =>
    set((state) => ({ ...state, ...details })),
  logout: () =>
    set({
      loggedIn: false,
      isMember: false,
      isAdmin: false,
      fname: '',
      lname: '',
      email: '',
      phone: '',
      address: { street: '', city: '', state: 'CA', zip: '' },
      cartItemsNumber: 0,
      cartItems: [],
      List: [],
      quantity: [],
      notificationsCount: 0
    }),
  login: (isEmployee) => {
    set((state) => ({
      loggedIn: true,
      isAdmin: isEmployee,
      isMember: isEmployee || state.isMember,
    }));
  },
  addToCart: (productToAdd, quantity = 1) =>
    set((state) => {
      const existingProductIndex = state.cartItems.findIndex(
        (item) => item.productId === productToAdd.productId
      );
      let newCartItems: productItem[] = [...state.cartItems];
      let newQuantity = [...state.quantity];

      if (existingProductIndex >= 0) {
        newQuantity[existingProductIndex] += quantity;
      } else {
        newCartItems = [...newCartItems, productToAdd];
        newQuantity.push(quantity);
      }

      const newCartItemsNumber = newQuantity.reduce(
        (total, qty) => total + qty,
        0
      );
      return {
        cartItemsNumber: newCartItemsNumber,
        cartItems: newCartItems,
        quantity: newQuantity,
      };
    }),
  addToList: (productToAdd) =>
    set((state) => {
      const isProductInList = state.List.some(
        (item) => item.productId === productToAdd.productId
      );
      if (!isProductInList) {
        return {
          List: [...state.List, productToAdd],
        };
      }
      return {};
    }),
  removeFromCart: (product) =>
    set((state) => ({
      quantity: state.quantity.filter(
        (index) => state.cartItems[index] !== product
      ),
      cartItemsNumber: state.cartItems.filter((item) => item !== product)
        .length,
      cartItems: state.cartItems.filter((item) => item !== product),
    })),
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
  resetCart: () => set({ cartItemsNumber: 0, cartItems: [], quantity: [] }),
  resetList: () => set({ List: [] }),
});

const useUserStore = create(
  persist(userStore, {
    name: 'user-store',
    storage: createJSONStorage(() => localStorage),
  })
);

export default useUserStore;
