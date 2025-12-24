// MarqueeTicker.tsx
"use client";

import Marquee from "react-fast-marquee";

const messages = [
  "Teknolojik Promosyon Ürünleri!",
  "Ham Bez Çantalar!",
  "Termos & Mug!",
  "Ajanda & Defterler",
  "Anahtarlıklar",
  "Kalem Çeşitleri",
];

export default function MarqueeTicker() {
  return (
    <Marquee speed={50} gradient={false} className="bg-gray-400 py-2 mt-4">
      {messages.map((msg, index) => (
        <span key={index} className="text-white text-lg font-semibold mx-8">
          {msg}
        </span>
      ))}
    </Marquee>
  );
}
