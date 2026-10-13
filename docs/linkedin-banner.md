# LinkedIn Banner — 1584 × 396 px

**Artwork:** `docs/linkedin/jixora-linkedin-banner-1584x396.png`
**Editable source:** `brand-src/linkedin-banner.svg` (re-render with `npm run brand:render`)

## Layout

| Zone | x-range (px) | Content |
| --- | --- | --- |
| Left safe zone | 0 – 400 | Intentionally empty. On company pages LinkedIn overlays the logo at the bottom left, and the area is cropped on mobile. |
| Copy block | 420 – 1000 | Logo lock-up, headline “Keep every member on plan for all 90 days.”, one-line description, `JIXORA.SPACE` |
| Product vignette | 1110 – 1520 | A simplified coach-console card: 13-week progress strip, an AI-drafted change awaiting coach approval, two member status chips |

Vertical content sits between y = 62 and y = 340, leaving margin top and bottom for
LinkedIn's responsive crop.

## Design

- **Background:** Pine 900 `#0E1A16` with the 28 px “90-day grid” texture, fading from Pine 950 `#08110E` on the left
- **Accent:** Volt `#D7F94A`, used only on “90 days.”, the progress strip and the approval card
- **Text:** Paper `#F5F4EE` headline, Pine 200 `#C4D3CC` description, Pine 300 `#9DB3AA` mono labels
- **Type:** Rendered with Helvetica Neue (the site uses Bricolage Grotesque for display and Inter for body; the raster export uses a system grotesque for portability). For a pixel-perfect version, open the SVG in Figma with Bricolage Grotesque installed.

## Rules

- Keep product UI generic and labelled as a sample (no real member names on public artwork beyond the fictional examples used on the website).
- Do not add customer logos, metrics or certifications until they are verified.
