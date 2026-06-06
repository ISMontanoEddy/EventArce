import Hero from './components/Hero'
import Gallery from './components/Gallery'
import ServicesTabs from './components/ServicesTabs'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-dark bg-brand-light">
      <Hero />
      <Gallery />
      <ServicesTabs />
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

export default App
