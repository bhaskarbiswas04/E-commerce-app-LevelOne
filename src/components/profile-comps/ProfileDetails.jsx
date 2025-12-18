import { useState } from "react";
import { toast } from "react-toastify";

export default function ProfileDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("userProfile");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Abhinav Dutta",
          email: "abhinav@gmail.com",
          phone: "9876545476",
        };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setIsEditing(false);
    toast.success("Profile updated");
  };

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button"
          data-bs-toggle="collapse"
          data-bs-target="#profileDetails"
        >
          Profile Details
        </button>
      </h2>

      <div id="profileDetails" className="accordion-collapse collapse show">
        <div className="accordion-body">
          {!isEditing ? (
            <>
              <p>
                <strong>Name:</strong> {profile.name}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Phone:</strong> {profile.phone}
              </p>

              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              {["name", "email", "phone"].map((field) => (
                <div className="mb-2" key={field}>
                  <label className="form-label text-capitalize">{field}</label>
                  <input
                    className="form-control"
                    name={field}
                    value={profile[field]}
                    onChange={handleChange}
                  />
                </div>
              ))}

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
          )}
        </div>
      </div>
    </div>
  );
}
