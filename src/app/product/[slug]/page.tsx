"use client";

import { client } from "@/sanity/client";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import ImageGallery from "@/components/ImageGallery";
import { useState, useEffect } from "react";
import { FiHeart } from "react-icons/fi";
import { PortableTextBlock } from "@portabletext/types";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

interface Product {
  _id: string;
  title: string;
  price: number;
  description: PortableTextBlock[];
  images: { asset: { url: string; metadata: { dimensions: { width: number; height: number } } } }[];
  slug: { current: string };
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { slug } = await params; // params'ı asenkron olarak çözüyoruz
        const data = await client.fetch<Product>(
          groq`
            *[_type == "product" && slug.current == $slug][0]{
              _id,
              title,
              price,
              description,
              "images": images[]{
                asset->{
                  url,
                  metadata { dimensions }
                }
              },
              "slug": slug.current
            }
          `,
          { slug }
        );
        setProduct(data);
      } catch (err) {
        console.error("Ürün detayı çekilirken hata oluştu:", err);
        setError("Ürün detayı yüklenirken bir sorun oluştu.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params]); // params'ı bağımlılık olarak ekliyoruz

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Ürün yükleniyor...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-600">{error}</div>;
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8 text-center">Ürün bulunamadı.</div>;
  }

  const productImageUrl = product.images?.[0]?.asset?.url || "/placeholder.png";

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      title: product.title,
      price: product.price,
      imageUrl: productImageUrl,
    });
    alert(`${product.title} sepete eklendi!`);
  };

  const handleToggleFavorite = () => {
    if (isFavorite(product._id)) {
      removeFromFavorites(product._id);
      alert(`${product.title} favorilerden kaldırıldı.`);
    } else {
      addToFavorites({
        _id: product._id,
        title: product.title,
        imageUrl: productImageUrl,
        slug: product.slug.current,
      });
      alert(`${product.title} favorilere eklendi!`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <ImageGallery images={product.images} />

        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-gray-200 dark:border-zinc-700 p-6 flex flex-col justify-between space-y-6 animate-fadeIn">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {product.title}
            </h1>
            <p className="text-xl font-semibold text-blue-600 mb-4">{product.price} TL</p>
            <div className="prose dark:prose-invert max-w-none">
              <PortableText value={product.description} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition duration-200"
            >
              Sepete Ekle
            </button>
            <button
              onClick={handleToggleFavorite}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded shadow transition duration-200 ${
                isFavorite(product._id)
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              <FiHeart size={20} className={isFavorite(product._id) ? "fill-current" : ""} />
              <span>{isFavorite(product._id) ? "Favorilerden Kaldır" : "Favorilere Ekle"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}