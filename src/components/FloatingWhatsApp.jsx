import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingWhatsApp() {
  const whatsappUrl = "https://wa.me/919876543210?text=Hello%20Rahul%2C%20I%20would%20like%20to%20schedule%20a%20financial%20consultation.";

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 hover:bg-[#20ba5a]"
      aria-label="Contact on WhatsApp"
    >
      {/* Pulse Animations */}
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75"></span>
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30 animate-pulse"></span>
      
      {/* SVG Icon */}
      <svg
        className="relative h-7 w-7 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.967C16.59 1.973 14.121.95 11.5.952c-5.437 0-9.864 4.373-9.868 9.803-.001 1.814.488 3.59 1.418 5.175l-.99 3.61 3.733-.967zm11.367-7.405c-.3-.15-1.77-.872-2.046-.971-.276-.1-.477-.15-.677.15-.2.3-.777.971-.953 1.171-.176.2-.351.224-.651.075-1.204-.6-2.007-1.11-2.812-2.498-.22-.38.22-.353.63-1.174.1-.2.05-.375-.025-.526-.075-.15-.677-1.628-.927-2.228-.243-.582-.49-.504-.677-.514-.175-.008-.376-.01-.577-.01-.2 0-.527.075-.802.375-.276.3-.951.928-.951 2.262 0 1.335.977 2.626 1.11 2.8.134.175 1.92 2.923 4.652 4.099.65.28 1.157.447 1.553.573.654.207 1.25.178 1.72.108.524-.078 1.77-.723 2.02-1.42.252-.697.252-1.296.176-1.42-.076-.124-.276-.199-.576-.349z" />
      </svg>
    </motion.a>
  );
}
