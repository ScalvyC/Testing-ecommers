import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { Product } from "./pages/Product";
import { About } from "./pages/About";
import { Checkout } from "./pages/Checkout";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { Login } from "./pages/Login";

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </ShoppingCartProvider>
  );
}

export default App;
