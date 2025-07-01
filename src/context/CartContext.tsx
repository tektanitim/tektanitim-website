"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Sepet öğesi tipi
interface CartItem {
  _id: string;
  title: string;
  price: number;
  imageUrl: string; // Ürün görseli için
  quantity: number;
}

// Sepet Context tipi
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: { _id: string; title: string; price: number; imageUrl: string }) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  getCartItemCount: () => number;
  getCartTotal: () => number;
}

// Varsayılan değerlerle Context oluştur
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider bileşeni
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Sayfa yüklendiğinde localStorage'dan sepeti yükle
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Sepet değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: { _id: string; title: string; price: number; imageUrl: string }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        // Ürün sepette varsa miktarını artır
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Ürün sepette yoksa yeni olarak ekle
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter(item => item._id !== productId);
      }
      return prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: quantity } : item
      );
    });
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        getCartItemCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook ile CartContext'i kullanma kolaylığı
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};