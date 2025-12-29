import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useFilter } from "../context/FilterContext";
import { FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";

export default function Header() {
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const { filters, setFilters} = useFilter();

  // total cart quantity (important)
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="navbar navbar-expand-lg bg-body-secondary">
      <div className="container-fluid">
        {/* BRAND LOGO */}
        <Link className="navbar-brand" to="/">
          MyShoppingSite
        </Link>

        {/* SEARCH BAR */}
        <div className="d-none d-lg-flex flex-grow-1 justify-content-center">
          <form role="search" className="w-50">
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
          </form>
        </div>

        {/* MENU OPTIONS */}
        <ul className="navbar-nav flex-row gap-3 align-items-center mb-0">
          {/* USER PROFILE */}
          <li className="nav-item">
            <Link to="/profile" className="nav-link p-0">
              <button
                type="button"
                className="btn btn-light d-flex align-items-center justify-content-center"
                style={{ width: "44px", height: "44px" }}
              >
                <FaUser size={18} color="grey" />
              </button>
            </Link>
          </li>

          {/* WISHLIST */}
          <li className="nav-item">
            <Link to="/wishlist" className="nav-link p-0">
              <button
                type="button"
                className="btn btn-light position-relative d-flex align-items-center justify-content-center"
                style={{ width: "44px", height: "44px" }}
              >
                <FaHeart size={18} color="grey" />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wishlist.length}
                </span>
              </button>
            </Link>
          </li>

          {/* CART */}
          <li className="nav-item">
            <Link to="/cart" className="nav-link p-0">
              <button
                type="button"
                className="btn btn-light position-relative d-flex align-items-center justify-content-center"
                style={{ width: "44px", height: "44px" }}
              >
                <FaShoppingCart size={18} color="grey" />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
