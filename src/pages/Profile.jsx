import ProfileHeader from "../components/profile-comps/ProfileHeader";
import ProfileDetails from "../components/profile-comps/ProfileDetails";
import AddressSection from "../components/profile-comps/AddressSection";

export default function Profile() {
  return (
    <div className="container my-4" style={{ maxWidth: "720px" }}>
      <ProfileHeader />              
      <div className="accordion" id="profileAccordion">
        <ProfileDetails />
        <AddressSection />
      </div>
    </div>
  );
}