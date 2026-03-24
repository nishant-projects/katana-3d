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

## Update: Lighting depth and blade finish tuning (2026-03-24)
- Increased the key directional light intensity in `src/components/Scene.jsx` from `2.5` to `4` to improve primary highlights and contrast.
- Added a new spotlight at position `[1, 4, 3]` with `intensity={5}`, `angle={0.3}`, and `penumbra={0.5}`, explicitly targeted to `[0, 0, 0]` for stronger focal lighting on the katana.
- Switched the environment preset from `"night"` to `"studio"` for cleaner, more controlled metallic reflections.
- Verified the blade material remains tuned at `metalness={0.95}` and `roughness={0.05}` in `src/components/Katana.jsx`.

### Why this update was made
The previous setup looked visually flat. These lighting and environment changes increase depth, bring out edge/specular detail, and maintain a polished steel response on the blade without altering any geometry.

## Update: ScrollTrigger activation fixes (2026-03-24)
- Updated `src/App.jsx` so each `.scroll-container` section now uses `height: 200vh` instead of `100vh` to provide enough scroll distance for the GSAP timeline to progress reliably.
- Updated `src/components/Scene.jsx` to run `useScrollAnimation` inside an `AnimatedKatana` component that renders inside `<Canvas>`, ensuring the hook is attached where the 3D object ref lifecycle is fully in-canvas.
- Explicitly set `pointerEvents: 'none'` on the `<Canvas>` style (in addition to existing overlay behavior) so scroll/pointer interaction always passes through to the page.

### Why this update was made
The scroll animation was not consistently triggering because the scroll area was too short and the animation hook placement could race with canvas object lifecycle timing. These fixes preserve existing katana geometry while making ScrollTrigger activation stable.

## Update: HeroDrop section implementation and pulse keyframe (2026-03-24)
- Replaced `src/components/sections/HeroDrop.jsx` placeholder with the requested GSAP-based hero drop section, including:
  - entrance fade/translate animation on mount,
  - scroll-linked fade out using `scrollTrigger`,
  - sticky centered headline/content stack,
  - decorative pulsing vertical line.
- Added global `@keyframes pulse` animation to `src/styles/global.css` for the hero indicator line.

### Why this update was made
This implements the requested cinematic hero intro behavior and shared pulse animation needed by the section’s inline styles.
