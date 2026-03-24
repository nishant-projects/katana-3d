# SHINKEN — Premium Katana 3D + Ecommerce Experience

SHINKEN is a premium ecommerce experience built on top of a cinematic 3D katana scroll journey.
The home route keeps the original immersive WebGL storytelling, while new routes provide a fully
functional storefront flow (product, cart, checkout, custom commissions, and contact).

## Tech Stack

- React + Vite
- React Router
- React Three Fiber + Drei + Three.js
- GSAP ScrollTrigger + Lenis smooth scrolling

## Routes

- `/` — Original 3D katana scroll experience (preserved)
- `/product` — Product detail page for **THE SILENT BLADE**
- `/cart` — Cart management page with quantity/update/remove
- `/checkout` — Checkout form + order confirmation behavior
- `/customize` — Custom blade request form
- `/contact` — Contact and inquiry form

## Core Functional Additions

- Global fixed frosted-glass `Navbar` across all routes
- App-wide `CartContext` state for item count, total, quantity updates
- Functional CTA behavior (add to cart, buy now, proceed checkout, submit forms)
- Consistent premium black/gold visual language across inner pages

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- The 3D canvas, section sequence, scroll animation, and snap flow on the home page are preserved.
- Router integration wraps the app while maintaining Lenis/GSAP behavior from bootstrap.
