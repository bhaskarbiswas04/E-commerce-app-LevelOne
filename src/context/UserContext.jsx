import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("userProfile");
    return stored
      ? JSON.parse(stored)
      : {
          name: "Abhinav Dutta",
          email: "abhinav@gmail.com",
          phone: "9876545476",
        };
  });

  // persist user profile
  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(user));
  }, [user]);

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    toast.success("Profile updated");
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
