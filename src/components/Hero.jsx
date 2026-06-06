import { Phone } from 'lucide-react';

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a3 3 0 0 1-3-3v11a7 7 0 1 1-7-7v3z"></path>
  </svg>
);


const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-brand-beige overflow-hidden">
      {/* Background abstract shapes for modern minimalist look */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-40">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl"></div>
      </div>

      {/* Top Navigation / Socials */}
      <div className="absolute top-0 w-full px-8 py-6 flex justify-between items-center z-10">
        <div className="font-serif text-2xl font-bold tracking-wider text-brand-dark">Eventos Arze</div>
        <div className="flex space-x-6 text-brand-dark/70">
          {/* <a href="#" className="hover:text-brand-accent transition-colors"><InstagramIcon /></a> */}
          <a href="https://www.facebook.com/share/1Bk396thC3/" target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-colors"><FacebookIcon /></a>
          <a href="#" target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-colors"><TikTokIcon /></a>
          <a href="#" className="hover:text-brand-accent transition-colors"><Phone size={20} /></a>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-brand-dark leading-tight">
          Momentos Inolvidables, <br/>
          <span className="italic text-brand-accent font-light">Diseñados con Elegancia</span>
        </h1>
        <p className="text-lg md:text-xl text-brand-dark/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Somos expertos en la organización integral de eventos. Desde la planificación hasta el último detalle decorativo, hacemos realidad la celebración de tus sueños.
        </p>
        
        <button 
          className="bg-brand-dark text-brand-light px-8 py-4 rounded-full font-medium text-lg tracking-wide hover:bg-brand-accent transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-brand-accent/30"
          onClick={() => window.open('https://wa.me/59168465444?text=Un%20gusto%2C%20Les%20hablo%20desde%20la%20pagina%20Web%20y%20estoy%20interesado%20en%20sus%20servicios', '_blank')}
        >
          Reserva tu Fecha
        </button>
      </div>
    </div>
  );
};

export default Hero;
