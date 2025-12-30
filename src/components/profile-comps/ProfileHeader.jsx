import { useUser } from "../../context/UserContext";

export default function ProfileHeader() {
  const { user } = useUser();

  const getInitials = (name) =>  // to get the first 2 letters of name&surname
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body d-flex align-items-center gap-3">
        {/* Avatar */}
        <div
          className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold"
          style={{ width: 60, height: 60, fontSize: 20 }}
        >
          {getInitials(user.name)}
        </div>

        {/* Info */}
        <div>
          <h6 className="fw-bold mb-1">{user.name}</h6>
          <p className="mb-0 text-muted">{user.email}</p>
          <p className="mb-0 text-muted">{user.phone}</p>
        </div>
      </div>
    </div>
  );
}
