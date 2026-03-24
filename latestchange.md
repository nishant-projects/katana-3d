# Latest Change

## What was changed
- Bootstrapped a Vite + React project in the repository root.
- Installed requested dependencies: `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, `@gsap/react`, and `lenis`.
- Added the requested project structure under `src/`, including:
  - `components/Scene.jsx`
  - `components/Katana.jsx`
  - `components/sections/{HeroDrop,BladeSection,EdgeSection,RotationSection,DrawSection,EndCard}.jsx`
  - `hooks/useScrollAnimation.js`
  - `styles/global.css`
  - updated `App.jsx` and `main.jsx`
- Updated `index.html` to include the requested Google Fonts links in `<head>`.
- Kept `vite.config.js` as standard React Vite configuration.
- Ran `npm run build` successfully and confirmed production build completes.

## Why this was changed
This establishes the exact starter architecture and dependencies needed for the katana 3D scroll-animation experience while ensuring the project compiles cleanly before moving on to feature implementation.

## Follow-up Update
- Removed `src/assets/hero.png` from the repository.

### Why this follow-up was made
The PNG file was blocking PR creation in your workflow, so it was removed to make the PR pass cleanly.

## Update: Scene lighting and katana render setup (2026-03-24)
- Updated `src/components/Scene.jsx` to import and render the `Katana` component instead of the temporary box mesh.
- Added a fixed full-viewport wrapper around `<Canvas>` with `pointerEvents: 'none'` so the 3D layer stays as a non-blocking visual overlay.
- Replaced the old basic lights with a cinematic static setup:
  - ambient light (`0.05`, white)
  - key directional light from right (`[3, 2, 2]`, `2.5`, white)
  - cool fill directional light from left (`[-3, 1, -1]`, `0.8`, `#b0c4de`)
  - warm rim point light (`[0, 3, 2]`, `1.5`, `#d4a847`, distance `8`)
  - rect area edge light (`[2, 0, 1]`, width `0.5`, height `4`, intensity `3`, `#c0c0c0`)
- Added `<Environment preset="night" />` from `@react-three/drei` for stronger metallic reflections.
- Set the katana transform to a static vertical default (`rotation={[0,0,0]}`, `position={[0,0,0]}`) with no animation.

### Why this update was made
This change moves the scene from a placeholder shape to the real katana model and introduces a controlled lighting rig that better highlights blade material, edge definition, and reflections while keeping the composition static for the next animation step.
