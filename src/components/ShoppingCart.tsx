import { useEffect, useState } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import type { Product } from "../constants/types";
import { NavLink } from "react-router-dom";
import "./ShopppingCart.css";
import { useShoppingCart } from "../context/shopping";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json.products))
      .catch((error) => console.error("Failed to fetch products:", error));
  }, []);

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}

          <div>
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = products.find(
                  (product) => product.id === cartItem.id,
                );

                return total + (item?.price || 0) * cartItem.quantity;
              }, 0),
            )}
          </div>
          <div className="checkout-btn">
            <NavLink to="/Checkout">Proceed to Checkout</NavLink>
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
