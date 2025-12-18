import { useState } from "react";
import { useAddress } from "../../context/AddressContext";
import AddressForm from "../AddressForm";

export default function AddressSection() {
  const {
    addresses,
    selectedAddressId,
    addAddress,
    updateAddress,
    deleteAddress,
    selectAddress,
  } = useAddress();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#addressSection"
        >
          Saved Addresses
        </button>
      </h2>

      <div id="addressSection" className="accordion-collapse collapse">
        <div className="accordion-body">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`border rounded p-3 mb-2 ${
                selectedAddressId === addr.id ? "border-primary" : ""
              }`}
            >
              <div className="d-flex justify-content-between">
                <div>
                  <h6>{addr.label}</h6>
                  <p className="text-muted">{addr.address}</p>
                  <p className="mb-1 text-muted">{addr.address}</p>
                  <p className="mb-0 text-muted">
                    📞 {addr.phone} | 📍 {addr.pincode}
                  </p>
                </div>

                <input  
                  type="radio"
                  checked={selectedAddressId === addr.id}
                  onChange={() => selectAddress(addr.id)}
                />
              </div>

              <div className="my-3">
              <button
                className="btn btn-outline-secondary btn-sm me-2"
                onClick={() => {
                  setEditing(addr);
                  setShowForm(true);
                }}
              >
                Edit
              </button>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => deleteAddress(addr.id)}
              >
                Remove
              </button>
              </div>
            </div>
          ))}

          {showForm && (
            <AddressForm
              initialData={editing}
              onSave={(data) => {
                editing ? updateAddress(data) : addAddress(data);
                setShowForm(false);
                setEditing(null);
              }}
              onCancel={() => {
                setShowForm(false);
                setEditing(null);
              }}
            />
          )}

          <button
            className="btn btn-primary btn-sm mt-2"
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
          >
            + Add New Address
          </button>
        </div>
      </div>
    </div>
  );
}