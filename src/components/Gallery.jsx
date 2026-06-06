import { useState } from 'react';

const events = [
  { id: 1, type: 'Boda Elegante', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800' },
  // { id: 2, type: 'Cena de Gala', image: 'https://images.unsplash.com/photo-1530103862676-de8892bf30ef?auto=format&fit=crop&q=80&w=800' },
  { id: 3, type: 'Cumpleaños', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800' },
  { id: 4, type: 'Evento Corporativo', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800' },
];

const Gallery = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-brand-dark mb-4">Eventos Anteriores</h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto mb-6"></div>
          <p className="text-brand-dark/70 max-w-2xl mx-auto">
            Explora algunos de los momentos mágicos que hemos ayudado a crear. Cada detalle pensado para reflejar la personalidad de nuestros clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((evt) => (
            <div 
              key={evt.id} 
              className="group relative overflow-hidden rounded-xl aspect-[4/5] cursor-pointer shadow-md hover:shadow-xl transition-all duration-500"
            >
              <img 
                src={evt.image} 
                alt={evt.type} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                <div className="p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white font-medium text-lg font-serif">{evt.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
