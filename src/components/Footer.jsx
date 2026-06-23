import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

// const InstagramIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
// );

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const Footer = () => {
  const [activeMap, setActiveMap] = useState(0);

  const maps = [
    {
      name: "Sede Av. Túnel",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2360.8658758075494!2d-66.09833026970023!3d-17.413249691649078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e37183cbe51153%3A0x96a185fed01fb221!2sEventos%20arze!5e0!3m2!1sen!2sus!4v1780705541651!5m2!1sen!2sus"
    },
    {
      name: "Sede Ex Tranca",
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238.05998339233477!2d-66.0298236763082!3d-17.402806409882828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e37b55d00005af%3A0x632310ab76e9f281!2sTRANS%20VRLOGISTICA%20S.R.L.!5e0!3m2!1sen!2sus!4v1780705053776!5m2!1sen!2sus"
    }
  ];

  return (
    <footer className="bg-brand-dark text-brand-beige py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <h3 className="font-serif text-3xl font-bold mb-6 text-brand-light tracking-wide">Eventos Arze</h3>
          <p className="text-brand-beige/70 mb-6 max-w-sm font-light">
            Creando experiencias únicas y sofisticadas. Transformamos espacios en momentos inolvidables con atención personalizada a cada detalle.
          </p>
          <div className="flex space-x-4">
            {/* <a href="#" className="w-10 h-10 rounded-full border border-brand-beige/20 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent transition-colors">
              <InstagramIcon />
            </a> */}
            <a href="https://www.facebook.com/share/1Bk396thC3/" className="w-10 h-10 rounded-full border border-brand-beige/20 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent transition-colors">
              <FacebookIcon />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif text-xl font-semibold mb-6 text-brand-light">Servicios</h4>
          <ul className="space-y-4 font-light text-brand-beige/80">
            <li><a href="#" className="hover:text-brand-accent transition-colors">Organización Integral</a></li>
            <li><a href="#" className="hover:text-brand-accent transition-colors">Decoración y Ambientación</a></li>
            <li><a href="#" className="hover:text-brand-accent transition-colors">Catering y Coctelería</a></li>
            <li><a href="#" className="hover:text-brand-accent transition-colors">Alquiler de Mobiliario</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-serif text-xl font-semibold mb-6 text-brand-light">Contacto</h4>
          <ul className="space-y-4 font-light text-brand-beige/80">
            <li className="flex items-start space-x-3">
              <MapPin size={20} className="text-brand-accent shrink-0 mt-1" />
              <span>Av. Ex tranca entre Santa cruz y barrientos acera norte.<br/>País</span>
            </li>
            <li className="flex items-start space-x-3">
              <MapPin size={20} className="text-brand-accent shrink-0 mt-1" />
              <span>Av. Tunel antes del segundo semaforo a media cuadra.<br/>País</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={20} className="text-brand-accent shrink-0" />
              <span>591-68465444</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={20} className="text-brand-accent shrink-0" />
              <span>iarce5327@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Map Preview */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-serif text-xl font-semibold text-brand-light">Nuestras Oficinas</h4>
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveMap(0)}
                className={`text-xs px-3 py-1 rounded border transition-colors ${activeMap === 0 ? 'bg-brand-accent text-white border-brand-accent' : 'border-brand-beige/20 text-brand-beige/70 hover:text-white hover:border-brand-beige/50'}`}
              >
                Oficina 1
              </button>
              <button 
                onClick={() => setActiveMap(1)}
                className={`text-xs px-3 py-1 rounded border transition-colors ${activeMap === 1 ? 'bg-brand-accent text-white border-brand-accent' : 'border-brand-beige/20 text-brand-beige/70 hover:text-white hover:border-brand-beige/50'}`}
              >
                Oficina 2
              </button>
            </div>
          </div>
          <div className="w-full flex-grow min-h-[200px] rounded-xl overflow-hidden shadow-lg border border-brand-beige/10 bg-brand-dark/50">
            <iframe 
              src={maps[activeMap].src}
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '200px' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title={`Ubicación ${maps[activeMap].name}`}
            ></iframe>
          </div>
          <p className="text-xs text-brand-beige/50 mt-3 italic">
            * Haz clic en "Ampliar el mapa" para abrir la aplicación.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-brand-beige/10 text-center text-sm font-light text-brand-beige/50">
        <p>&copy; {new Date().getFullYear()} Eventos Arze. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
