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

  // 🔹 Fetch products from backend
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

  return (
    <div className="d-flex w-100 mt-3 gap-3">
      {/* FILTER UI */}
      <FilterUIComponent />

      {/* PRODUCTS */}
      <div className="flex-grow-1 p-4" style={{ backgroundColor: "#eae1e1" }}>
        <div className="mb-4">
          <h4 className="fw-bold">
            {filters.isFiltered
              ? "Showing Filtered Products"
              : "Showing All Products"}
            <span className="fs-6 text-muted">
              &nbsp; ( Showing {filteredProducts.length} products )
            </span>
          </h4>
        </div>

        <div className="row g-4">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="col-6 col-md-4 col-lg-3"
              onClick={() => navigate(`/products/${item.category}/${item.id}`)}
              style={{ cursor: "pointer" }}
            >
              <ProductCard product={item} />
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <h5 className="text-center text-muted mt-5">
              No products match your filters.
            </h5>
          )}
        </div>
      </div>
    </div>
  );
}