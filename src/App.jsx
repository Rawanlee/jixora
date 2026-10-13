import { Routes, Route } from 'react-router'
import { Header } from './components/layout/Header.jsx'
import { Footer } from './components/layout/Footer.jsx'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'
import { useReveal } from './hooks/useReveal.js'
import { useScrollManager } from './hooks/useScrollManager.js'
import { useDocumentMeta } from './hooks/useDocumentMeta.js'
import Home from './pages/Home.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  useScrollManager()
  useReveal()
  useDocumentMeta()
  return (
    <>
      <Header />
      <main id="main">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  )
}
