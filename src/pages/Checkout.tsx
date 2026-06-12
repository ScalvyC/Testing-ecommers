import { CartItem } from "../components/CartItem";
import { useShoppingCart } from "../context/shopping";
import "./Checkout.css";

export function Checkout() {
  const { cartItems } = useShoppingCart();

  return (
    <div className="checkout-page">
      <div className="cart-items-wrapper">
        <div className="cart-items">
          <div className="checkout-h1">
            <h1>Checkout</h1>
          </div>
          <div className="items-list-container">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <CartItem key={item.id} id={item.id} quantity={item.quantity} />
              ))
            )}
          </div>
        </div>
      </div>

      <div className="payment-section-wrapper">
        <div className="payment-section">
          <div className="payment-h1">
            <h1>Payment</h1>
          </div>

          <div className="payment-options-1">
            <h5>Pay by Card</h5>
            <h5>Pay with PayPal</h5>
          </div>

          <div className="payment-options-2">
            <ul>
              <li>Card</li>
              <li>Apple Pay</li>
              <li>Google Pay</li>
              <li>Alipay</li>
            </ul>
          </div>

          <div className="payment-form">
            <form onSubmit={(e) => e.preventDefault()}>
              <label>Email Address</label>
              <input type="email" placeholder="jenny@example.com" required />

              <label>Card Number</label>
              <input type="text" placeholder="1234 1234 1234 1234" required />

              <label>Cardholder Name</label>
              <input type="text" placeholder="John Doe" required />

              <div className="form-row-split">
                <div>
                  <label>Expiry Date</label>
                  <input
                    type="month"
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <label>CVV</label>
                  <input
                    type="password"
                    maxLength={4}
                    placeholder="123"
                    required
                  />
                </div>
              </div>

              <input type="submit" value="Pay Now" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
