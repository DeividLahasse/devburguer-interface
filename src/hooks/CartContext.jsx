import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const putProductIncart = (product) => {
    const cartIndex = cartProducts.findIndex((prd) => prd.id === product.id);

    if (cartIndex >= 0) {
      const newProductsIncart = cartProducts.map((prd) =>
        prd.id === product.id ? { ...prd, quantity: prd.quantity + 1 } : prd,
      );
      setCartProducts(newProductsIncart);
      updateLocalStore(newProductsIncart);
    } else {
      const newProductsIncart = [...cartProducts, { ...product, quantity: 1 }];
      setCartProducts(newProductsIncart);
      updateLocalStore(newProductsIncart);
    }
  };

  const clearCart = () => {
    setCartProducts([]);
    updateLocalStore([]);
  };

  const deleteProduct = (productId) => {
    const newCart = cartProducts.filter((prd) => prd.id !== productId);
    setCartProducts(newCart);
    updateLocalStore(newCart);
  };

  const increaseProduct = (productId) => {
    const newCart = cartProducts.map((prd) =>
      prd.id === productId ? { ...prd, quantity: prd.quantity + 1 } : prd,
    );
    setCartProducts(newCart);
    updateLocalStore(newCart);
  };

  const decreaseProduct = (productId) => {
    const cartIndex = cartProducts.findIndex((prd) => prd.id === productId);

    if (cartProducts[cartIndex].quantity > 1) {
      const newCart = cartProducts.map((prd) =>
        prd.id === productId ? { ...prd, quantity: prd.quantity - 1 } : prd,
      );
      setCartProducts(newCart);
      updateLocalStore(newCart);
    } else {
      deleteProduct(productId);
    }
  };

  const updateLocalStore = (products) => {
    localStorage.setItem('devburger:cartInfo', JSON.stringify(products));
  };

  useEffect(() => {
    const clientCartData = localStorage.getItem('devburger:cartInfo');

    if (clientCartData) {
      setCartProducts(JSON.parse(clientCartData));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        putProductIncart,
        clearCart,
        increaseProduct,
        decreaseProduct,
        deleteProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used with a context ');
  }

  return context;
};





