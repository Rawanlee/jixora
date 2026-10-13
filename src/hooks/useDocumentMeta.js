import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { metaFor } from '../lib/routes-meta.js'

/** Keeps <title>, description and canonical in sync during client-side navigation. */
export function useDocumentMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = metaFor(pathname)
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', meta.canonical)
  }, [pathname])
}
