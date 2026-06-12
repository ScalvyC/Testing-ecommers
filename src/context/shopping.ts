import { createContext, useContext } from "react";
import type { ICartItem } from "../features/cart/cartSlice";

type IShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: ICartItem[];
};

export const ShoppingCartContext = createContext({} as IShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}