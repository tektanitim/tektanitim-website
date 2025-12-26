'use client';

import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
    const phoneNumber = "905053574703"; // Replace with your WhatsApp number
    const message = "Merhaba, Ürünleriniz hakkında bilgi almak istiyorum."; // Default message
    const displayMobile = "0505 357 47 03";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="fixed bottom-6 right-8 z-50 flex flex-col items-center gap-2">
            
        
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20ba5a] transition-all duration-300 hover:scale-100 active:scale-95"
            aria-label="WhatsApp ile iletişime geçin"
        >
            <FaWhatsapp size={32} />
            <span className="absolute -bottom-5 w-max text-black font-medium text-[15px] drop-shadow-sm">
            {displayMobile}
            </span>
        </a>
        </div>
    );
};

export default WhatsAppButton;