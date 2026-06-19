import { useShoppingCart } from "../../context/shopping";
import "./AddToCart.css";

type AddToCartProps = {
  id: number;
};

export function AddToCart({ id }: AddToCartProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);

  return (
    <div className="add-to-cart">
      {quantity === 0 ? (
        <button
          className="add-to-cart-btn"
          onClick={() => increaseCartQuantity(id)}
        >
          Add To Cart
        </button>
      ) : (
        <div className="cart-controls">
          <div className="cart-quantity-controls">
            <button
              className="cart-quantity-btn"
              onClick={() => decreaseCartQuantity(id)}
            >
              -
            </button>

            <span className="cart-quantity-number">{quantity}</span>

            <button
              className="cart-quantity-btn"
              onClick={() => increaseCartQuantity(id)}
            >
              +
            </button>
          </div>

          <button
            className="cart-remove-btn"
            onClick={() => removeFromCart(id)}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
