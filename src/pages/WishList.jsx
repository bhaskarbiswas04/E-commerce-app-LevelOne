import PageLoader from "../components/PageLoader";

import { useEffect, useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { FaHeart } from "react-icons/fa";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

   if (loading) {
     return <PageLoader />;
   }

  return (
    
    <div className="container my-4">
      <h4 className="fw-bold mb-4 text-center">My Wishlist</h4>

      {wishlist.length === 0 && (
        <p className="text-center text-muted">
          Your wishlist is empty. Add your favourite items ❤️
        </p>
      )}

      <div className="row g-4">
        {wishlist.map((item) => (
          <div key={item.id} className="col-6 col-md-3">
            <div
              className="card shadow-sm border-0 h-100 d-flex flex-column"
              style={{ borderRadius: "8px" }}
            >
              {/* IMAGE CONTAINER */}
              <div
                className="position-relative"
                style={{
                  height: "220px",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-100 h-100"
                  style={{
                    objectFit: "contain",
                    padding: "12px",
                  }}
                />

                {/* REMOVE HEART */}
                <span
                  className="position-absolute top-0 end-0 m-2 p-2 bg-white rounded-circle shadow"
                  style={{ cursor: "pointer", zIndex: 5 }}
                  onClick={() => toggleWishlist(item)}
                >
                  <FaHeart color="red" size={16} />
                </span>
              </div>

              {/* CARD BODY */}
              <div className="card-body text-center d-flex flex-column p-3">
                <h6
                  className="mb-1 text-truncate"
                  title={item.name}
                  style={{ fontSize: "14px" }}
                >
                  {item.name}
                </h6>

                <p className="fw-bold mb-3" style={{ fontSize: "15px" }}>
                  ₹{item.price}
                </p>

                {/* BUTTON AT BOTTOM */}
                <div className="mt-auto">
                  <button
                    className="btn btn-secondary w-100 py-1"
                    onClick={() => {
                      addToCart(item); // 1️⃣ add to cart
                      toggleWishlist(item); // 2️⃣ remove from wishlist
                    }}
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
}
