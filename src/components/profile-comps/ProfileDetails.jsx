import { useState } from "react";
import { useUser } from "../../context/UserContext";

export default function ProfileDetails() {
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  return (
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
          {isEditing ? (
            <>
              <input
                className="form-control mb-2"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                className="form-control mb-2"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                className="form-control mb-3"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <button
                className="btn btn-primary btn-sm me-2"
                onClick={saveProfile}
              >
                Save
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>

              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}