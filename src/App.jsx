import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AlbumPage from './pages/AlbumPage';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans text-brand-dark bg-brand-light">
        <Routes>
          {/* Ruta Principal / Inicio */}
          <Route path="/" element={<Home />} />

          {/* Rutas dedicadas para el Álbum Digital y sus Sub-Álbumes */}
          <Route path="/album-digital" element={<AlbumPage />} />
          <Route path="/album-digital/:categorySlug" element={<AlbumPage />} />
          <Route path="/album" element={<AlbumPage />} />
          <Route path="/album/:categorySlug" element={<AlbumPage />} />

          {/* Redirección por defecto ante rutas desconocidas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Botón flotante de WhatsApp accesible en todas las vistas */}
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  );
}

export default App;
