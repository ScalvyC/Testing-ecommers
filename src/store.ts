import { configureStore } from "@reduxjs/toolkit";
import { dummyJsonApi } from "./services/dummyJsonApi";
import cartReducer, { type ICartItem } from "./features/cart/cartSlice";

const CART_STORAGE_KEY = "shopping-cart";

function loadCartItems(): ICartItem[] {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (storedCart == null) {
    return [];
  }

  try {
    return JSON.parse(storedCart);
  } catch {
    return [];
  }
}

export const store = configureStore({
  reducer: {
    [dummyJsonApi.reducerPath]: dummyJsonApi.reducer,
    cart: cartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dummyJsonApi.middleware),

  preloadedState: {
    cart: {
      cartItems: loadCartItems(),
      isOpen: false,
    },
  },
});

store.subscribe(() => {
  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(store.getState().cart.cartItems),
  );
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;