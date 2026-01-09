import { Link, useLocation } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useFilter } from "../context/FilterContext";
import { FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";

export default function Header() {
  
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const { filters, setFilters } = useFilter();

  const location = useLocation();
  const showSearch = location.pathname === "/products" ;  // showing search bar only in ProductListing Page.

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="navbar navbar-expand-lg bg-body-secondary">
      <div className="container-fluid">
        {/* BRAND */}
        <Link className="navbar-brand" to="/">
          MyShoppingSite
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* COLLAPSIBLE AREA */}
        <div className="collapse navbar-collapse mt-3 mt-lg-0" id="mainNavbar">
          <div className="d-flex align-items-center w-100 gap-2">
            {/* SEARCH (CENTERED ON DESKTOP) */}
            {showSearch && (
              <div
                className="mx-lg-auto"
                style={{
                  flexGrow: 1,
                  maxWidth: "500px",
                }}
              >
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      search: e.target.value,
                      isFiltered: e.target.value.length > 0,
                    }))
                  }
                />
              </div>
            )}

            {/* ICONS (RIGHT SIDE) */}
            <div className="d-flex gap-2 ms-lg-auto">
              {/* PROFILE */}
              <Link to="/profile">
                <button
                  className="btn btn-light d-flex align-items-center justify-content-center mx-1"
                  style={{ width: 42, height: 42 }}
                >
                  <FaUser size={16} />
                </button>
              </Link>

              {/* WISHLIST */}
              <Link to="/wishlist">
                <button
                  className="btn btn-light position-relative d-flex align-items-center justify-content-center mx-1"
                  style={{ width: 42, height: 42 }}
                >
                  <FaHeart size={16} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {wishlist.length}
                  </span>
                </button>
              </Link>

              {/* CART */}
              <Link to="/cart">
                <button
                  className="btn btn-light position-relative d-flex align-items-center justify-content-center mx-1"
                  style={{ width: 42, height: 42 }}
                >
                  <FaShoppingCart size={16} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}