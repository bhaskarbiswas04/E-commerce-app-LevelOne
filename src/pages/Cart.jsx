import PageLoader from "../components/PageLoader";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQty } = useCart();
  const { toggleWishlist } = useWishlist();
  const [loading, setLoading] = useState(true);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const discount = 299;
  const deliveryCharge = cart.length > 0 ? 99 : 0;
  const totalAmount = totalPrice - discount + deliveryCharge;

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
      <h4 className="fw-bold mb-4 text-center">MY CART ({cart.length})</h4>

      <div className="row g-4">
        {/* LEFT: CART ITEMS */}
        <div className="col-12 col-md-8">
          {cart.length === 0 && (
            <p className="text-center text-muted">Your cart is empty 🛒</p>
          )}

          {cart.map((item) => (
            <div key={item.id} className="card mb-3 border-0 shadow-sm">
              <div className="row g-0 align-items-center">
                {/* IMAGE */}
                <div className="col-4 p-3 bg-light">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid"
                    style={{ objectFit: "contain" }}
                  />
                </div>

                {/* DETAILS */}
                <div className="col-8 p-3">
                  <h6>{item.name}</h6>

                  <div className="d-flex align-items-center gap-3 mb-1">
                    <span className="fw-bold">₹{item.price}</span>
                    <small className="text-muted text-decoration-line-through">
                      ₹{item.price + 1000}
                    </small>
                    <span className="text-success">50% off</span>
                  </div>

                  {/* QUANTITY */}
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => updateQty(item.id, item.size, -1)}
                  >
                    -
                  </button>

                  <span className="mx-2">{item.qty}</span>

                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => updateQty(item.id, item.size, 1)}
                  >
                    +
                  </button>

                  {/* ACTIONS */}
                  <div className="d-flex gap-2 mt-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => removeFromCart(item.id, item.size)}
                    >
                      Remove from Cart
                    </button>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => {
                        toggleWishlist(item); // 1️⃣ add to wishlist
                        removeFromCart(item.id, item.size); // 2️⃣ remove from cart
                      }}
                    >
                      Move to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: PRICE DETAILS */}
        {cart.length > 0 && (
          <div className="col-12 col-md-4">
            <div className="card p-3 shadow-sm border-0">
              <h6 className="fw-bold mb-3">PRICE DETAILS</h6>

              <div className="d-flex justify-content-between mb-2">
                <span>Price ({cart.length} item)</span>
                <span>₹{totalPrice}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Discount</span>
                <span className="text-success">-₹{discount}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Delivery Charges</span>
                <span>₹{deliveryCharge}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fw-bold mb-3">
                <span>TOTAL AMOUNT</span>
                <span>₹{totalAmount}</span>
              </div>

              <p className="text-success small">
                You will save ₹{discount} on this order
              </p>

              <button
                className="btn btn-primary w-100 mt-2"
                onClick={() => navigate("/checkout")}
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
