"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Favori öğesi tipi (sadece _id yeterli olabilir, ama göstermek için title ve imageUrl da ekleyelim)
interface FavoriteItem {
  _id: string;
  title: string;
  imageUrl: string;
  slug: string; // Detay sayfasına gitmek için slug da ekleyelim
}

// Favori Context tipi
interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (product: { _id: string; title: string; imageUrl: string; slug: string }) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  getFavoriteCount: () => number;
}

// Varsayılan değerlerle Context oluştur
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Provider bileşeni
interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Sayfa yüklendiğinde localStorage'dan favorileri yükle
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Favoriler değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product: { _id: string; title: string; imageUrl: string; slug: string }) => {
    setFavorites((prevFavorites) => {
      // Zaten favorilerde varsa ekleme
      if (prevFavorites.some((item) => item._id === product._id)) {
        return prevFavorites;
      }
      return [...prevFavorites, product];
    });
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((item) => item._id !== productId));
  };

  const isFavorite = (productId: string) => {
    return favorites.some((item) => item._id === productId);
  };

  const getFavoriteCount = () => {
    return favorites.length;
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        getFavoriteCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook ile FavoritesContext'i kullanma kolaylığı
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};