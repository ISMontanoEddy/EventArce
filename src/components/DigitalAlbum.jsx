import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  MessageCircle, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight,
  FolderOpen,
  Layers,
  CheckCircle2
} from 'lucide-react';

// Metadatos y portadas de los Sub-Álbumes
export const SUB_ALBUMS = [
  {
    slug: 'mesas',
    nombre: 'Mesas',
    subtitulo: 'Imperiales, redondas y de cóctel',
    descripcion: 'Mesas de roble rústico para banquetes campestres, redondas con espejo para salones de gala y mesas cóctel de mármol.',
    portada: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    destacado: '10 a 12 comensales'
  },
  {
    slug: 'sillas',
    nombre: 'Sillas',
    subtitulo: 'Tiffany, Crossback y Ghost',
    descripcion: 'La colección más solicitada de Cochabamba: Tiffany doradas, madera natural estilo campestre y acrílico minimalista.',
    portada: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
    destacado: 'Estructuras reforzadas'
  },
  {
    slug: 'decoraciones',
    nombre: 'Decoraciones',
    subtitulo: 'Candelabros, luces y complementos',
    descripcion: 'Iluminación cálida con candelabros de forja, lámparas de fibras naturales y detalles escénicos para una atmósfera mágica.',
    portada: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
    destacado: 'Iluminación escénica'
  },
  {
    slug: 'altares',
    nombre: 'Altares',
    subtitulo: 'Arcos ceremoniales y gazebos',
    descripcion: 'Estructuras dobles circulares doradas y pérgolas con velos de gasa para votos matrimoniales y ceremonias civiles.',
    portada: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    destacado: 'Bodas en jardines'
  },
  {
    slug: 'vajilla',
    nombre: 'Vajilla',
    subtitulo: 'Cristalería fina y porcelana de gala',
    descripcion: 'Copas labradas con reflejos ámbar, vajillas de porcelana con filo dorado y plaqué elegante para mesas protocolares.',
    portada: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    destacado: 'Servicio gourmet'
  },
  {
    slug: 'manteles',
    nombre: 'Manteles',
    subtitulo: 'Lino crudo y terciopelo de lujo',
    descripcion: 'Caída impecable y textura natural en lino rústico y terciopelo verde esmeralda para montajes con personalidad.',
    portada: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
    destacado: 'Textiles importados'
  }
];

