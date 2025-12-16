import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

export default function Header() {
  const { wishlist } = useWishlist(); // ✅ get wishlist

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

          <ul className="navbar-nav flex-row gap-3 align-items-center">
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

            {/* CART (placeholder for now) */}
            <li className="nav-item">
              <button type="button" className="btn btn-light position-relative">
                <span className="fs-4">🛒</span>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  0
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
