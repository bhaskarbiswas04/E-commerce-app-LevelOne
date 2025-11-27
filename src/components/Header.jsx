

export default function Header () {
    return (
      <nav className="navbar navbar-expand-lg bg-body-secondary">
        <div className="container container-fluid">
          {/* BRAND LOGO*/}
          <a className="navbar-brand" href="/">
            MyShoppingSite
          </a>

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
          <div className="d-flex gap-3">
            <button
              type="button"
              className="btn btn-secondary px-4 my-2 rounded-0"
            >
              Login
            </button>

            <ul className="navbar-nav gap-3">
              <li className="nav-item">
                {/* <a className="nav-link" href="#">
                  <span className="fs-3">♡</span>
                </a> */}
                <button type="button" class="btn btn-light position-relative">
                  ♡
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    0<span class="visually-hidden">unread messages</span>
                  </span>
                </button>
              </li>
              <li className="nav-item ">
                {/* <a className="nav-link" href="#">
                  <span className="fs-4">🛒</span> Cart
                </a> */}

                <button type="button" class="btn btn-light position-relative">
                  <span className="fs-4">🛒</span> Cart
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    0<span class="visually-hidden">unread messages</span>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}