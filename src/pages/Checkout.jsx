import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAddress } from "../context/AddressContext";
import { useOrder } from "../context/OrderContext";

export default function Checkout() {
  const navigate = useNavigate();

  const { cart, clearCart } = useCart();
  const { addresses, selectedAddressId, selectAddress } = useAddress();
  const { placeOrder } = useOrder();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const discount = 299;
  const deliveryCharge = cart.length > 0 ? 99 : 0;
  const totalAmount = totalPrice - discount + deliveryCharge;

  // 🔥 NEW: handle order confirm
  const handleConfirmOrder = () => {
    const selectedAddress = addresses.find(
      (addr) => addr.id === selectedAddressId
    );

    if (!selectedAddress) return;

    placeOrder({
      cart,
      address: selectedAddress,
      totalAmount,
    });

    clearCart(); // 🧹 empty cart
    navigate("/profile"); // ➜ go to profile (order history)
  };

  return (
    <div className="container my-4">
      <h4 className="fw-bold mb-4 text-center">CHECKOUT</h4>

      <div className="row g-4">
        {/* LEFT */}
        <div className="col-12 col-md-8">
          {/* ORDER SUMMARY */}
          <div className="card p-3 mb-3 shadow-sm border-0">
            <h6 className="fw-bold mb-3">Order Summary</h6>

            {cart.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between mb-2"
              >
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>

          {/* ADDRESS SELECTION */}
          <div className="card p-3 shadow-sm border-0">
            <h6 className="fw-bold mb-3">Select Delivery Address</h6>

            {addresses.length === 0 && (
              <p className="text-muted">
                No saved addresses. Please add one from Profile.
              </p>
            )}

            {addresses.map((addr) => (
              <div key={addr.id} className="border rounded p-3 mb-2">
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="address"
                    checked={selectedAddressId === addr.id}
                    onChange={() => selectAddress(addr.id)}
                  />
                  <label className="form-check-label fw-bold">
                    {addr.label}
                  </label>
                </div>

                <p className="mb-0 text-muted">{addr.address}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-12 col-md-4">
          <div className="card p-3 shadow-sm border-0">
            <h6 className="fw-bold mb-3">PRICE DETAILS</h6>

            <div className="d-flex justify-content-between mb-2">
              <span>Price</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Discount</span>
              <span className="text-success">-₹{discount}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Delivery</span>
              <span>₹{deliveryCharge}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold mb-3">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>

            <button
              className="btn btn-success w-100"
              disabled={!selectedAddressId}
              onClick={handleConfirmOrder}
            >
              CONFIRM ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}