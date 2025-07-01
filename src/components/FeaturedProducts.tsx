"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Product = {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  images: {
    asset: {
      url: string;
    };
  }[];
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/random-products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50 dark:bg-zinc-800">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
          Seçilen Ürünler
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product.slug?.current}`}
              className="group bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <div className="relative w-full h-48 mb-3">
                <Image
                  src={product.images?.[0]?.asset?.url || "/placeholder.png"}
                  alt={product.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 200px"
                />
              </div>
              <h3 className="text-sm font-medium group-hover:underline text-gray-900 dark:text-white">
                {product.title}
              </h3>
              <p className="text-blue-600 font-semibold text-sm mt-1">
                {product.price} TL
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
