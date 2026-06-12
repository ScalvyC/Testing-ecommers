import { Button, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useShoppingCart } from "../context/shopping";

export function Navbar() {
  const { cartItems, openCart } = useShoppingCart();
  return (
    <NavbarBs sticky="top" className="navbar-main">
      <div className="row1">
        <div className="row1-column1">
          <div className="row1-column1-section1">
            <p>📍 668 Olive Street Moconee, NY</p>
            <p>✉️ cosymart@gmail.com</p>
          </div>

          <div className="row1-column1-section2">
            <NavLink to="/" className="nav-link-item">
              Home
            </NavLink>

            <NavLink to="/store" className="nav-link-item">
              Store
            </NavLink>

            <NavLink to="/about" className="nav-link-item">
              About
            </NavLink>
          </div>
        </div>

        <div className="row1-column2">
          <h1>CosyMart</h1>
        </div>

        <div className="row1-column3">
          <div className="row1-column3-section1">
            <p>⏰ Open Time - 9:00 AM to 10:00PM</p>

            <div className="login-register">
              <span className="normal-text">Log In</span>
              <span>|</span>
              <span className="normal-text">Register Now</span>
            </div>
          </div>

          {/* COLUMN 3, SECTION 2 */}
          <div className="row1-column3-section2">
            <div className="right-nav-text">
              <span className="normal-text">Accessories</span>
              <span className="normal-text">Page+</span>
              <span className="normal-text">Contact US</span>
            </div>

            <div className="right-icons">
              <span className="icon-text">🔍</span>

              <div className="cart-wrapper">
                <Button
                  type="button"
                  className="cart-button"
                  aria-label="Cart"
                  onClick={openCart}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1.5 7A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.49-.402L1.61 2H.5a.5.5 0 0 1-.5-.5zM3.14 4l1.25 6h8.22l1.286-6H3.14z" />
                    <path d="M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                </Button>

                {cartItems.length > 0 && (
                  <div className="cart-badge">{cartItems.length}</div>
                )}
              </div>

              <span className="heart-icon">♥</span>
            </div>
          </div>
        </div>
      </div>
    </NavbarBs>
  );
}
