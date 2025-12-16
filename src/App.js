import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FilterProvider } from "./context/FilterContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";

import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/WishList";
import Cart from "./pages/Cart";

function App() {
  return (
    <FilterProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:pCategory" element={<ProductListing />} />
              <Route
                path="/products/:category/:id"
                element={<ProductDetails />}
              />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
            <Footer />
          </Router>
        </CartProvider>
      </WishlistProvider>
    </FilterProvider>
  );
}

export default App;
