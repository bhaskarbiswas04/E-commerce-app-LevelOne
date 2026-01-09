import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import FilterUIComponent from "../components/FilterUIComponent";
import { useFilter } from "../context/FilterContext";

export default function ProductListing() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { filters, setFilters } = useFilter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://e-commerce-level-one-backend.vercel.app/products"
        );
        const json = await res.json();
        setProducts(json.data.products);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);
  // 🔹 Sync category filter from URL
  useEffect(() => {
    if (category) {
      setFilters((prev) => ({
        ...prev,
        categories: [category],
        isFiltered: true,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        categories: [],
        isFiltered: false,
      }));
    }
  }, [category, setFilters]);

  if (loading) return <p className="p-4">Loading products...</p>;

  let filteredProducts = [...products];

  // PRICE FILTER
  filteredProducts = filteredProducts.filter((p) => p.price <= filters.price);

  // CATEGORY FILTER
  if (filters.categories.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      filters.categories.includes(p.category)
    );
  }

  // RATING FILTER
  const minRating = Number(filters.rating[0]);
  filteredProducts = filteredProducts.filter((p) => p.rating >= minRating);

  // SORT
  if (filters.sortBy === "low-to-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // SEARCH (Header) FILTER
  if (filters.search.trim() !== "") {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(filters.search.toLowerCase())
    );
  }
    return (
      <div className="container-fluid mt-3">
        <div className="row gx-5 gx-xl-6">
          {/* ===== MOBILE FILTER BUTTON ===== */}
          <div className="d-lg-none mb-3">
            <button
              className="btn btn-outline-secondary w-100"
              data-bs-toggle="offcanvas"
              data-bs-target="#mobileFilter"
            >
              ☰ Filters
            </button>
          </div>

          {/* ===== DESKTOP FILTER ===== */}
          <div className="d-none d-lg-block col-lg-3 col-xl-2">
            <FilterUIComponent />
          </div>

          {/* ===== MOBILE FILTER OFFCANVAS ===== */}
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="mobileFilter"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">Filters</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
              />
            </div>

            <div className="offcanvas-body">
              <FilterUIComponent />
            </div>
          </div>

          {/* ===== PRODUCTS ===== */}
          <div className="col-12 col-lg-9 col-xl-10">
            <div className="mx-4 p-md-4" style={{ backgroundColor: "#eae1e1" }}>
              {/* HEADER */}
              <div className="mb-4">
                <h4 className="fw-bold">
                  {filters.isFiltered
                    ? "Showing Filtered Products"
                    : "Showing All Products"}
                  <span className="fs-6 text-muted">
                    &nbsp;( Showing {filteredProducts.length} products )
                  </span>
                </h4>
              </div>

              {/* GRID */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-5">
                  <h5 className="fw-semibold text-muted">
                    No products found 😕
                  </h5>
                  <p className="text-muted mb-0">
                    Try adjusting filters or search keywords
                  </p>
                </div>
              ) : (
                <div className="row g-3 g-md-4">
                  {filteredProducts.map((item) => (
                    <div
                      key={item.id}
                      className="col-6 col-md-4 col-lg-3 col-xl-3"
                      onClick={() =>
                        navigate(`/products/${item.category}/${item.id}`)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <ProductCard product={item} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}