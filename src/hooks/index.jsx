import { CartProvider } from './CartContext';
import { UserProvider } from './UserContext';

export { useCart } from './CartContext';

const AppProvider = ({ children }) => {
  return (
    <UserProvider>
      <CartProvider>{children}</CartProvider>
    </UserProvider>
  );
};

export default AppProvider;
