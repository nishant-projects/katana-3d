# Katana 3D Showcase

A high-end interactive 3D katana showcase built with React 19, React Three Fiber, Drei, and GSAP-inspired smooth scrolling.

## Tech Stack

- React 19 + Vite
- `three`, `@react-three/fiber`, `@react-three/drei`
- `@react-three/postprocessing` (`SelectiveBloom`)
- `gsap` + `ScrollTrigger` (page timing + UX)
- `lenis` for smooth/snap scrolling

## Key Visual Features

- Procedural katana model:
  - Blade built from `BoxGeometry`
  - Guard (tsuba) built from `ExtrudeGeometry`
- Forged-steel inspired PBR blade response using `meshPhysicalMaterial`
  - `metalness: 1`
  - `roughness: 0.18`
  - `clearcoat: 1`
  - `clearcoatRoughness: 0.04`
  - boosted `envMapIntensity`
- Stage-based cinematic lighting with Drei `Stage` + `ContactShadows`
- Studio HDR environment reflections with `Environment`
- Selective bloom only on the sharpened blade edge (`selectionLayer: 10`)

## Interactions

- Mouse/touch tilt sensitivity via `useFrame`
- Scroll-smoothed section interpolation (useScroll-style normalized progress)
- Scroll-driven unsheathing motion via blade-group translation
- Gentle idle movement using `<Float>`
- Adaptive rendering quality with `PerformanceMonitor` (DPR downscales on low FPS)

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Project Structure (Core)

- `src/components/Scene.jsx` – canvas, Stage/ContactShadows lighting, environment, selective bloom, performance monitor
- `src/components/Katana.jsx` – procedural katana geometry, forged-steel PBR material, bloom-edge mesh
- `src/hooks/useScrollAnimation.js` – smooth normalized scroll interpolation + unsheathing logic
- `src/hooks/useSnapScroll.js` – section snap-scroll behavior
