import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Store } from "./pages/Store/Store";
import { Product } from "./pages/Product";
import { About } from "./pages/About";
import { Checkout } from "./pages/Checkout/Checkout";
import { Navbar } from "./components/Navigation/Navbar";
import { NotFound } from "./pages/NotFound";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { Login } from "./pages/Login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ShoppingCartProvider>
  );
}

export default App;
