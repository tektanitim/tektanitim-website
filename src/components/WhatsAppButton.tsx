'use client';

import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
    const phoneNumber = "905053574703"; // Replace with your WhatsApp number
    const message = "Merhaba, Ürünleriniz hakkında bilgi almak istiyorum."; // Default message

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20ba5a] transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Whatsapp ile iletişime geçin"
        >
            <FaWhatsapp size={32} />
        </a>
    );
};

export default WhatsAppButton;