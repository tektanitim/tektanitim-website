// components/LogoSVG.tsx
"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface LogoSVGProps {
  width?: number;
  height?: number;
  isAnimated?: boolean;
}

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0, fill: "none" }, // Başlangıçta dolgu yok
  visible: {
    pathLength: 1,
    opacity: 1,
    fill: "#ffffff", // Animasyon sonunda logonun içini doldur (kendi renginizle değiştirin)
    transition: {
      pathLength: { type: "spring", duration: 2, bounce: 0, delay: 0.2 }, // Çizim animasyonu başlasın
      opacity: { duration: 0.01, delay: 0.2 }, 
      fill: { delay: 1.7, duration: 0.5 } 
    }
  }
};

export default function LogoSVG({ width = 128, height = 128, isAnimated = true }: LogoSVGProps) {
  const originalWidth = 402.89334;
  const originalHeight = 346.81549;

  return (
    <div style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        width={width}
        height={height}
        viewBox={`-50 -300 ${originalWidth + 400} ${originalHeight + 300}`}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="m 180.1757,-114.34873 h -0.0239 V 20.261664 h 108.44998 l 2.81317,-0.235865 V -38.17014 h -50.50286 v -21.031678 h 283.94357 v 20.368243 H 313.81804 V 232.46675 H 453.11701 V 41.797416 H 400.73876 V 179.18905 H 367.09573 V 20.293704 H 583.04517 V -114.34859 Z m 17.39563,17.491312 v -0.03826 H 565.61611 V 2.8022622 H 349.67304 V 196.61009 h 68.56188 V 59.192896 h 17.45303 V 215.0072 H 331.31419 V -21.406182 h 211.0312 V -76.629499 H 223.48932 v 55.918617 h 50.47096 V 2.8341182 h -76.38895 Z"
          stroke="#ffffff" // Geçici olarak kırmızı yapın
          strokeWidth="10" // Geçici olarak daha kalın yapın
          variants={draw}
          initial="hidden"
          animate={isAnimated ? "visible" : "hidden"}
        />
      </svg>
    </div>
  );
}