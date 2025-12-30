import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  // load addresses from localStorage
  const [addresses, setAddresses] = useState(() => {
    const stored = localStorage.getItem("addresses");
    return stored ? JSON.parse(stored) : [];
  });

  // load selected address
  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    const stored = localStorage.getItem("selectedAddressId");
    return stored ? JSON.parse(stored) : null;
  });

  // persist addresses
  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  // persist selected address
  useEffect(() => {
    localStorage.setItem(
      "selectedAddressId",
      JSON.stringify(selectedAddressId)
    );
  }, [selectedAddressId]);

  const addAddress = (address) => {
    setAddresses((prev) => [...prev, address]);
    toast.success("Address added");
  };

  const updateAddress = (updatedAddress) => {
    setAddresses((prev) =>
      prev.map((addr) =>
        addr.id === updatedAddress.id ? updatedAddress : addr
      )
    );
    toast.success("Address updated");
  };

  const deleteAddress = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));

    if (selectedAddressId === id) {
      setSelectedAddressId(null);
    }

    toast.info("Address removed");
  };

  const selectAddress = (id) => {
    setSelectedAddressId(id);
    toast.success("Delivery address selected");
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        selectedAddressId,
        addAddress,
        updateAddress,
        deleteAddress,
        selectAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
