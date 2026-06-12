import { createContext, useContext, type ReactNode } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  closeCart as closeCartAction,
  decreaseCartQuantity as decreaseCartQuantityAction,
  increaseCartQuantity as increaseCartQuantityAction,
  openCart as openCartAction,
  removeFromCart as removeFromCartAction,
  type CartItem,
} from "../features/cart/cartSlice";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

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
