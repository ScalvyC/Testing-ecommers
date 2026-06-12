import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ICartItem = {
  id: number;
  quantity: number;
};

type ICartState = {
  cartItems: ICartItem[];
  isOpen: boolean;
};

const initialState: ICartState = {
  cartItems: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },

    increaseCartQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);

      if (item == null) {
        state.cartItems.push({ id: action.payload, quantity: 1 });
      } else {
        item.quantity += 1;
      }
    },

    decreaseCartQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);

      if (item == null) {
        return;
      }

      if (item.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload,
        );
      } else {
        item.quantity -= 1;
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
});

export const {
  openCart,
  closeCart,
  increaseCartQuantity,
  decreaseCartQuantity,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;