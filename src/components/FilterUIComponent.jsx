//
import { useState } from "react";

export default function FilterUIComponent () {
// PRICE
  const [price, setPrice] = useState(150);

  // CATEGORY
  const categories = ["Men Clothing", "Women Clothing", "Kids Clothing"];
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // RATING
  const ratings = [
    "4 Stars & above",
    "3 Stars & above",
    "2 Stars & above",
    "1 Stars & above",
  ];
  const [selectedRating, setSelectedRating] = useState("4 Stars & above");

  // SORT
  const [sortBy, setSortBy] = useState("low-to-high");

  // CLEAR
  const clearFilters = () => {
    setPrice(150);
    setSelectedCategories([]);
    setSelectedRating("4 Stars & above");
    setSortBy("low-to-high");
  };

  return (
    <div className="p-3 border rounded bg-white" style={{ width: "280px" }}>
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
        <span>200</span>
      </div>

      {/* <input
        type="range"
        className="form-range"
        min="50"
        max="200"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      /> */}

      <input
        type="range"
        className="form-range custom-range"
        min="50"
        max="200"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{
          height: "6px",
          background: `linear-gradient(to right, #0d6efd ${
            (price - 50) / 1.5
          }%, #ddd ${(price - 50) / 1.5}%)`,
          borderRadius: "5px",
        }}
      />

      {/* Show live price value */}
      <div className="text-center mb-3">
        <span className="badge bg-secondary">₹ {price}</span>
      </div>

      {/* CATEGORY SECTION */}
      <h6 className="fw-bold mt-3">Category</h6>

      {categories.map((category, idx) => (
        <div className="form-check" key={idx}>
          <input
            className="form-check-input"
            type="checkbox"
            checked={selectedCategories.includes(category)}
            onChange={() => handleCategoryChange(category)}
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
            checked={selectedRating === rating}
            onChange={() => setSelectedRating(rating)}
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
          checked={sortBy === "low-to-high"}
          onChange={() => setSortBy("low-to-high")}
        />
        <label className="form-check-label">Price - Low to High</label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="sort"
          value="high-to-low"
          checked={sortBy === "high-to-low"}
          onChange={() => setSortBy("high-to-low")}
        />
        <label className="form-check-label">Price - High to Low</label>
      </div>
    </div>
  );
}