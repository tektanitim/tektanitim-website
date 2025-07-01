"use client"; // Bu dosyanın bir Client Component olduğunu belirtir

import React, { useEffect } from 'react';

import { motion } from 'framer-motion'; // Framer Motion'ı import ediyoruz
import LogoSVG from './LogoSVG';

interface SplashScreenProps {
  onAnimationComplete: () => void; // Animasyon bittiğinde çağrılacak callback fonksiyonu
}

export default function SplashScreen({ onAnimationComplete }: SplashScreenProps) {

  // Bu useEffect sadece debug amaçlıdır, logoyu yükledikten sonra animasyon otomatik başlar
  useEffect(() => {
    console.log("SplashScreen komponenti yüklendi.");
  }, []);

  return (
    <motion.div
      id="splashScreen"
      className="fixed inset-0 bg-gray-500 flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 2.5 }} // Splash ekranı için easing genelde linear veya default olur
      onAnimationComplete={onAnimationComplete}
    >
        <LogoSVG width={350} height={350} isAnimated={true} />
      </motion.div>
  );
}