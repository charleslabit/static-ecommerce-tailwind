import { Product } from "@/lib/mockData/products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity: number;
        selectedSize: string;
        selectedColor: string;
      }>
    ) => {
      const { product, quantity, selectedSize, selectedColor } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: `${product.id}-${selectedSize}-${selectedColor}`,
          product,
          quantity,
          selectedSize,
          selectedColor,
        });
      }

      // Recalculate totals
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      // Recalculate totals
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        id: string;
        quantity: number;
      }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          item.quantity = quantity;
        }
      }

      // Recalculate totals
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },

    updateItemOptions: (
      state,
      action: PayloadAction<{
        id: string;
        selectedSize: string;
        selectedColor: string;
      }>
    ) => {
      const { id, selectedSize, selectedColor } = action.payload;
      const itemIndex = state.items.findIndex((it) => it.id === id);
      if (itemIndex === -1) {
        return;
      }

      const item = state.items[itemIndex];
      const newId = `${item.product.id}-${selectedSize}-${selectedColor}`;

      // If another item with the same product and new options exists, merge quantities
      const duplicateIndex = state.items.findIndex(
        (it, idx) =>
          idx !== itemIndex &&
          it.product.id === item.product.id &&
          it.selectedSize === selectedSize &&
          it.selectedColor === selectedColor
      );

      if (duplicateIndex !== -1) {
        // Merge quantities into the existing duplicate
        state.items[duplicateIndex].quantity += item.quantity;
        // Remove the original item
        state.items.splice(itemIndex, 1);
      } else {
        // Update the item's options and id
        item.selectedSize = selectedSize;
        item.selectedColor = selectedColor;
        item.id = newId;
      }

      // Recalculate totals
      state.totalItems = state.items.reduce(
        (total, it) => total + it.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, it) => total + it.product.price * it.quantity,
        0
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  updateItemOptions,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
} = cartSlice.actions;

export default cartSlice.reducer;
