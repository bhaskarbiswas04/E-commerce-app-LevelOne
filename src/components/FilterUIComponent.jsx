import { useFilter } from "../context/FilterContext";

export default function FilterUIComponent() {
  const { filters, setFilters } = useFilter();

  // CATEGORY LIST
  const categories = ["Men", "Women", "Kids", "Electronics"];

  // RATING LIST
  const ratings = [
    "4 Stars & above",
    "3 Stars & above",
    "2 Stars & above",
    "1 Stars & above",
  ];

  // PRICE UPDATE
  const updatePrice = (value) => {
    setFilters({ ...filters, price: Number(value), isFiltered: true });
  };

  // CATEGORY UPDATE
  const updateCategory = (category) => {
    let updated;

    if (filters.categories.includes(category)) {
      updated = filters.categories.filter((c) => c !== category);
    } else {
      updated = [...filters.categories, category];
    }

    setFilters({ ...filters, categories: updated, isFiltered: true });
  };

  // RATING UPDATE
  const updateRating = (rating) => {
    setFilters({ ...filters, rating, isFiltered: true }); 
  };

  // SORT UPDATE
  const updateSort = (value) => {
    setFilters({ ...filters, sortBy: value, isFiltered: true });
  };

  // CLEAR FILTERS
  const clearFilters = () => {
    setFilters({
      price: 5000,
      categories: [],
      rating: "1 Stars & above",
      sortBy: "low-to-high",
      search: "",
      isFiltered: false
    });
  };

  return (
    <div className="p-3 border rounded bg-white" style={{ minWidth: "280px", height: "100%" }}>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0 fw-bold">Filters</h5>
        <button className="btn btn-link p-0" onClick={clearFilters}>
          Clear
        </button>
      </div>

      {/* PRICE SECTION */}
      <h6 className="fw-bold">Price</h6>

      <div className="d-flex justify-content-between text-muted small mb-1">
        <span>50</span>
        <span>5000</span>
      </div>

      <input
        type="range"
        className="form-range custom-range"
        min="50"
        max="5000"
        value={filters.price}
        onChange={(e) => updatePrice(e.target.value)}
        style={{
          height: "6px",
          background: `linear-gradient(to right, #0d6efd ${
            (filters.price / 5000) * 100
          }%, #ddd ${(filters.price / 5000) * 100}%)`,
          borderRadius: "5px",
        }}
      />

      <div className="text-center mb-3">
        <span className="badge bg-secondary">₹ {filters.price}</span>
      </div>

      {/* CATEGORY SECTION */}
      <h6 className="fw-bold mt-3">Category</h6>

      {categories.map((category, idx) => (
        <div className="form-check" key={idx}>
          <input
            className="form-check-input"
            type="checkbox"
            checked={filters.categories.includes(category)}
            onChange={() => updateCategory(category)}
          />
          <label className="form-check-label">{category}</label>
        </div>
      ))}

      {/* RATING SECTION */}
      <h6 className="fw-bold mt-3">Rating</h6>

      {ratings.map((rating, idx) => (
        <div className="form-check" key={idx}>
          <input
            className="form-check-input"
            type="radio"
            name="rating"
            checked={filters.rating === rating}
            onChange={() => updateRating(rating)}
          />
          <label className="form-check-label">{rating}</label>
        </div>
      ))}

      {/* SORT SECTION */}
      <h6 className="fw-bold mt-3">Sort by</h6>

      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="sort"
          value="low-to-high"
          checked={filters.sortBy === "low-to-high"}
          onChange={() => updateSort("low-to-high")}
        />
        <label className="form-check-label">Price - Low to High</label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="sort"
          value="high-to-low"
          checked={filters.sortBy === "high-to-low"}
          onChange={() => updateSort("high-to-low")}
        />
        <label className="form-check-label">Price - High to Low</label>
      </div>
    </div>
  );
}
