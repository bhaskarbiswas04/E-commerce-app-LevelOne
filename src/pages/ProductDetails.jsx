import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

import products from "../datas/products";
import ProductCard from "../components/ProductCard";

export default function ProductDetails() {
  const { category, id } = useParams();
const { addToCart } = useCart();
  const navigate = useNavigate();

  // find product
  const product = products.find(
    (p) =>
      String(p.id) === String(id) &&
      p.category.toLowerCase() === category.toLowerCase()
  );

  // HOOKS (must run always)
  const [liked, setLiked] = useState(false);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  // category logic
  const isClothing = ["men", "women", "kids"].includes(category.toLowerCase());
  const sizes = ["S", "M", "L", "XL", "XXL"];

  // product not found
  if (!product) {
    return (
      <div className="container my-5 text-center">
        <h4>Product not found</h4>
        <p className="text-muted">ID or Category mismatch.</p>
      </div>
    );
  }

  // quantity
  const increment = () => setQty(qty + 1);
  const decrement = () => qty > 1 && setQty(qty - 1);

  // buttons
  const handleBuyNow = () =>
    alert(`Buy Now: ${product.name} (x${qty}) ${selectedSize || ""}`);

  const handleAddToCart = () => {
    addToCart(product, qty, selectedSize);
    alert("Added to cart 🛒");
  };

  // related products
  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="container my-4">
      {/* ================= */}
      {/* MAIN PRODUCT AREA */}
      {/* ================= */}
      <div className="row g-4">
        {/* LEFT — IMAGE & BUTTONS */}
        <div className="col-md-4">
          <div className="position-relative">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded"
              style={{ background: "#f7f7f7", padding: "16px" }}
            />
            <span
              className="position-absolute top-0 end-0 m-3 p-2 bg-white rounded-circle shadow"
              style={{ cursor: "pointer" }}
              onClick={() => setLiked(!liked)}
            >
              {liked ? <FaHeart color="red" /> : <FaRegHeart />}
            </span>
          </div>

          <div className="d-grid mt-3">
            <button className="btn btn-primary mb-2" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button className="btn btn-secondary" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>

        {/* RIGHT — DETAILS */}
        <div className="col-md-8">
          <h4>{product.name}</h4>

          {/* Rating */}
          <div className="d-flex align-items-center my-2">
            <span className="fw-bold me-2">{product.rating}</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                size={16}
                color={i < Math.round(product.rating) ? "#ffc107" : "#ddd"}
              />
            ))}
          </div>

          {/* Price */}
          <div className="d-flex align-items-center gap-3 mb-3">
            <h4 className="fw-bold m-0">₹{product.price}</h4>
            <small className="text-muted text-decoration-line-through">
              ₹{Math.round(product.price * 1.25)}
            </small>
            <span className="badge bg-success">50% off</span>
          </div>

          {/* Quantity + Size */}
          <div className="d-flex flex-wrap align-items-center gap-4 mb-3">
            {/* Quantity */}
            <div>
              <small>Quantity:</small>
              <div className="btn-group ms-2">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={decrement}
                >
                  -
                </button>
                <button className="btn btn-light btn-sm" disabled>
                  {qty}
                </button>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={increment}
                >
                  +
                </button>
              </div>
            </div>

            {/* Size only for clothing */}
            {isClothing && (
              <div>
                <small>Size:</small>
                <div className="d-flex flex-wrap gap-2 mt-1">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      className={`btn btn-sm ${
                        selectedSize === s
                          ? "btn-primary"
                          : "btn-outline-secondary"
                      }`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <hr />

          {/* Icons Row */}
          <div className="row text-center mb-3">
            {[
              ["10 days", "Returnable"],
              ["Pay on", "Delivery"],
              ["Free", "Delivery"],
              ["Secure", "Payment"],
            ].map(([line1, line2], idx) => (
              <div className="col-3" key={idx}>
                <div
                  className="rounded-circle bg-light mb-1"
                  style={{ width: 56, height: 56 }}
                ></div>
                <small className="text-muted">
                  {line1} <br /> {line2}
                </small>
              </div>
            ))}
          </div>

          <hr />

          {/* Description */}
          <h6>Description:</h6>
          <p>
            • STYLE REDEFINED: Elevate your wardrobe with premium stitching and
            lightweight design.
            <br />
            <br />
            • ALL-WEATHER FABRIC: Wind resistant and comfortable for daily wear.
            <br />
            <br />• PREMIUM FEEL: Designed for comfort with a modern fit.
          </p>
        </div>
      </div>

      {/* RELATED PRODUCTS     */}
      <div className="mt-5">
        <h5>More items you may like in {product.category}</h5>

        <div className="row g-3 mt-2">
          {related.length === 0 && (
            <p className="text-muted">No related products found.</p>
          )}

          {related.map((item) => (
            <div
              key={item.id}
              className="col-6 col-md-3"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/products/${item.category}/${item.id}`)}
            >
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
