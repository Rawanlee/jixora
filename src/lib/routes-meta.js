import { SITE_URL, company } from '../data/site.js'

// Per-route SEO metadata. Used by the prerenderer (static <head>) and by the
// client (document.title on navigation).
export const routesMeta = {
  '/': {
    title: 'JiXora — AI 90-day programs and member check-ins for fitness businesses',
    description:
      'JiXora helps coaches, gyms and wellness programs deliver personalised 90-day training plans, automate member check-ins and spot drop-off risk early. Request early access.',
  },
  '/privacy': {
    title: 'Privacy Policy — JiXora',
    description: 'How JiXora collects, uses, stores and protects personal information on jixora.space and in the JiXora platform.',
  },
  '/terms': {
    title: 'Terms of Service — JiXora',
    description: 'The terms that govern access to and use of the JiXora website and platform.',
  },
  '/404': {
    title: 'Page not found — JiXora',
    description: 'The page you were looking for does not exist on jixora.space.',
    noindex: true,
  },
}

export function metaFor(pathname) {
  const meta = routesMeta[pathname] ?? routesMeta['/404']
  const path = routesMeta[pathname] ? pathname : '/404'
  return {
    ...meta,
    canonical: path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`,
    image: `${SITE_URL}/brand/og-image.png`,
    siteName: company.name,
  }
}
