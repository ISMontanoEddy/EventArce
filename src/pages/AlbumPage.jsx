import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Phone } from 'lucide-react';
import logo from '../assets/EA_Logo1.png';
import DigitalAlbum from '../components/DigitalAlbum';
import Footer from '../components/Footer';

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const AlbumPage = () => {
  const location = useLocation();

  // Asegurar scroll al inicio al entrar o cambiar de sub-álbum
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] text-brand-dark">
      {/* Navbar Exclusivo de la Ruta Álbum Digital */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-black/5 transition-all shadow-xs">
        <div className="max-w-7xl 2xl:max-w-[1700px] mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          
          {/* Logo y Enlace a Inicio */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src={logo} 
              alt="Eventos Arze" 
              className="h-10 w-10 sm:h-11 sm:w-11 object-cover rounded-full group-hover:scale-105 transition-transform" 
            />
            <div>
              <span className="font-serif font-bold text-lg sm:text-xl text-brand-dark tracking-wide block leading-none">
                Eventos Arze
              </span>
              <span className="text-[11px] text-brand-accent uppercase tracking-widest font-medium">
                Cochabamba
              </span>
            </div>
          </Link>

          {/* Navegación y Acciones */}
          <div className="flex items-center space-x-3 sm:space-x-6">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-brand-dark hover:text-brand-accent bg-black/5 hover:bg-black/10 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al Inicio</span>
            </Link>

            <a 
              href="https://www.facebook.com/share/1Bk396thC3/" 
              target="_blank" 
              rel="noreferrer" 
              className="hidden sm:inline-flex p-2 text-brand-dark/70 hover:text-brand-accent transition-colors"
              aria-label="Facebook de Eventos Arze"
            >
              <FacebookIcon />
            </a>

            <a
              href="https://wa.me/59168465444?text=Hola%20Eventos%20Arze%2C%20estoy%20viendo%20su%20Álbum%20Digital%20y%20deseo%20hacer%20una%20consulta"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-brand-dark hover:bg-brand-accent text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-md hover:shadow-brand-accent/30"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Contactar Asesor</span>
              <span className="md:hidden">WhatsApp</span>
            </a>
          </div>

        </div>
      </header>

      {/* Contenido Principal de la Ruta */}
      <main className="flex-grow">
        <DigitalAlbum />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AlbumPage;
