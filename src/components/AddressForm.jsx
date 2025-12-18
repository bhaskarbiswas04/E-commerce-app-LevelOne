import { useState, useEffect } from "react";

export default function AddressForm({ onSave, onCancel, initialData }) {
  const [label, setLabel] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (initialData) {
      setLabel(initialData.label);
      setAddress(initialData.address);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!label || !address) return;

    onSave({
      id: initialData?.id || Date.now(),
      label,
      address,
    });

    setLabel("");
    setAddress("");
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded p-3 mb-3">
      <div className="mb-2">
        <input
          className="form-control"
          placeholder="Label (Home / Office)"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <textarea
          className="form-control"
          placeholder="Full address"
          rows="3"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <button className="btn btn-primary btn-sm me-2" type="submit">
        Save
      </button>
      <button
        className="btn btn-outline-secondary btn-sm"
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
}
