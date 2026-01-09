import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(undefined);

/**
 * @type {React.FC<{children: React.ReactNode}>}
 */
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('artgallery_cart');
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('artgallery_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  
  const totalDiscount = items.reduce(
    (sum, item) =>
      sum + (item.product.price * item.product.discount / 100) * item.quantity,
    0
  );
  
  const total = subtotal - totalDiscount;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        totalDiscount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
