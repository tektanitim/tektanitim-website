// ImageGallery.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type ProductImage = {
  asset: {
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
    };
  };
};

export default function ImageGallery({ images }: { images: ProductImage[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = images.map((img) => ({
    src: img.asset.url,
    width: img.asset.metadata.dimensions.width,
    height: img.asset.metadata.dimensions.height,
  }));

  return (
    <div>
      {/* Büyük Görsel */}
      <div
        className="relative w-[400px] h-[400px] border-2 border-indigo-100 border-y-indigo-300 mx-auto rounded overflow-hidden cursor-pointer mb-4"
        onClick={() => {
          setOpen(true);
          // Büyük görsele tıklayınca, current index'i başlangıç index'i olarak ayarla
          // Bu zaten index state'i tarafından yönetiliyor, ama emin olmak için eklenebilir.
        }}
      >
        <Image
          src={images[index].asset.url}
          alt={`Product image ${index + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      {/* Thumbnaillar */}
      <div className="mx-auto w-[400px] flex space-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {images.map((img, i) => (
          <div
            key={i}
            className={`relative flex-shrink-0 w-[100px] h-[100px] rounded border-2 cursor-pointer overflow-hidden ${
              i === index ? "border-blue-600" : "border-transparent"
            }`}
            onClick={() => setIndex(i)} // Thumbnail'e tıklanınca index'i güncelle
          >
            <Image
              src={img.asset.url}
              alt={`Thumbnail ${i + 1}`}
              fill
              sizes="80px"
              style={{ objectFit: "cover" }}
              priority={i === index}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index} // Lightbox'ın başlangıç indeksini belirle
        controller={{ closeOnBackdropClick: true }}
        styles={{ container: { backgroundColor: "rgba(0,0,0,0.9)" } }}
        // Düzeltme: `on` prop'u içindeki `view` callback'i, slayt değiştiğinde çağrılır.
        // `e` parametresinin tipini de `ViewCallbackProps` olarak belirtiyoruz.
        on={{
          view: ({ index: currentIndex }) => setIndex(currentIndex),
        }}
      />
    </div>
  );
}