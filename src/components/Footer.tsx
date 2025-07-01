"use client";

// components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import { FiFacebook, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi';
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa';


export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-12">
            
      {/* En Üstte Logo */}
      <div className="py-8 flex justify-center">
        <Link href="/" className="text-2xl font-bold text-blue-800">
          <Image
                        src='/images/tek_Logo.png'
                        alt="Ucuzbezcanta"
                        width={120}
                        height={40}
                        priority
                      />
        </Link>
      </div>

      {/* Orta Bölüm - 4 Sütun */}
      <div className="border-t border-b border-gray-200 py-10 px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-screen-xl mx-auto text-sm">
        
        {/* Hakkımızda */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Hakkımızda</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            Tek Tanıtım Şirketler Grubu, 15 yılı aşkın sektör tecrübesiyle promosyon ürünleri üzerine ar-ge ve inovasyon çalışmalarını sürdürmeye devam ediyor.
          </p>
        </div>

        {/* Linkler */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Linkler</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-blue-600">Anasayfa</Link></li>
            <li><Link href="/about" className="hover:text-blue-600">Hakkımızda</Link></li>
            <li><Link href="/blog" className="hover:text-blue-600">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-blue-600">İletişim</Link></li>
          </ul>
        </div>

        {/* S.S.S. & Yasal */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Yardım</h4>
          <ul className="space-y-2">
            <li><Link href="/faq" className="hover:text-blue-600">Sıkça Sorulan Sorular</Link></li>
            <li><Link href="/shipping" className="hover:text-blue-600">Teslimat</Link></li>
            <li><Link href="/returns" className="hover:text-blue-600">İade Politikası</Link></li>
            <li><Link href="/terms" className="hover:text-blue-600">Kullanım Koşulları</Link></li>
          </ul>
        </div>

        {/* İletişim */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">İletişim</h4>
          <ul className="space-y-2 text-sm">
            <li><FiMail className="inline-block mr-2" /> info@tektanitim.com.tr</li>
            <li>+90 (212) 659 25 30</li>
            <li>Fetihtepe Mahallesi Tepe üstü Sk. No:41A Beyoğlu İstanbul, Türkiye</li>
          </ul>
        </div>
      </div>

      {/* Alt Bölüm - Sosyal + Ödeme */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-6 max-w-screen-xl mx-auto">
        {/* Sosyal */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="#" className="text-gray-500 hover:text-blue-600"><FiFacebook size={20} /></a>
          <a href="#" className="text-gray-500 hover:text-blue-600"><FiTwitter size={20} /></a>
          <a href="#" className="text-gray-500 hover:text-blue-600"><FiInstagram size={20} /></a>
          <span className="sm:text-base text-[10px] text-qgray font-300">©2025
            <a href="#" rel="noreferrer" className="font-500 text-qblack mx-1">Tek Tanıtım Reklam</a>All rights reserved</span>
        </div>

        {/* Ödeme */}
        <div className="flex space-x-4">
          <FaCcVisa size={32} className="text-gray-500" />
          <FaCcMastercard size={32} className="text-gray-500" />
        </div>
      </div>
    </footer>
  );
}
