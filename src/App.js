import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { FilterProvider } from "./context/FilterContext";

import Home from "./pages/Home"
import Header from "./components/Header"
import Footer from "./components/Footer";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";


function App() {
  return (
    <FilterProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:pCategory" element={<ProductListing />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
        </Routes>
        <Footer />
      </Router>
    </FilterProvider>
  );
}

export default App;
