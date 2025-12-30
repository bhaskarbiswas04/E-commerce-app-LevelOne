import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const stored = localStorage.getItem("orders");
    return stored ? JSON.parse(stored) : [];
  });

  // persist orders
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const placeOrder = ({ cart, address, totalAmount }) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      items: cart,
      address,
      totalAmount,
      date: new Date().toLocaleDateString(),
      status: "Placed",
    };

    setOrders((prev) => [newOrder, ...prev]);
    toast.success("Order placed successfully 🎉");
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
