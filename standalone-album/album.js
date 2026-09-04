/**
 * ÁLBUM DIGITAL - EVENTOS ARZE (COCHABAMBA, BOLIVIA)
 * Lógica en JavaScript puro (Vanilla JS)
 * - Vista 1: Cuadrícula interactiva de Sub-Álbumes (Mesas, Sillas, Vajilla, etc.) con portadas
 * - Vista 2: Galería del Sub-Álbum seleccionado con filtro rápido y cuadrícula CSS Grid
 * - Visor Lightbox a pantalla completa con navegación por teclado y WhatsApp
 */

(function () {
  'use strict';

  const CATALOG_URL = 'catalogo.json';
  const WHATSAPP_PHONE = '59168465444';

  const SUB_ALBUMS = [
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

  let catalogItems = [];
  let currentSubAlbum = null; // null = vista de álbumes
  let currentFilteredItems = [];
  let currentLightboxIndex = -1;

  // DOM Elements
  const loader = document.getElementById('catalog-loader');
  const subalbumsView = document.getElementById('subalbums-view');
  const subalbumDetailView = document.getElementById('subalbum-detail-view');
  const subalbumsGrid = document.getElementById('subalbums-grid');
  const catalogGrid = document.getElementById('catalog-grid');
  const filtersContainer = document.getElementById('filters-container');
  const btnBackToAlbums = document.getElementById('btn-back-to-albums');
  const btnViewAll = document.getElementById('btn-view-all');

  const subalbumTitle = document.getElementById('subalbum-title');
  const subalbumDesc = document.getElementById('subalbum-desc');
  const subalbumCounter = document.getElementById('subalbum-counter');
  const breadcrumbText = document.getElementById('breadcrumb-text');

  // Lightbox DOM Elements
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxCloseBtn = document.getElementById('lightbox-close');
  const lightboxPrevBtn = document.getElementById('lightbox-prev');
  const lightboxNextBtn = document.getElementById('lightbox-next');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTag = document.getElementById('lightbox-tag');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxDetails = document.getElementById('lightbox-details');
  const lightboxDetailsText = document.getElementById('lightbox-details-text');
  const lightboxWhatsappBtn = document.getElementById('lightbox-whatsapp');

  async function init() {
    try {
      loader.style.display = 'block';
      const res = await fetch(CATALOG_URL);
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      catalogItems = await res.json();

      renderSubAlbumsGrid();
      setupEventListeners();
      showSubAlbumsView();
    } catch (err) {
      console.error(err);
      loader.innerHTML = '<p style="color:red">Error al cargar catalogo.json</p>';
    } finally {
      loader.style.display = 'none';
    }
  }

  // Renderizar la cuadrícula de Sub-Álbumes (con portadas, títulos y contadores)
  function renderSubAlbumsGrid() {
    subalbumsGrid.innerHTML = '';
    const fragment = document.createDocumentFragment();

    SUB_ALBUMS.forEach((sub) => {
      const count = catalogItems.filter(
        (it) => it.categoria.toLowerCase() === sub.nombre.toLowerCase()
      ).length;

      const card = document.createElement('article');
      card.className = 'subalbum-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Abrir sub-álbum ${sub.nombre}`);

      card.innerHTML = `
        <div class="subalbum-media">
          <img src="${sub.portada}" alt="${escapeHtml(sub.nombre)}" loading="lazy" />
          <div class="subalbum-overlay">
            <div class="subalbum-top-tags">
              <span class="subalbum-count">📁 ${count} piezas</span>
              <span class="subalbum-badge-tag">${escapeHtml(sub.destacado)}</span>
            </div>
            <div class="subalbum-header-text">
              <h3>${escapeHtml(sub.nombre)}</h3>
              <p>${escapeHtml(sub.subtitulo)}</p>
            </div>
          </div>
        </div>
        <div class="subalbum-body">
          <p>${escapeHtml(sub.descripcion)}</p>
          <div class="subalbum-action">
            <span>Explorar Sub-Álbum</span>
            <span class="action-arrow">&rarr;</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => openSubAlbum(sub));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openSubAlbum(sub);
        }
      });

      fragment.appendChild(card);
    });

    subalbumsGrid.appendChild(fragment);
  }

  // Abrir vista del Sub-Álbum seleccionado
  function openSubAlbum(sub) {
    currentSubAlbum = sub;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    subalbumsView.style.display = 'none';
    subalbumDetailView.style.display = 'block';

    if (sub.slug === 'todas') {
      currentFilteredItems = [...catalogItems];
      subalbumTitle.textContent = 'Todas las Colecciones';
      subalbumDesc.textContent = 'Catálogo completo de mobiliario, vajilla, altares y decoración.';
      breadcrumbText.innerHTML = 'Álbum Digital / <span>Todas</span>';
    } else {
      currentFilteredItems = catalogItems.filter(
        (it) => it.categoria.toLowerCase() === sub.nombre.toLowerCase()
      );
      subalbumTitle.textContent = `Sub-Álbum: ${sub.nombre}`;
      subalbumDesc.textContent = sub.descripcion;
      breadcrumbText.innerHTML = `Álbum Digital / <span>${escapeHtml(sub.nombre)}</span>`;
    }

    subalbumCounter.textContent = `${currentFilteredItems.length} piezas`;

    renderSubAlbumPills();
    renderProductsGrid();
  }

  // Volver a la cuadrícula de Sub-Álbumes
  function showSubAlbumsView() {
    currentSubAlbum = null;
    subalbumDetailView.style.display = 'none';
    subalbumsView.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Renderizar las píldoras de navegación rápida entre sub-álbumes
  function renderSubAlbumPills() {
    filtersContainer.innerHTML = '';

    // Píldora Todas
    const btnAll = document.createElement('button');
    btnAll.className = `filter-btn ${currentSubAlbum?.slug === 'todas' ? 'active' : ''}`;
    btnAll.textContent = `Todas (${catalogItems.length})`;
    btnAll.addEventListener('click', () => {
      openSubAlbum({
        slug: 'todas',
        nombre: 'Todas las Colecciones',
        descripcion: 'Catálogo completo de eventos.'
      });
    });
    filtersContainer.appendChild(btnAll);

    // Píldora por cada sub-álbum
    SUB_ALBUMS.forEach((sub) => {
      const count = catalogItems.filter(
        (it) => it.categoria.toLowerCase() === sub.nombre.toLowerCase()
      ).length;

      const btn = document.createElement('button');
      btn.className = `filter-btn ${currentSubAlbum?.slug === sub.slug ? 'active' : ''}`;
      btn.textContent = `${sub.nombre} (${count})`;
      btn.addEventListener('click', () => openSubAlbum(sub));
      filtersContainer.appendChild(btn);
    });
  }

  // Renderizar cuadrícula de productos
  function renderProductsGrid() {
    catalogGrid.innerHTML = '';

    if (currentFilteredItems.length === 0) {
      catalogGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; background: #fff; border-radius: 16px;">
          <p style="font-family: var(--font-serif); font-size: 1.25rem;">No hay productos en esta categoría.</p>
        </div>
      `;
      return;
    }

    const fragment = document.createDocumentFragment();

    currentFilteredItems.forEach((item, index) => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Ver ${item.nombre}`);

      card.innerHTML = `
        <div class="card-media">
          <img src="${item.imagen}" alt="${escapeHtml(item.nombre)}" loading="lazy" />
          <div class="card-overlay">
            <span class="overlay-action">🔍 Ver en pantalla completa</span>
          </div>
          <span class="card-tag">${escapeHtml(item.categoria)}</span>
        </div>
        <div class="card-content">
          <div>
            <h4 class="card-title">${escapeHtml(item.nombre)}</h4>
            <p class="card-desc">${escapeHtml(item.descripcion)}</p>
          </div>
          <div class="card-footer">
            <span>Eventos Arze</span>
            <span>Detalles &rarr;</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => openLightbox(index));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });

      fragment.appendChild(card);
    });

    catalogGrid.appendChild(fragment);
  }

  // Lightbox
  function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightbox();
    lightboxModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const item = currentFilteredItems[currentLightboxIndex];
    if (!item) return;

    lightboxImg.src = item.imagen;
    lightboxImg.alt = item.nombre;
    lightboxTag.textContent = item.categoria;
    lightboxTitle.textContent = item.nombre;
    lightboxDesc.textContent = item.descripcion;

    if (item.detalles) {
      lightboxDetails.style.display = 'block';
      lightboxDetailsText.textContent = item.detalles;
    } else {
      lightboxDetails.style.display = 'none';
    }

    const msg = encodeURIComponent(
      `Hola Eventos Arze, me interesa cotizar: ${item.nombre} (${item.categoria}) para mi evento en Cochabamba.`
    );
    lightboxWhatsappBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${msg}`;
  }

  function prevImage() {
    if (currentFilteredItems.length <= 1) return;
    currentLightboxIndex =
      (currentLightboxIndex - 1 + currentFilteredItems.length) % currentFilteredItems.length;
    updateLightbox();
  }

  function nextImage() {
    if (currentFilteredItems.length <= 1) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % currentFilteredItems.length;
    updateLightbox();
  }

  function setupEventListeners() {
    btnBackToAlbums.addEventListener('click', showSubAlbumsView);
    btnViewAll.addEventListener('click', () => {
      openSubAlbum({
        slug: 'todas',
        nombre: 'Todas las Colecciones',
        descripcion: 'Catálogo completo de eventos.'
      });
    });

    lightboxCloseBtn.addEventListener('click', closeLightbox);
    lightboxPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevImage();
    });
    lightboxNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextImage();
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    window.addEventListener('keydown', (e) => {
      if (!lightboxModal.classList.contains('is-active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
