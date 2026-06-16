import "./Home.css";
import { useEffect, useState } from "react";
import { type Product, type Category } from "../constants/types";
import {
  useGetProductsQuery,
  useLazyGetProductQuery,
} from "../services/dummyJsonApi";
import { StoreItem } from "../components/StoreItem";

export function Home() {
  const { data: products = [] } = useGetProductsQuery(6);
  const [getProduct] = useLazyGetProductQuery();
  const [categories, setCategories] = useState<Category[]>([]);
  const [productOfTheWeek, setProductOfTheWeek] = useState<Product>();
  const [randomProductId] = useState<number>(
    () => Math.floor(Math.random() * 5) + 1,
  );

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data: Category[]) => {
        setCategories(data);
      });

    getProduct(randomProductId)
      .unwrap()
      .then((data) => {
        setProductOfTheWeek(data);
      });
  }, [getProduct, randomProductId]);

  return (
    <div>
      <div style={{ marginLeft: 10, marginRight: 10 }}>
        <div className="home-top-space"></div>

        <div className="home-row1">
          <div className="home-row1-column1">
            <div className="category-title">= Shop By Categories</div>

            <div className="category-list">
              {categories.map((category) => (
                <p key={category.slug} className="category-card">
                  {category.name}
                </p>
              ))}
            </div>
          </div>

          <div className="home-row1-column2">
            <div className="hero-content">
              <p className="hero-small-text">New Fashion Collection 2025</p>
              <h1>Styles Accessories & New Gadgets</h1>
              <p className="hero-description">
                Technology to processes, from B2C to book invoice.
              </p>
              <button>Shop Now</button>
            </div>
          </div>
        </div>
        <div className="home-top-space"></div>
        <div className="home-row2">
          <div className="home-row2-column1">
            <div>
              <p className="special-text">Special Offer</p>
              <h2>Home Pod Mini</h2>
              <p>Best Dresses Discount 40% OFF</p>
              <button>Shop Now</button>
            </div>

            <div className="circle-placeholder">40%</div>
          </div>

          <div className="home-row2-column2 service-card">
            <div className="service-icon">🚚</div>
            <h3>Quick Response</h3>
            <p>
              Technologies to processes, B2C E-commerce computer science Our
              responsibility
            </p>
          </div>

          <div className="home-row2-column3 service-card">
            <div className="service-icon">👤</div>
            <h3>Customer Value</h3>
            <p>
              As business owners, you know there&apos;s no shortage of manual
              AI-powered features.
            </p>
          </div>

          <div className="home-row2-column4 service-card">
            <div className="service-icon">💰</div>
            <h3>Money Guarantee</h3>
            <p>
              In the past, this was manual. It&apos;s now sped up considerably
              with generated products.
            </p>
          </div>
        </div>
        <div className="home-top-space"></div>
        <div className="home-row3">
          <div className="home-row3-column1">
            <div className="deal-title">☰ Deals of the Week</div>

            <div className="deal-card">
              <div className="deal-image-placeholder">
                {productOfTheWeek && (
                  <img
                    src={productOfTheWeek.thumbnail}
                    alt={productOfTheWeek.title}
                  />
                )}
              </div>

              <h3>{productOfTheWeek?.title}</h3>

              <div className="deal-line"></div>

              <p>Hurry Up! Offers end In:</p>

              <div className="timer-boxes">
                <div>40 days</div>
                <div>16 hours</div>
                <div>56 mins</div>
                <div>30 secs</div>
              </div>
            </div>
          </div>

          <div className="home-row3-column2">
            <div className="home-row3-column2-section1">
              <h2>Deals of the Week</h2>

              <div className="product-tabs">
                <span>Featured Products</span>
                <span>New Arrivals</span>
                <span>Top Selling Products</span>
              </div>
            </div>

            <div className="home-row3-column2-section2">
              <div className="store-grid">
                {products.map((item) => (
                  <div className="store-card" key={item.id}>
                    <StoreItem {...item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home-top-space"></div>
      <footer>
        <div className="home-footer">
          <div className="home-footer-row1">
            <div className="home-footer-row1-column1">
              <h1>
                Cosy<span>Mart</span>
              </h1>

              <p>
                If you're in e-commerce, you already know the value of updates
                you're sending them.
              </p>

              <p>+1 (800) 060-07-30</p>
              <p>cosymart@example.com</p>
              <p>Mon-Sat 10:00pm - 7:00pm</p>

              <div className="home-footer-row2">
                <div className="home-footer-row2-line"></div>
                <h2>We Accept</h2>
              </div>

              <div className="home-footer-row3">
                <div>VISA</div>
                <div>MC</div>
                <div>Pay</div>
                <div>PayPal</div>
              </div>
            </div>

            <div className="home-footer-row1-column2">
              <h2>Quick Links</h2>
              <p>About Us</p>
              <p>Delivery Information</p>
              <p>Privacy Policy</p>
              <p>Brands</p>
              <p>Contact Us</p>
              <p>Site Map</p>
              <p>Products Return</p>
              <p>FAQs</p>
            </div>

            <div className="home-footer-row1-column3">
              <h2>Company Information</h2>
              <p>Store Location</p>
              <p>Order History</p>
              <p>Wish List</p>
              <p>Newsletter</p>
              <p>Specials</p>
              <p>Gift Certificates</p>
              <p>Affiliate</p>
              <p>Blog Post</p>
            </div>

            <div className="home-footer-row1-column4">
              <h2>CosyMart Gallery</h2>

              <div className="home-footer-row4">
                <div className="home-footer-box"></div>
                <div className="home-footer-box"></div>
                <div className="home-footer-box"></div>
                <div className="home-footer-box"></div>
                <div className="home-footer-box"></div>
                <div className="home-footer-box"></div>
              </div>

              <p className="home-footer-more">More Gallery →</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
