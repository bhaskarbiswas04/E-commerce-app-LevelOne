const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

export default function ProfileHeader() {
  const profile = JSON.parse(localStorage.getItem("userProfile")) || {
    name: "Abhinav Dutta",
    email: "abhinav@gmail.com",
    phone: "9876545476",
  };

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body d-flex align-items-center gap-3">
        <div
          className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold"
          style={{ width: 60, height: 60, fontSize: 20 }}
        >
          {getInitials(profile.name)}
        </div>

        <div>
          <h6 className="fw-bold mb-1">{profile.name}</h6>
          <p className="mb-0 text-muted">{profile.email}</p>
          <p className="mb-0 text-muted">{profile.phone}</p>
        </div>
      </div>
    </div>
  );
}
