import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { Product } from "./pages/Product";
import { About } from "./pages/About";
import { Checkout } from "./pages/Checkout";
import { Navbar } from "./components/Navbar";
import { NotFound } from "./pages/NotFound";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { Login } from "./pages/Login";
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
