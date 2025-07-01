// src/app/iletisim/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import * as FiIcons from 'react-icons/fi'; // Tüm Fi ikonlarını import ediyoruz
import { motion } from 'framer-motion';
import { client } from '@/utils/sanity'; // Sanity client import edildi
import { PortableText } from '@portabletext/react'; // Portable Text render için
import { FiMapPin, FiMail, FiClock, FiUser, FiPhone } from 'react-icons/fi';

// Framer Motion için varyantlar (animasyon ayarları)
const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// --- Sanity İletişim Sayfası Tipleri ---
interface ContactInfoCard {
  _key: string; // Sanity'nin her array öğesi için verdiği benzersiz anahtar
  title: string;
  icon: keyof typeof FiIcons; // FiIcons objesindeki bir anahtar olabilir (örn: "FiMapPin")
  details: any[]; // Portable Text
  linkText?: string;
  linkHref?: string;
}

interface SanityContactPageContent {
  _id: string;
  heading: string;
  subHeading: string;
  contactInfoCards: ContactInfoCard[];
  mapSection: {
    mapIframeUrl: string;
  };
  formSectionHeading: string;
}

// Portable Text içeriğini özelleştirmek için bileşenler (basit tutalım)
const components = {
  block: {
    normal: ({ children }: any) => <p className="text-gray-700">{children}</p>,
    // Diğer başlık tipleri vb. gerekirse buraya eklenebilir.
    // Özellikle linkleri Sanity'de tanımladıysanız `mark`'ları da eklemeniz gerekebilir.
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <Link href={value.href} rel={rel} className="text-blue-600 hover:underline">
          {children}
        </Link>
      );
    },
  },
};

export default function ContactPage() {
  const [contactPageContent, setContactPageContent] = useState<SanityContactPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    async function fetchContactPageContent() {
      setLoading(true);
      setError(null);
      try {
        const query = `*[_type == "contactPage"][0]{
          heading,
          subHeading,
          contactInfoCards[]{
            _key,
            title,
            icon,
            details,
            linkText,
            linkHref
          },
          mapSection{
            mapIframeUrl
          },
          formSectionHeading
        }`;
        const data: SanityContactPageContent = await client.fetch(query);
        setContactPageContent(data);
        setLoading(false);
      } catch (err) {
        console.error("İletişim sayfası içeriği çekilemedi:", err);
        setError("İletişim sayfası yüklenirken bir hata oluştu.");
        setLoading(false);
      }
    }
    fetchContactPageContent();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(null);

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      alert('Lütfen tüm zorunlu alanları doldurun (Ad, Soyad, E-posta, Mesaj).');
      setIsSubmitting(false);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert('Lütfen geçerli bir e-posta adresi girin.');
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Form verileri:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Form gönderme hatası:', error);
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>İletişim sayfası yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>{error}</p>
        <p>Lütfen Sanity Studioda Contact Page dokümanı oluşturduğunuzdan ve yayınladığınızdan emin olun.</p>
      </div>
    );
  }

  if (!contactPageContent) {
    return (
      <div className="text-center py-20 text-gray-600">
        <p>İletişim sayfası içeriği bulunamadı.</p>
        <p>Lütfen Sanity Studioda Contact Page dokümanını oluşturun ve yayınlayın.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <p className="text-sm text-gray-600">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span className="font-semibold text-gray-800">Contact Us</span>
          </p>
        </div>
      </div>

      {/* Contact Us Header */}
      <div className="container mx-auto px-4 py-8 md:py-12 text-center">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInVariants}
          className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4"
        >
          {contactPageContent.heading}
        </motion.h1>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: fadeInVariants.hidden,
            visible: {
              ...fadeInVariants.visible,
              transition: {
                ...fadeInVariants.visible.transition,
                delay: 0.2
              }
            }
          }}
          className="text-lg text-gray-700 max-w-2xl mx-auto"
        >
          {contactPageContent.subHeading}
        </motion.p>
      </div>

      {/* Bilgi Kartları */}
      <section className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactPageContent.contactInfoCards.map((card, index) => {
          const IconComponent = FiIcons[card.icon]; // İkonu dinamik olarak alıyoruz
          return (
            <motion.div
              key={card._key} // Sanity'den gelen _key'i kullanıyoruz
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={{
                hidden: fadeInVariants.hidden,
                visible: {
                  ...fadeInVariants.visible,
                  transition: {
                    ...fadeInVariants.visible.transition,
                    delay: 0.2 + (index * 0.1) // Her kart için gecikmeyi artır
                  }
                }
              }}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center border-t-4 border-pink-500"
            >
              <div className="bg-pink-100 rounded-full p-4 mb-4">
                {IconComponent && <IconComponent className="h-8 w-8 text-pink-500" />}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
              <PortableText value={card.details} components={components} />
              {card.linkText && card.linkHref && (
                <Link href={card.linkHref} target="_blank" rel="noopener noreferrer" className="mt-3 text-blue-600 hover:underline">
                  {card.linkText}
                </Link>
              )}
            </motion.div>
          );
        })}
      </section>

      {/* Harita Bölümü */}
      <section className="container mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInVariants}
          className="w-full h-[400px] md:h-[550px] bg-gray-200 rounded-lg overflow-hidden shadow-lg"
        >
          {/* Önce mapSection objesinin sonra mapIframeUrl'in varlığını kontrol et */}
          {contactPageContent.mapSection && contactPageContent.mapSection.mapIframeUrl && (
            <iframe
              src={contactPageContent.mapSection.mapIframeUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location on Map"
            ></iframe>
          )}
        </motion.div>
      </section>

      {/* İletişim Formu */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInVariants}
          className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
            {contactPageContent.formSectionHeading}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form alanları değişmedi */}
            <div className="relative">
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-50/50 text-gray-900 placeholder-gray-500" required />
              <FiUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="relative">
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-50/50 text-gray-900 placeholder-gray-500" required />
              <FiUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="relative">
              <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-50/50 text-gray-900 placeholder-gray-500" />
              <FiPhone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="relative">
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email Address" className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-50/50 text-gray-900 placeholder-gray-500" required />
              <FiMail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="md:col-span-2 relative">
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Write Message..." rows={6} className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-pink-50/50 text-gray-900 placeholder-gray-500 resize-y" required></textarea>
            </div>
            <div className="md:col-span-2 text-center mt-4">
              {submitSuccess === true && (<p className="text-green-600 mb-3 font-semibold">Mesajınız başarıyla gönderildi!</p>)}
              {submitSuccess === false && (<p className="text-red-600 mb-3 font-semibold">Mesajınız gönderilemedi. Lütfen tekrar deneyin.</p>)}
              <button type="submit" className="w-full bg-pink-600 text-white py-4 rounded-md font-semibold text-lg hover:bg-pink-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 flex items-center justify-center gap-2" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Gönderiliyor...</span>
                  </>
                ) : (
                  'SEND MESSAGE'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </section>
    </div>
  );
}