"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { client } from "@/utils/sanity";
import { easeOut } from "framer-motion";

const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut, // string yerine import ettiğin fonksiyon
    },
  },
};

interface ContactInfoCard {
  _key: string;
  title: string;
  details: string; // Sanity'den plain text dönecek
}

interface ContactPageData {
  heading: string;
  contactInfoCards: ContactInfoCard[];
  mapSection: {
    mapIframeUrl: string;
  };
}

export default function ContactPage() {
  const [data, setData] = useState<ContactPageData | null>(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "contactPage"][0]{
          heading,
          contactInfoCards[]{
            _key,
            title,
            details
          },
          mapSection{
            mapIframeUrl
          }
        }`;
        const res: ContactPageData = await client.fetch(query);
        setData(res);
      } catch (err) {
        console.error("Sanity fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // Backend / API endpointine gönder
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Heading */}
      <motion.h1
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
        className="text-4xl font-bold text-center mb-12"
      >
        {data?.heading || "Bize Ulaşın"}
      </motion.h1>

      {/* Two Columns */}
      <div className="grid md:grid-cols-2 gap-10 mb-12">
        {/* Contact Form */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="bg-white p-6 rounded shadow"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Ad Soyad"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Telefon Numarası"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Adresi"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />
            <textarea
              name="message"
              placeholder="Mesajınız"
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-3 rounded hover:bg-pink-700 transition"
            >
              Gönder
            </button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInVariants}
          className="bg-gray-50 p-6 rounded shadow space-y-4"
        >
          {data?.contactInfoCards.map((card) => (
            <div key={card._key}>
              <h3 className="text-lg font-bold">{card.title}</h3>
              <p className="text-gray-700">{card.details}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Map */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
        className="w-full h-[400px] rounded overflow-hidden shadow"
      >
        <iframe
          src={data?.mapSection?.mapIframeUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </motion.div>
    </div>
  );
}
