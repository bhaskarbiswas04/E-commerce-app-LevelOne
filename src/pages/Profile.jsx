import { useState } from "react";
import { useAddress } from "../context/AddressContext";
import AddressForm from "../components/AddressForm";

export default function Profile() {
  const user = {
    name: "Abhinav Dutta",
    email: "abhinav@gmail.com",
    phone: "9876545476",
  };

  const {
    addresses,
    selectedAddressId,
    addAddress,
    updateAddress,
    deleteAddress,
    selectAddress,
  } = useAddress();

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="container my-4" style={{ maxWidth: "720px" }}>
      {/* PROFILE CARD */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body d-flex align-items-center gap-3">
          {/* AVATAR */}
          <div
            className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold"
            style={{ width: 60, height: 60, fontSize: 20 }}
          >
            {getInitials(user.name)}
          </div>

          {/* USER INFO */}
          <div>
            <h6 className="fw-bold mb-1">{user.name}</h6>
            <p className="mb-0 text-muted">{user.email}</p>
            <p className="mb-0 text-muted">{user.phone}</p>
          </div>
        </div>
      </div>

      {/* ACCORDION */}
      <div className="accordion" id="profileAccordion">
        {/* PROFILE DETAILS */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#profileDetails"
            >
              Profile Details
            </button>
          </h2>

          <div id="profileDetails" className="accordion-collapse collapse show">
            <div className="accordion-body">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>

              <button className="btn btn-outline-secondary btn-sm">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* ADDRESS SECTION */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#addressSection"
            >
              Saved Addresses
            </button>
          </h2>

          <div id="addressSection" className="accordion-collapse collapse">
            <div className="accordion-body">
              {addresses.length === 0 && (
                <p className="text-muted">No addresses added yet.</p>
              )}

              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className={`border rounded p-3 mb-2 ${
                    selectedAddressId === addr.id ? "border-primary" : ""
                  }`}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 className="mb-1">{addr.label}</h6>
                      <p className="mb-2 text-muted">{addr.address}</p>
                    </div>

                    <input
                      type="radio"
                      name="deliveryAddress"
                      checked={selectedAddressId === addr.id}
                      onChange={() => selectAddress(addr.id)}
                    />
                  </div>

                  <button
                    className="btn btn-outline-secondary btn-sm me-2"
                    onClick={() => {
                      setEditingAddress(addr);
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
              ))}

              {/* ADD / EDIT FORM */}
              {showForm && (
                <AddressForm
                  initialData={editingAddress}
                  onSave={(data) => {
                    editingAddress ? updateAddress(data) : addAddress(data);
                    setShowForm(false);
                    setEditingAddress(null);
                  }}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingAddress(null);
                  }}
                />
              )}

              <button
                className="btn btn-primary btn-sm mt-2"
                onClick={() => {
                  setEditingAddress(null);
                  setShowForm(true);
                }}
              >
                + Add New Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}