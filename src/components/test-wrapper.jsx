import { AddressProvider } from "../context/AddressContext";
import { CartProvider } from "../context/CartContext";
import { FilterProvider } from "../context/FilterContext";
import { OrderProvider } from "../context/OrderContext";
import { UserProvider } from "../context/UserContext";
import { WishlistProvider } from "../context/WishlistContext";


const ProviderWrapper = ({ children }) => {
  return (
    <OrderProvider>
      <UserProvider>
        <FilterProvider>
          <WishlistProvider>
            <AddressProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </AddressProvider>
          </WishlistProvider>
        </FilterProvider>
      </UserProvider>
    </OrderProvider>
  );
};

export default ProviderWrapper;
