import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";

import { FilterProvider } from "./context/FilterContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import { AddressProvider } from "./context/AddressContext";

import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/WishList";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <FilterProvider>
        <WishlistProvider>
          <AddressProvider>

          <CartProvider>
            <Router>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductListing />} />
                <Route
                  path="/products/:category"
                  element={<ProductListing />}
                />
                <Route
                  path="/products/:category/:id"
                  element={<ProductDetails />}
                />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
              <Footer />
            </Router>
          </CartProvider>
          </AddressProvider>
        </WishlistProvider>
      </FilterProvider>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
