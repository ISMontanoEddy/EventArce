import { useState } from 'react';

const TableCustomizer = () => {
  const [shape, setShape] = useState('round'); // 'round' | 'rectangular'
  const [color, setColor] = useState('#ffffff');
  const [pattern, setPattern] = useState('none'); // 'none' | 'stripes' | 'dots'

  const colors = [
    { name: 'Blanco Clásico', hex: '#ffffff' },
    { name: 'Beige Arena', hex: '#f5f5dc' },
    { name: 'Negro Elegante', hex: '#1a1a1a' },
    { name: 'Azul Marino', hex: '#000080' },
    { name: 'Rojo Vino', hex: '#722F37' },
  ];

  return (
    <div className="bg-brand-beige/30 rounded-2xl p-8 border border-brand-dark/5">
      <h3 className="font-serif text-2xl font-bold text-brand-dark mb-6 text-center">Personalizador de Mesas</h3>
      
      <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
        
        {/* Controles */}
        <div className="flex-1 space-y-8 w-full max-w-sm">
          {/* Forma */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-dark/60 mb-3">Forma de la Mesa</h4>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShape('round')}
                className={`flex-1 py-3 px-4 rounded-xl border transition-all ${shape === 'round' ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-brand-dark border-brand-dark/10 hover:border-brand-dark/30'}`}
              >
                Redonda
              </button>
              <button 
                onClick={() => setShape('rectangular')}
                className={`flex-1 py-3 px-4 rounded-xl border transition-all ${shape === 'rectangular' ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-brand-dark border-brand-dark/10 hover:border-brand-dark/30'}`}
              >
                Rectangular
              </button>
            </div>
          </div>

          {/* Color */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-dark/60 mb-3">Color del Mantel</h4>
            <div className="flex flex-wrap gap-3">
              {colors.map(c => (
                <button
                  key={c.hex}
                  onClick={() => setColor(c.hex)}
                  className={`w-10 h-10 rounded-full border-2 transition-transform ${color === c.hex ? 'border-brand-accent scale-110' : 'border-transparent hover:scale-105 shadow-sm'}`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Patrón */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-dark/60 mb-3">Patrón</h4>
            <div className="flex space-x-4 text-sm">
              <button 
                onClick={() => setPattern('none')}
                className={`flex-1 py-2 rounded-lg border transition-all ${pattern === 'none' ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-brand-dark border-brand-dark/10'}`}
              >
                Liso
              </button>
              <button 
                onClick={() => setPattern('stripes')}
                className={`flex-1 py-2 rounded-lg border transition-all ${pattern === 'stripes' ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-brand-dark border-brand-dark/10'}`}
              >
                Rayas
              </button>
              <button 
                onClick={() => setPattern('dots')}
                className={`flex-1 py-2 rounded-lg border transition-all ${pattern === 'dots' ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-brand-dark border-brand-dark/10'}`}
              >
                Puntos
              </button>
            </div>
          </div>
        </div>

        {/* Vista Previa Visual */}
        <div className="flex-1 w-full max-w-sm flex items-center justify-center p-8 bg-white rounded-2xl shadow-inner min-h-[300px]">
          <div className="relative flex items-center justify-center w-full h-full">
            {/* SVG Generado Dinámicamente */}
            <svg 
              width="200" 
              height="200" 
              viewBox="0 0 200 200" 
              className="drop-shadow-xl transition-all duration-500 ease-in-out"
            >
              <defs>
                <pattern id="stripes" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
                  <line x1="0" y="0" x2="0" y2="10" stroke="#000000" strokeWidth="2" strokeOpacity="0.1" />
                </pattern>
                <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="#000000" fillOpacity="0.1" />
                </pattern>
              </defs>
              
              {shape === 'round' ? (
                <g>
                  {/* Sombra de la mesa */}
                  <ellipse cx="100" cy="160" rx="70" ry="15" fill="rgba(0,0,0,0.1)" />
                  {/* Base de la mesa */}
                  <rect x="90" y="100" width="20" height="60" fill="#8B4513" rx="2" />
                  <rect x="60" y="150" width="80" height="10" fill="#8B4513" rx="5" />
                  {/* Mantel Redondo */}
                  <ellipse 
                    cx="100" 
                    cy="80" 
                    rx="80" 
                    ry="40" 
                    fill={color} 
                    stroke="rgba(0,0,0,0.05)" 
                    strokeWidth="1"
                    className="transition-all duration-300"
                  />
                  {/* Patrón */}
                  {pattern !== 'none' && (
                    <ellipse 
                      cx="100" 
                      cy="80" 
                      rx="80" 
                      ry="40" 
                      fill={`url(#${pattern})`}
                    />
                  )}
                  {/* Caída del mantel */}
                  <path 
                    d="M 20 80 Q 20 120 100 120 Q 180 120 180 80 L 180 90 Q 180 130 100 130 Q 20 130 20 90 Z" 
                    fill={color} 
                    opacity="0.9"
                    className="transition-all duration-300"
                  />
                   {pattern !== 'none' && (
                     <path 
                     d="M 20 80 Q 20 120 100 120 Q 180 120 180 80 L 180 90 Q 180 130 100 130 Q 20 130 20 90 Z" 
                     fill={`url(#${pattern})`}
                     opacity="0.9"
                   />
                   )}
                </g>
              ) : (
                <g>
                   {/* Sombra de la mesa */}
                   <ellipse cx="100" cy="160" rx="80" ry="15" fill="rgba(0,0,0,0.1)" />
                   {/* Patas rectangulares */}
                   <rect x="40" y="100" width="10" height="60" fill="#8B4513" rx="2" />
                   <rect x="150" y="100" width="10" height="60" fill="#8B4513" rx="2" />
                   {/* Mantel Rectangular */}
                   <polygon 
                    points="30,60 170,60 190,90 10,90" 
                    fill={color} 
                    stroke="rgba(0,0,0,0.05)" 
                    strokeWidth="1"
                    className="transition-all duration-300"
                   />
                   {pattern !== 'none' && (
                     <polygon 
                     points="30,60 170,60 190,90 10,90" 
                     fill={`url(#${pattern})`}
                    />
                   )}
                   {/* Caída frontal del mantel */}
                   <rect 
                    x="10" 
                    y="90" 
                    width="180" 
                    height="40" 
                    fill={color} 
                    opacity="0.95"
                    className="transition-all duration-300"
                   />
                   {pattern !== 'none' && (
                     <rect 
                     x="10" 
                     y="90" 
                     width="180" 
                     height="40" 
                     fill={`url(#${pattern})`}
                     opacity="0.95"
                    />
                   )}
                </g>
              )}
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TableCustomizer;
