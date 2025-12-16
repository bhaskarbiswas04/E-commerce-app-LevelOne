import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { wishlist } = useWishlist();
  const { cart } = useCart();

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
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>

        {/* MENU OPTIONS */}
        <div className="d-flex gap-3 align-items-center">
          <button
            type="button"
            className="btn btn-secondary px-4 my-2 rounded-0"
          >
            Login
          </button>

          <ul className="navbar-nav flex-row gap-3 align-items-center mb-0">
            {/* WISHLIST */}
            <li className="nav-item">
              <Link to="/wishlist" className="nav-link p-0">
                <button
                  type="button"
                  className="btn btn-light position-relative"
                >
                  ♡
                  
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {wishlist.length < 1 ? "0" : wishlist.length}
                    </span>
               
                </button>
              </Link>
            </li>

            {/* CART */}
            <li className="nav-item">
              <Link to="/cart" className="nav-link p-0">
                <button
                  type="button"
                  className="btn btn-light position-relative"
                >
                  <span className="fs-4">🛒</span>
                  
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount < 1 ? "0" : cartCount}
                    </span>
                
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
