# Katana 3D Showcase

A high-end interactive 3D katana showcase built with React 19, React Three Fiber, Drei, and GSAP.

## Tech Stack

- React 19 + Vite
- `three`, `@react-three/fiber`, `@react-three/drei`
- `gsap` + `ScrollTrigger`
- `@react-three/postprocessing` for bloom
- `lenis` for smooth/snap scrolling

## Key Visual Features

- Procedural katana model:
  - Blade built from `BoxGeometry`
  - Guard (tsuba) built from `ExtrudeGeometry`
- Metallic steel blade material (`metalness: 1`, `roughness: 0.05`)
- Hamon highlight layer using `MeshTransmissionMaterial`
- Environment reflections with `Stage` + `Environment` presets
- Bloom postprocessing for bright highlight glow

## Interactions

- Mouse/touch tilt sensitivity via `useFrame`
- Scroll-driven GSAP timeline for cinematic transforms
- Scroll-triggered unsheathing motion
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

- `src/components/Scene.jsx` – canvas, lighting, stage, environment, bloom, performance monitor
- `src/components/Katana.jsx` – procedural katana geometry + materials
- `src/hooks/useScrollAnimation.js` – scroll timeline and unsheathing animation
- `src/hooks/useSnapScroll.js` – section snap-scroll behavior
