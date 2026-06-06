import { useState } from 'react';
import TableCustomizer from './TableCustomizer';
import { Utensils, Wine, Music, Truck, Flower2, Scissors } from 'lucide-react';

const ServicesTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "Organización y Ambientación",
    "Catering y Bebidas",
    "Servicios Complementarios"
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-brand-light">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-brand-dark mb-4">Catálogo de Servicios</h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto"></div>
        </div>

        {/* Header Tabs */}
        <div className="flex flex-col md:flex-row justify-center items-center mb-12 border-b border-brand-dark/10">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`py-4 px-8 text-sm md:text-base font-medium transition-all duration-300 relative ${
                activeTab === index 
                  ? 'text-brand-dark' 
                  : 'text-brand-dark/50 hover:text-brand-dark/80'
              }`}
            >
              {tab}
              {activeTab === index && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent transform origin-left transition-transform duration-300"></span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px] transition-all duration-500">
          
          {/* TAB 1: Organización, Decoración e Indumentaria */}
          {activeTab === 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="mb-16">
                <p className="text-center text-brand-dark/70 max-w-3xl mx-auto mb-10 text-lg font-light">
                  Diseñamos el ambiente perfecto. Contamos con un amplio inventario de mobiliario, mantelería fina y accesorios decorativos para adaptar cada espacio a tu visión.
                </p>
                <TableCustomizer />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 bg-white rounded-2xl shadow-sm border border-brand-dark/5 hover:shadow-md transition-shadow">
                  <Flower2 className="w-10 h-10 text-brand-accent mb-4" />
                  <h3 className="font-serif text-xl font-semibold mb-3">Arreglos Florales</h3>
                  <p className="text-brand-dark/60 font-light">Centros de mesa, arcos y decoración colgante con flores frescas y preservadas de la más alta calidad.</p>
                </div>
                <div className="p-8 bg-white rounded-2xl shadow-sm border border-brand-dark/5 hover:shadow-md transition-shadow">
                  <Scissors className="w-10 h-10 text-brand-accent mb-4" />
                  <h3 className="font-serif text-xl font-semibold mb-3">Telas y Cortinajes</h3>
                  <p className="text-brand-dark/60 font-light">Transformación de salones y carpas mediante drapeados elegantes e iluminación perimetral.</p>
                </div>
                <div className="p-8 bg-white rounded-2xl shadow-sm border border-brand-dark/5 hover:shadow-md transition-shadow">
                  <Utensils className="w-10 h-10 text-brand-accent mb-4" />
                  <h3 className="font-serif text-xl font-semibold mb-3">Mobiliario Premium</h3>
                  <p className="text-brand-dark/60 font-light">Sillas Tiffany, mesas imperiales, salas lounge y barras iluminadas para diferentes estilos.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Catering y Bebidas */}
          {activeTab === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="group relative overflow-hidden rounded-2xl bg-brand-dark text-white shadow-lg flex flex-col justify-end min-h-[400px]">
                  <img 
                    src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1000" 
                    alt="Banquetes" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700"
                  />
                  <div className="relative p-10 z-10">
                    <Utensils className="w-12 h-12 mb-4 text-brand-beige" />
                    <h3 className="text-3xl font-serif font-bold mb-3">Alta Cocina & Banquetes</h3>
                    <p className="font-light text-brand-beige/90 max-w-md text-lg">
                      Menús a tres tiempos, bufets internacionales y estaciones temáticas preparadas por chefs ejecutivos.
                    </p>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl bg-brand-dark text-white shadow-lg flex flex-col justify-end min-h-[400px]">
                  <img 
                    src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1000" 
                    alt="Coctelería" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700"
                  />
                  <div className="relative p-10 z-10">
                    <Wine className="w-12 h-12 mb-4 text-brand-beige" />
                    <h3 className="text-3xl font-serif font-bold mb-3">Coctelería de Autor</h3>
                    <p className="font-light text-brand-beige/90 max-w-md text-lg">
                      Barras libres premium, mixología personalizada y barras de cafés/postres para endulzar la noche.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Servicios Complementarios */}
          {activeTab === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: Truck, title: 'Flete y Logística', desc: 'Transporte seguro de mobiliario y montaje.' },
                  { icon: Music, title: 'Sonido e Iluminación', desc: 'DJ, bandas en vivo y pistas de baile iluminadas.' },
                  { icon: Flower2, title: 'Altares y Ceremonias', desc: 'Estructuras y gazebos para ceremonias civiles/religiosas.' },
                  { icon: Utensils, title: 'Cristalería Fina', desc: 'Alquiler de vajillas, copas y plaqué de lujo.' },
                ].map((service, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-8 border border-brand-dark/10 rounded-2xl bg-white hover:border-brand-accent/50 hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-brand-beige flex items-center justify-center mb-6 text-brand-dark">
                      <service.icon size={28} />
                    </div>
                    <h4 className="font-serif text-lg font-semibold mb-2">{service.title}</h4>
                    <p className="text-sm font-light text-brand-dark/60">{service.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default ServicesTabs;
