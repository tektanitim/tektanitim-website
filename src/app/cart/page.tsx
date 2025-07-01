"use client";

import React from 'react';
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

export default function CartPage() {
  const { cart, removeFromCart, updateCartItemQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Sepetiniz Boş</h1>
        <p className="text-lg text-gray-600 mb-6">Alışverişe başlamak için ürünleri gezebilirsiniz.</p>
        <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200">
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Sepetim ({cart.length} Ürün)</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sepet Ürünleri */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center gap-4 py-4 border-b last:border-b-0">
              <div className="flex-shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                <p className="text-blue-600 font-bold">{item.price.toFixed(2)} TL</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateCartItemQuantity(item._id, item.quantity - 1)}
                  className="p-1 border rounded-full text-gray-600 hover:bg-gray-100"
                  aria-label="Miktarı azalt"
                >
                  <FiMinus size={16} />
                </button>
                <span className="text-lg font-medium w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateCartItemQuantity(item._id, item.quantity + 1)}
                  className="p-1 border rounded-full text-gray-600 hover:bg-gray-100"
                  aria-label="Miktarı artır"
                >
                  <FiPlus size={16} />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="p-2 text-red-600 hover:text-red-700"
                aria-label="Ürünü sepetten kaldır"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Sipariş Özeti */}
        <div className="md:col-span-1 bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sipariş Özeti</h2>
          <div className="flex justify-between items-center text-lg mb-2">
            <span>Toplam Ürün:</span>
            <span className="font-semibold">{cart.length}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold text-blue-700 pt-4 border-t">
            <span>Genel Toplam:</span>
            <span>{getCartTotal().toFixed(2)} TL</span>
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-200 mt-6">
            Siparişi Tamamla
          </button>
        </div>
      </div>
    </div>
  );
}