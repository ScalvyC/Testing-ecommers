import { type ReactNode } from "react";
import { ShoppingCart } from "../components/Cart/ShoppingCart";
import {
  closeCart as closeCartAction,
  decreaseCartQuantity as decreaseCartQuantityAction,
  increaseCartQuantity as increaseCartQuantityAction,
  openCart as openCartAction,
  removeFromCart as removeFromCartAction,
} from "../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { ShoppingCartContext } from "./shopping";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const isOpen = useAppSelector((state) => state.cart.isOpen);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0,
  );

  const openCart = () => {
    dispatch(openCartAction());
  };

  const closeCart = () => {
    dispatch(closeCartAction());
  };

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    dispatch(increaseCartQuantityAction(id));
  }

  function decreaseCartQuantity(id: number) {
    dispatch(decreaseCartQuantityAction(id));
  }

  function removeFromCart(id: number) {
    dispatch(removeFromCartAction(id));
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartQuantity,
        cartItems,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
