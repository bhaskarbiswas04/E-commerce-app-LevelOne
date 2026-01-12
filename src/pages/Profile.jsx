import ProfileHeader from "../components/profile-comps/ProfileHeader";
import ProfileDetails from "../components/profile-comps/ProfileDetails";
import AddressSection from "../components/profile-comps/AddressSection";
import OrderHistory from "../components/profile-comps/OrderHistory";
import PageLoader from "../components/PageLoader";

import { useState, useEffect } from "react";

export default function Profile() {

  const [loading, setLoading ] = useState(true);

  useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 1000);
    
        return () => clearTimeout(timer);
      }, []);
    
       if (loading) {
         return <PageLoader />;
       }

  return (
    <div className="container my-4" style={{ maxWidth: "720px" }}>
      <ProfileHeader />              
      <div className="accordion" id="profileAccordion">
        <ProfileDetails />
        <AddressSection />
        <OrderHistory />
      </div>
    </div>
  );
}