"use client";

import React from 'react';
import { useFavorites } from "@/context/FavoritesContext";
import Image from "next/image";
import Link from "next/link";
import { FiTrash2 } from 'react-icons/fi';

export default function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Favori Listeniz Boş</h1>
        <p className="text-lg text-gray-600 mb-6">Beğendiğiniz ürünleri favorilerinize ekleyebilirsiniz.</p>
        <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200">
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Favorilerim ({favorites.length} Ürün)</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <Link href={`/product/${item.slug}`} className="block relative h-48 w-full">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </Link>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <h2 className="text-lg font-semibold text-gray-900 mb-2 truncate">{item.title}</h2>
              <div className="flex justify-between items-center mt-auto">
                <Link href={`/product/${item.slug}`} className="text-blue-600 hover:underline text-sm">
                  Ürüne Git
                </Link>
                <button
                  onClick={() => removeFromFavorites(item._id)}
                  className="p-2 text-red-600 hover:text-red-700"
                  aria-label="Favorilerden kaldır"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}