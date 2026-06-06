import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/59168465444?text=Un%20gusto%2C%20Les%20hablo%20desde%20la%20pagina%20Web%20y%20estoy%20interesado%20en%20sus%20servicios"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#1ebe57] hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center animate-bounce"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={32} />
    </a>
  );
};

export default FloatingWhatsApp;