const DigitalAlbum = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data desde catalogo.json
  useEffect(() => {
    fetch('/catalogo.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error cargando catalogo.json:', err);
        setError('No se pudo cargar el catálogo de productos.');
        setLoading(false);
      });
  }, []);

  // Determinar sub-álbum actual según el parámetro de ruta
  const currentSubAlbum = useMemo(() => {
    if (!categorySlug) return null;
    const lower = categorySlug.toLowerCase();
    if (lower === 'todas' || lower === 'todo') {
      return {
        slug: 'todas',
        nombre: 'Todas las Colecciones',
        subtitulo: 'Catálogo Integral de Mobiliario',
        descripcion: 'Explora el inventario completo de mobiliario, vajilla, altares y decoración para eventos en Cochabamba.',
        portada: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
      };
    }
    return SUB_ALBUMS.find((sub) => sub.slug === lower) || null;
  }, [categorySlug]);

  // Filtrar ítems pertenecientes al sub-álbum activo
  const subAlbumItems = useMemo(() => {
    if (!currentSubAlbum) return [];
    if (currentSubAlbum.slug === 'todas') return items;
    return items.filter(
      (it) => it.categoria.toLowerCase() === currentSubAlbum.nombre.toLowerCase()
    );
  }, [currentSubAlbum, items]);

  // Conteo de ítems por categoría
  const categoryCounts = useMemo(() => {
    const counts = {};
    items.forEach((it) => {
      const cat = it.categoria.toLowerCase();
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [items]);

  // Handlers del Lightbox
  const handleOpenLightbox = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseLightbox = useCallback(() => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  }, []);

  const handleNext = useCallback(() => {
    if (!selectedItem || subAlbumItems.length === 0) return;
    const currentIndex = subAlbumItems.findIndex((it) => it.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % subAlbumItems.length;
    setSelectedItem(subAlbumItems[nextIndex]);
  }, [selectedItem, subAlbumItems]);

  const handlePrev = useCallback(() => {
    if (!selectedItem || subAlbumItems.length === 0) return;
    const currentIndex = subAlbumItems.findIndex((it) => it.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + subAlbumItems.length) % subAlbumItems.length;
    setSelectedItem(subAlbumItems[prevIndex]);
  }, [selectedItem, subAlbumItems]);

  // Atajos de teclado para Smart TV / PC (ESC y Flechas)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedItem) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, handleCloseLightbox, handleNext, handlePrev]);

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 transition-colors">
      <div className="max-w-7xl 2xl:max-w-[1700px] mx-auto">

        {/* Estado de carga */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-28 space-y-4">
            <div className="w-12 h-12 border-4 border-brand-accent/25 border-t-brand-accent rounded-full animate-spin"></div>
            <p className="text-brand-dark/70 font-medium">Cargando Álbum Digital...</p>
          </div>
        )}

        {/* Estado de error */}
        {error && (
          <div className="text-center py-16 bg-white rounded-3xl p-8 border border-red-200 max-w-lg mx-auto shadow-sm">
            <p className="text-red-600 font-medium mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-brand-dark text-white rounded-full text-sm hover:bg-brand-accent transition-colors"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* ====================================================================
            VISTA 1: CUADRÍCULA DE SUB-ÁLBUMES (Cuando no hay categorySlug)
            ==================================================================== */}
        {!loading && !error && !currentSubAlbum && (
          <div>
            {/* Header de la Galería de Sub-Álbumes */}
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/15 text-brand-dark text-xs sm:text-sm font-medium uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
                Catálogo Fotográfico Exclusivo
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-brand-dark mb-4 tracking-tight">
                Álbumes de Mobiliario & Ambientación
              </h1>
              <div className="w-24 h-1 bg-brand-accent mx-auto mb-6"></div>
              <p className="text-brand-dark/75 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed">
                Selecciona una categoría para abrir su sub-álbum correspondiente y explorar cada pieza disponible para tu evento en Cochabamba.
              </p>
            </div>

            {/* Cuadrícula Estilo Grid de Sub-Álbumes con imagen de portada */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {SUB_ALBUMS.map((sub) => {
                const count = categoryCounts[sub.nombre.toLowerCase()] || 0;

                return (
                  <div
                    key={sub.slug}
                    onClick={() => navigate(`/album-digital/${sub.slug}`)}
                    className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl border border-black/5 transition-all duration-500 cursor-pointer flex flex-col transform hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                    tabIndex={0}
                    role="button"
                    aria-label={`Abrir sub-álbum de ${sub.nombre}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        navigate(`/album-digital/${sub.slug}`);
                      }
                    }}
                  >
                    {/* Imagen de Portada del Sub-Álbum */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                      <img
                        src={sub.portada}
                        alt={`Sub-álbum de ${sub.nombre}`}
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                      />

                      {/* Gradiente oscuro elegante */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

                      {/* Badge con el conteo de piezas */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold tracking-wide border border-white/20">
                          <FolderOpen className="w-3.5 h-3.5 text-brand-accent" />
                          {count} {count === 1 ? 'pieza' : 'piezas'}
                        </span>
                      </div>

                      {/* Destacado */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full bg-brand-accent text-brand-dark text-[11px] font-bold uppercase tracking-wider shadow">
                          {sub.destacado}
                        </span>
                      </div>

                      {/* Título sobre la portada */}
                      <div className="absolute bottom-4 left-5 right-5 text-white">
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-1 group-hover:text-brand-accent transition-colors">
                          {sub.nombre}
                        </h2>
                        <p className="text-xs sm:text-sm text-stone-300 font-light line-clamp-1">
                          {sub.subtitulo}
                        </p>
                      </div>
                    </div>

                    {/* Descripción y Botón de Entrada */}
                    <div className="p-6 flex flex-col justify-between flex-grow bg-white">
                      <p className="text-sm text-brand-dark/70 font-light leading-relaxed mb-6 line-clamp-2">
                        {sub.descripcion}
                      </p>

                      <div className="pt-4 border-t border-black/5 flex items-center justify-between text-brand-dark font-medium text-sm group-hover:text-brand-accent transition-colors">
                        <span className="flex items-center gap-1.5 font-semibold">
                          Explorar Sub-Álbum
                        </span>
                        <div className="w-8 h-8 rounded-full bg-brand-beige flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white transition-all">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Banner Especial para "Ver Todo el Catálogo" */}
            <div className="relative rounded-3xl overflow-hidden bg-brand-dark text-white p-8 sm:p-12 shadow-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="relative z-10 max-w-2xl text-center md:text-left">
                <span className="text-brand-accent text-xs uppercase tracking-widest font-semibold block mb-2">
                  Vista Completa
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif font-bold mb-3">
                  ¿Deseas ver todo el catálogo en una sola galería?
                </h3>
                <p className="text-stone-300 font-light text-sm sm:text-base">
                  Revisa los {items.length} productos organizados con filtros en tiempo real y visor a pantalla completa para presentaciones en Smart TV o tablets.
                </p>
              </div>

              <div className="relative z-10 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => navigate('/album-digital/todas')}
                  className="inline-flex items-center gap-2 bg-brand-accent hover:bg-white text-brand-dark px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-brand-accent/30 cursor-pointer"
                >
                  <Layers className="w-5 h-5" />
                  Ver Todas las Colecciones ({items.length})
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ====================================================================
            VISTA 2: DENTRO DEL SUB-ÁLBUM SELECCIONADO (Con su cuadrícula e imágenes)
            ==================================================================== */}
        {!loading && !error && currentSubAlbum && (
          <div>
            {/* Barra de Navegación del Sub-Álbum (Breadcrumbs y Volver) */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-black/5 pb-6">
              
              {/* Botón Volver a la Cuadrícula de Sub-Álbumes */}
              <button
                type="button"
                onClick={() => navigate('/album-digital')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-brand-dark text-brand-dark hover:text-white border border-black/10 transition-all duration-300 shadow-xs font-medium text-sm group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-brand-accent group-hover:-translate-x-1 transition-transform" />
                <span>Volver a Álbumes</span>
              </button>

              {/* Breadcrumb sutil */}
              <nav aria-label="Migas de pan" className="text-xs sm:text-sm text-brand-dark/60 font-light">
                <Link to="/" className="hover:text-brand-dark underline">Inicio</Link>
                <span className="mx-2 text-brand-accent">/</span>
                <Link to="/album-digital" className="hover:text-brand-dark underline">Álbum Digital</Link>
                <span className="mx-2 text-brand-accent">/</span>
                <span className="text-brand-dark font-medium">{currentSubAlbum.nombre}</span>
              </nav>
            </div>

            {/* Encabezado del Sub-Álbum */}
            <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-brand-accent/20 text-brand-dark text-xs font-semibold uppercase tracking-wider mb-2">
                  Sub-Álbum Seleccionado
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-dark leading-tight">
                  {currentSubAlbum.nombre}
                </h1>
                <p className="text-brand-dark/70 text-sm sm:text-base font-light mt-2 max-w-2xl">
                  {currentSubAlbum.descripcion}
                </p>
              </div>

              <div className="text-sm text-brand-dark/60 bg-white px-4 py-2 rounded-xl border border-black/5 self-center sm:self-auto shrink-0 shadow-xs">
                Mostrando <strong className="text-brand-dark font-bold">{subAlbumItems.length}</strong> piezas
              </div>
            </div>

            {/* Selector Rápido de Sub-Álbumes (Píldoras para cambiar de álbum sin retroceder) */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10">
              <span className="text-xs uppercase tracking-wider text-brand-dark/50 font-semibold mr-1 shrink-0">
                Cambiar de álbum:
              </span>

              {/* Botón Todas */}
              <button
                type="button"
                onClick={() => navigate('/album-digital/todas')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all shrink-0 border ${
                  currentSubAlbum.slug === 'todas'
                    ? 'bg-brand-dark text-white border-brand-dark shadow-sm'
                    : 'bg-white text-brand-dark/70 hover:bg-brand-beige border-black/10'
                }`}
              >
                Todas ({items.length})
              </button>

              {/* Cada Sub-Álbum */}
              {SUB_ALBUMS.map((sub) => {
                const isActive = currentSubAlbum.slug === sub.slug;
                const count = categoryCounts[sub.nombre.toLowerCase()] || 0;

                return (
                  <button
                    key={sub.slug}
                    type="button"
                    onClick={() => navigate(`/album-digital/${sub.slug}`)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all shrink-0 border ${
                      isActive
                        ? 'bg-brand-dark text-white border-brand-dark shadow-sm scale-105'
                        : 'bg-white text-brand-dark/70 hover:bg-brand-beige border-black/10'
                    }`}
                  >
                    {sub.nombre} ({count})
                  </button>
                );
              })}
            </div>

            {/* Cuadrícula Dinámica del Sub-Álbum (1-2 móvil, 3 tablets, 4-5 grandes/TV) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5 sm:gap-6 lg:gap-7">
              {subAlbumItems.map((item) => (
                <article
                  key={item.id}
                  onClick={() => handleOpenLightbox(item)}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-black/5 flex flex-col transform hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  tabIndex={0}
                  role="button"
                  aria-label={`Ver detalle de ${item.nombre}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenLightbox(item);
                    }
                  }}
                >
                  {/* Imagen del Ítem con loading="lazy" */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Overlay al hacer hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="flex items-center gap-2 bg-white/95 backdrop-blur-md text-brand-dark font-medium text-xs sm:text-sm px-4 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="w-4 h-4 text-brand-accent" />
                        Ver en pantalla completa
                      </span>
                    </div>

                    <span className="absolute top-3 left-3 bg-brand-dark/85 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                      {item.categoria}
                    </span>
                  </div>

                  {/* Detalle del Producto */}
                  <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-white">
                    <div>
                      <h3 className="font-serif font-bold text-lg text-brand-dark mb-1.5 line-clamp-1 group-hover:text-brand-accent transition-colors">
                        {item.nombre}
                      </h3>
                      <p className="text-xs sm:text-sm text-brand-dark/70 font-light line-clamp-2 leading-relaxed">
                        {item.descripcion}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs text-brand-dark/60">
                      <span className="font-medium text-brand-accent">Eventos Arze</span>
                      <span className="group-hover:underline">Detalles &rarr;</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {subAlbumItems.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-stone-300">
                <p className="text-lg font-serif text-brand-dark/80">No hay piezas registradas en este sub-álbum.</p>
                <button
                  type="button"
                  onClick={() => navigate('/album-digital')}
                  className="mt-4 text-sm text-brand-accent underline font-medium cursor-pointer"
                >
                  Volver a todos los álbumes
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ====================================================================
          VISOR LIGHTBOX FULLSCREEN (Optimizado para Móviles y Smart TV)
          ==================================================================== */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-300"
          onClick={handleCloseLightbox}
        >
          {/* Botón Cerrar */}
          <button
            type="button"
            onClick={handleCloseLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-lg border border-white/20 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-accent"
            aria-label="Cerrar visor"
          >
            <X className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Flecha Anterior */}
          {subAlbumItems.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-brand-accent text-white backdrop-blur-md border border-white/15 transition-all duration-200 cursor-pointer"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}

          {/* Flecha Siguiente */}
          {subAlbumItems.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-brand-accent text-white backdrop-blur-md border border-white/15 transition-all duration-200 cursor-pointer"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          )}

          {/* Diálogo del Lightbox */}
          <div
            className="relative max-w-6xl w-full max-h-[92vh] bg-stone-900/95 border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row text-white animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagen Full en Alta Calidad */}
            <div className="flex-1 bg-black flex items-center justify-center min-h-[300px] sm:min-h-[420px] max-h-[55vh] lg:max-h-[85vh] relative overflow-hidden">
              <img
                src={selectedItem.imagen}
                alt={selectedItem.nombre}
                className="w-full h-full object-contain select-none"
              />
            </div>

            {/* Ficha Informativa del Ítem */}
            <div className="w-full lg:w-[420px] xl:w-[460px] p-6 sm:p-8 flex flex-col justify-between bg-stone-950/90 backdrop-blur-lg border-t lg:border-t-0 lg:border-l border-white/10 overflow-y-auto max-h-[40vh] lg:max-h-[85vh]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-brand-accent text-brand-dark text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    {selectedItem.categoria}
                  </span>
                  <span className="text-white/40 text-xs tracking-wider uppercase font-mono">
                    ID #{selectedItem.id.toString().padStart(3, '0')}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4 leading-tight">
                  {selectedItem.nombre}
                </h3>

                <p className="text-stone-300 font-light text-sm sm:text-base leading-relaxed mb-6">
                  {selectedItem.descripcion}
                </p>

                {selectedItem.detalles && (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                    <p className="text-xs uppercase tracking-wider text-brand-accent font-semibold mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" />
                      Ficha Técnica & Recomendaciones
                    </p>
                    <p className="text-xs sm:text-sm text-stone-300 font-light">
                      {selectedItem.detalles}
                    </p>
                  </div>
                )}
              </div>

              {/* Botón WhatsApp */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <a
                  href={`https://wa.me/59168465444?text=${encodeURIComponent(
                    `Hola Eventos Arze, me interesa cotizar para mi evento en Cochabamba: ${selectedItem.nombre} (${selectedItem.categoria}). ¿Tienen disponibilidad?`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 px-6 rounded-xl font-medium text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-[#25D366]/30 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  Consultar Disponibilidad por WhatsApp
                </a>

                <p className="text-[11px] text-center text-white/40">
                  Usa el control remoto o teclas de dirección para navegar entre fotos
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default DigitalAlbum;
