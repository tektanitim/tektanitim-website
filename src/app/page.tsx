"use client";

import React, { useState, useEffect } from 'react';

import HeroSlider from "@/components/HeroSlider";
import MarqueeTicker from '@/components/MarqueTicker';
import ServiceFeatures from "@/components/ServiceFeatures";
import FeaturedProducts from "@/components/FeaturedProducts";
import SplashScreen from "@/components/SplashScreen"; // SplashScreen komponentini import ediyoruz

import { client } from "@/sanity/client";
import { getAllSlidersQuery } from "@/sanity/queries";

type SliderItem = {
  _id: string;
  title: string;
  heading: string;
  paragraphColorClass: string;
  headingColorClass: string;
  imageUrl: string;
  link: string;
  orderRank: number;
};

export default function Home() {
  const [sliders, setSliders] = useState<SliderItem[]>([]);
  const [loadingSliders, setLoadingSliders] = useState(true);
  const [errorSliders, setErrorSliders] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(true); // Splash ekranını kontrol eden state

  // Sliders verilerini çekme
  useEffect(() => {
    async function fetchSliders() {
      try {
        const fetchedSliders = await client.fetch<SliderItem[]>(getAllSlidersQuery);
        setSliders(fetchedSliders);
        console.log("SLIDERS: ", fetchedSliders);
      } catch (err) {
        console.error("Slider'lar çekilirken hata oluştu:", err);
        setErrorSliders("Slider'lar yüklenirken bir sorun oluştu.");
      } finally {
        setLoadingSliders(false);
      }
    }
    fetchSliders();
  }, []);

  // showSplash true ise SplashScreen komponentini render et
  if (showSplash) {
    return (
      // SplashScreen komponentine, animasyon tamamlandığında çağrılacak bir callback gönderiyoruz
      <SplashScreen onAnimationComplete={() => setShowSplash(false)} />
    );
  }

  // Sliders yükleniyor durumu (Splash ekranı kapandıktan sonra gösterilecek)
  if (loadingSliders) {
    return (
      <div className="container mx-auto px-4 py-8 text-center min-h-[60vh] flex items-center justify-center">
        Sliderlar yükleniyor...
      </div>
    );
  }

  // Slider yükleme hatası durumu (Splash ekranı kapandıktan sonra gösterilecek)
  if (errorSliders) {
    return (
      <div className="container mx-auto px-4 py-8 text-center min-h-[60vh] flex items-center justify-center text-red-600">
        {errorSliders}
      </div>
    );
  }

  // Ana sayfa içeriği (Splash ve slider yükleme durumları bittikten sonra gösterilecek)
  return (
    <main>
      {sliders.length > 0 ? (
        <HeroSlider slides={sliders} />
      ) : (
        <div className="bg-gray-200 h-64 flex items-center justify-center text-gray-500">
          Slider içeriği bulunamadı.
        </div>
      )}
      <div className="mt-12">
        <MarqueeTicker />
      </div>
      <div className="mt-12">
        <ServiceFeatures />
      </div>
      <FeaturedProducts />
    </main>
  );
}