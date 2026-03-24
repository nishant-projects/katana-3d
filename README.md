# Katana 3D Showcase

A high-end interactive 3D katana showcase built with React 19, React Three Fiber, Drei, and GSAP-inspired smooth scrolling.

## Tech Stack

- React 19 + Vite
- `three`, `@react-three/fiber`, `@react-three/drei`
- `@react-three/postprocessing` (`Bloom`, `ToneMapping`)
- `gsap` + `ScrollTrigger` (page timing + UX)
- `lenis` for smooth/snap scrolling

## Key Visual Features

- Procedural katana model:
  - Blade built from an `ExtrudeGeometry` profile with a true sharpened tip
  - Tiny bevels across blade edges for physically plausible highlights
  - Guard (tsuba) built from `ExtrudeGeometry`
- Mirror-steel PBR blade response using `meshStandardMaterial`
  - `metalness: 1`
  - `roughness: 0.05`
  - `envMapIntensity: 2.5`
  - subtle procedural normal map for forge-like micro texture
- City HDR environment reflections with `Environment preset="city"`
- Grounding contact shadow pass using Drei `ContactShadows`
- Cinematic post-processing with full-scene bloom + ACES filmic tone mapping

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

- `src/components/Scene.jsx` – canvas, lights, city environment, contact shadows, bloom/tone mapping, performance monitor
- `src/components/Katana.jsx` – procedural katana geometry, sharpened-tip blade profile, PBR steel material
- `src/hooks/useScrollAnimation.js` – smooth normalized scroll interpolation + unsheathing logic
- `src/hooks/useSnapScroll.js` – section snap-scroll behavior
