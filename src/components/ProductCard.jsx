import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function ProductCard({ product }) {
  const [liked, setLiked] = useState(false);

  return (
    <div
      className="card shadow-sm border-0 p-3"
      style={{ borderRadius: "8px", maxHeight: "380px" }}
    >
      {/* IMAGE + WISHLIST ICON */}
      <div className="position-relative">
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
          style={{
            height: "220px",
            objectFit: "fill",
          }}
        />

        <span
          className="position-absolute top-0 end-0 m-2 p-2 bg-white rounded-circle shadow"
          style={{ cursor: "pointer" }}
          onClick={() => setLiked(!liked)}
        >
          {liked ? <FaHeart color="red" size={16} /> : <FaRegHeart size={16} />}
        </span>
      </div>

      {/* DETAILS */}
      <div className="card-body text-center p-2">
        <h6 className="fw-semibold mb-1" style={{ fontSize: "14px" }}>
          {product.name}
        </h6>

        <p className="fw-bold mb-2" style={{ fontSize: "15px" }}>
          ₹{product.price}
        </p>

        <p className="mb-2" style={{ fontSize: "15px" }}>
          Rating: {product.rating}
        </p>

        <button
          className="btn btn-secondary w-100 py-1"
          style={{ fontSize: "14px" }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
