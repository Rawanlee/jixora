import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.jsx'

export { metaFor, routesMeta } from './lib/routes-meta.js'
export { company, team, SITE_URL } from './data/site.js'
export { awsServices } from './data/content.js'

export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
