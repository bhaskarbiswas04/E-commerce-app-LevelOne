import { useOrder } from "../../context/OrderContext";

export default function OrderHistory() {
  const { orders } = useOrder();

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#orderHistory"
        >
          Order History
        </button>
      </h2>

      <div id="orderHistory" className="accordion-collapse collapse">
        <div className="accordion-body">
          {orders.length === 0 && (
            <p className="text-muted">No orders placed yet.</p>
          )}

          {orders.map((order) => (
            <div key={order.id} className="border rounded p-3 mb-3">
              <div className="d-flex justify-content-between">
                <strong>{order.id}</strong>
                <span className="badge bg-success">{order.status}</span>
              </div>

              <p className="mb-1 text-muted">Date: {order.date}</p>
              <p className="fw-bold">₹{order.totalAmount}</p>

              <small className="text-muted">
                Delivered to: {order.address.address}
              </small>

              <hr />

              <ul className="small">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} × {item.qty}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}