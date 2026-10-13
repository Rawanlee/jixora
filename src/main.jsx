import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import '@fontsource-variable/inter'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'
import './styles/index.css'
import App from './App.jsx'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Production pages are prerendered (see scripts/prerender.js) and hydrated;
// the dev server serves an empty shell and renders on the client.
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
