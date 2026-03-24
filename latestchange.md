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

## Update: Production build chunking optimization (2026-03-24)
- Updated `vite.config.js` to define `build.rollupOptions.output.manualChunks` and split heavy dependencies into dedicated chunks:
  - `three-core` for `three`
  - `r3f-vendor` for `@react-three/fiber`
  - `drei-vendor` for `@react-three/drei`
  - `gsap-vendor` for `gsap`
  - `vendor` for the remaining `node_modules`
- Set `build.chunkSizeWarningLimit` to `1000` to match expected bundle profile for a WebGL-heavy scene and remove non-actionable build noise after chunking.
- Re-ran production build to ensure `dist/` is generated with a valid `dist/index.html`.

### Why this update was made
The build was producing a large chunk-size warning. This change reduces risk of runtime performance/visual jank on slower devices by delivering large libraries in smaller cacheable chunks, without changing UI behavior or visuals.

## Update: Explicit Vercel/Vite output directory config (2026-03-24)
- Updated `vite.config.js` to explicitly set `build.outDir` to `dist`.

### Why this update was made
Vite already defaults to `dist`, but setting it explicitly makes deployment intent clearer for Vercel configuration and avoids ambiguity in future build config changes.


## Update: Centralized ScrollTrigger plugin registration (2026-03-24)
- Kept `gsap.registerPlugin(ScrollTrigger)` only in `src/main.jsx` as the single app-bootstrap registration point.
- Removed duplicate `gsap.registerPlugin(ScrollTrigger)` call from `src/hooks/useScrollAnimation.js`.
- Preserved existing timeline behavior in `useScrollAnimation`, including `scrub: 1.5`, and left Lenis RAF/`ScrollTrigger.update()` logic unchanged in `src/main.jsx`.

### Why this update was made
Registering GSAP plugins once at top-level bootstrap avoids duplicate side effects during hook/module evaluation while keeping scroll animation behavior identical.

## Update: Hamon shader, centered snap targets, and depth polish (2026-03-24)
- Rewrote `src/hooks/useSnapScroll.js` snap-point calculation so each 200vh section now snaps to its visual center (`sectionTop + 100vh`) while the 100vh EndCard snaps to section top, preserving existing Lenis touch/wheel handling and lock/safety behavior.
- Added `src/components/KatanaShaderMaterial.jsx` with a custom GLSL shader material (`KatanaHamonMaterial`) that introduces spine-to-edge gradient response, procedural hamon line, Fresnel rim highlight, and subtle animated shimmer.
- Updated `src/components/Katana.jsx` to use `useFrame` and animate `uTime` every frame, then swapped the blade material to `<katanaHamonMaterial ref={hamonRef} />` without changing geometry or other katana parts.
- Updated `src/index.css` heading defaults to a single neutral `h1, h2` rule (`font-weight`, inherited color, zero margin) to avoid overriding section-specific typography.
- Updated `src/components/Scene.jsx` lighting rig for stronger depth: reduced ambient, stronger key light, added cool underlight, increased gold point light power/range, removed rect area light, and changed environment preset to `warehouse`.
- Updated `src/hooks/useScrollAnimation.js` `scrub` from `1` to `2` for heavier-feeling scroll response.
- Updated `src/components/sections/EndCard.jsx` text colors from near-invisible dark grays to readable `#666` and `#555` on black.

### Why this update was made
This pass fixes section snap alignment with the actual sticky content zone, improves perceived blade realism through shader-driven metal response, increases scene contrast/depth for cinematic presentation, and resolves typography/readability conflicts without changing the core section layout or animation choreography.

## Update: Mobile snap alignment and blank-gap removal (2026-03-24)
- Updated `src/hooks/useSnapScroll.js` snap-point logic to use real DOM section offsets from `.scroll-container > section` instead of hard-coded viewport multiples, so each wheel/touch scroll lands exactly on the next actual content section.
- Added a tiny wheel noise guard (`Math.abs(deltaY) < 1`) in `useSnapScroll` to prevent accidental snap triggers from micro-scroll jitter on touchpads/devices.
- Updated all text section components (`HeroDrop`, `BladeSection`, `EdgeSection`, `RotationSection`, `DrawSection`, `EndCard`) from `height: 100vh` to `height: 100dvh` for stable full-screen alignment on mobile browsers with dynamic address/tool bars.
- Centered `EndCard` content (`justifyContent: 'center'`) and removed its bottom padding so the final text page aligns with the same centered snap behavior as the other sections.
- Updated `src/styles/global.css` section baseline to `min-height: 100dvh` and explicit `margin: 0` to avoid inherited spacing artifacts between pages.

### Why this update was made
Users were seeing misaligned page stops and empty gaps between text sections while snapping, especially on mobile/tablet browsers. These changes make snapping section-aware and viewport-stable, ensuring one-scroll-per-page behavior and centered text frames without changing the overall animation flow or content structure.

## Update: Premium steel shader workflow, tilt control, bloom, and adaptive performance (2026-03-24)
- Rebuilt `src/components/Katana.jsx` to match the requested premium procedural setup:
  - blade now uses `BoxGeometry`
  - tsuba now uses `ExtrudeGeometry`
  - blade material is tuned to `meshStandardMaterial` with `metalness={1}` and `roughness={0.05}`
  - added `MeshTransmissionMaterial` overlay on the blade for hamon-style highlight catching
  - added a blade-mounted point light (`blade-glint`) so specular glints travel with blade motion.
- Reworked `src/components/Scene.jsx`:
  - added Drei `Stage` + `Environment` for realistic metal reflections
  - added `Environment preset="city"` to guarantee meaningful reflection data
  - added `EffectComposer` + `Bloom` from `@react-three/postprocessing`
  - wrapped the katana with `<Float>` for subtle idle animation
  - implemented pointer/touch-sensitive tilt using `useFrame`
  - added `PerformanceMonitor`-based DPR fallback (`1.5` -> `1`) when performance drops.
- Updated `src/hooks/useScrollAnimation.js`:
  - added scroll-driven blade unsheathing (`blade-group` local Y motion)
  - preserved existing cinematic section-based timeline transforms
  - tightened cleanup so only this hook's timeline/trigger are killed.
- Updated dependency graph (`package.json`, `package-lock.json`) to include `@react-three/postprocessing` and `postprocessing`.
- Replaced default Vite template README with a project-specific `README.md` reflecting current architecture, interactions, and run/build instructions.

### Why this update was made
This change implements the requested premium katana showcase direction: physically convincing metal response, motion-sensitive shine, scroll-based unsheathing narrative, and better tablet/mobile resilience through adaptive render quality.

## Update: Sword stability, center alignment, and scroll motion polish (2026-03-24)
- Updated `src/hooks/useScrollAnimation.js` to reduce extreme sword transforms between sections, keeping movement closer to center so the katana no longer jumps too far left/right or scales too large.
- Tuned the unsheathing animation range for `blade-group` from a very large lift to a controlled draw/re-seat motion so the blade no longer looks visually detached or “broken” during scroll.
- Updated `src/components/Scene.jsx` to reduce pointer tilt sensitivity and idle float intensity, especially on mobile, so the sword remains stable and more realistic while still reacting to user movement.
- Reduced overall sword render size in `src/components/Scene.jsx` by lowering base scale on desktop/mobile to better fit section compositions.
- Updated `src/components/Katana.jsx` proportions (blade, hamon overlay, guard/handle positions, and glint light) for a tighter, more believable silhouette and better part continuity.
- Updated `src/hooks/useSnapScroll.js` to snap sections using center-aware offsets (`top + (sectionHeight - viewportHeight)/2`) so pages hold content in the middle more consistently across viewport variations.

### Why this update was made
Users reported that the sword looked oversized, appeared to break apart in some moments, and did not stay centered consistently during scroll. This pass focuses on animation restraint, proportional geometry tuning, and center-accurate snap behavior to deliver a more polished and realistic premium experience.

## Update: Drei-inspired stage lighting, useScroll-style unsheathing, forged steel PBR, and selective edge bloom (2026-03-24)
- Updated `src/components/Scene.jsx` to align more closely with the lighting composition patterns in Drei's `Stage` + `ContactShadows` implementation:
  - enabled contact shadows through `Stage` shadow config (`type: contact`, tuned opacity/blur/far/resolution),
  - moved to a dedicated `Environment preset="studio"` reflection setup,
  - retained adaptive DPR via `PerformanceMonitor`.
- Replaced full-scene `Bloom` with `SelectiveBloom` so only the blade edge receives glow:
  - added `selectionLayer={10}` and object selection wiring,
  - passed explicit scene lights to `SelectiveBloom` (`lights={lightRefs.current}`) to satisfy effect requirements.
- Updated `src/components/Katana.jsx` materials and scene handles:
  - switched blade base to forged-steel style `meshPhysicalMaterial` (high metalness, moderate roughness, full clearcoat, stronger env reflections),
  - added a dedicated blade-edge mesh with emissive/metal tuning for highlight catches,
  - registered bloom layer on the edge mesh,
  - exposed katana-local lights (`blade-glint`, `blade-fill`) for selective bloom lighting.
- Reworked `src/hooks/useScrollAnimation.js` from fixed timeline keyframes to a useScroll-style normalized interpolation loop:
  - computes page progress from actual scroll range,
  - smooths progress with damping for natural transitions,
  - interpolates transform states between sections,
  - drives blade unsheathing (`bladeGroup.position.y`) as part of interpolated state.
- Updated `README.md` to reflect the current architecture (Stage/ContactShadows lighting, selective bloom edge, forged-steel PBR, and scroll interpolation workflow).

### Why this update was made
This pass implements the requested architectural direction from the provided references: physically richer katana steel, controlled stage lighting with contact grounding, smooth scroll-driven unsheathing behavior, and cinematic bloom constrained to the sharpened edge instead of the entire scene.

## Update: Photo-real katana tip/bevel pass, city HDR reflections, and readability upgrade (2026-03-24)
- Refactored `src/components/Katana.jsx` for a more realistic blade silhouette:
  - replaced the flat-ended blade box with a custom extruded blade profile that includes an actual pointed tip,
  - enabled tiny bevels on blade edges so surfaces no longer end in perfectly hard 90° transitions,
  - kept physically based shading via `meshStandardMaterial` with `metalness={1}`, `roughness={0.05}`, and `envMapIntensity={2.5}`,
  - added a subtle procedural normal map (forge-like micro texture) to break up flat reflections and improve realism.
- Refactored `src/components/Scene.jsx` to align with the requested render pipeline:
  - added `<Environment preset="city" />`,
  - added `<ContactShadows opacity={0.4} scale={10} blur={2} far={1} />` beneath the katana,
  - replaced selective edge-only glow with `EffectComposer` + `Bloom` and ACES filmic `ToneMapping` for a cinematic HDR response.
- Improved text clarity across visible content sections by brightening low-contrast body/subtext colors in `HeroDrop`, `BladeSection`, `EdgeSection`, `DrawSection`, `RotationSection`, and `EndCard`.
- Updated `README.md` to reflect the new city-environment + bloom/tone-mapping pipeline, mirror-polished blade settings, and sharpened-tip geometry.

### Why this update was made
Users reported three quality issues: the katana looked flat with no convincing tip, text was too dim to read comfortably, and the overall render lacked a premium photoreal feel. This pass addresses all three with geometry realism, physically plausible reflections/post-processing, and stronger UI contrast while preserving the existing scroll narrative and structure.

## Update: Viewport-fit katana scaling for full single-screen visibility (2026-03-24)
- Updated `src/components/Scene.jsx` so katana scale is now computed from both viewport width and height (`fitScale`) instead of using only a fixed desktop/mobile value.
- Added a `viewportScale` state and passed it into the katana render path (`SceneContent` → `AnimatedKatana` → `Katana`).
- Kept all existing interactions unchanged (scroll interpolation, unsheathing, tilt, float, lighting, and post-processing); only the model size is responsively reduced to stay fully visible on smaller screens/tablets.

### Why this update was made
On some devices, the katana extended beyond the visible screen area (especially near the handle) in single-page sections. This change keeps the sword fully inside one viewport without changing section behavior or animation functionality.

## Update: Additional mobile/tablet katana downscale tuning (2026-03-24)
- Updated `src/components/Scene.jsx` responsive katana sizing logic to further reduce model size on constrained viewports.
- Tightened the width/height fit references (`1600x1000`) and lowered the minimum fit floor to `0.5` so the model can shrink more when needed.
- Reduced base katana scale multipliers (mobile and desktop) and added a short-height viewport penalty for screens with limited vertical space.
- Preserved all existing animation, lighting, and interaction behavior; only viewport scale math was adjusted.

### Why this update was made
Users still reported the katana clipping out of frame on some device/browser combinations. This pass adds a stronger responsive downscale strategy so the full sword composition stays inside the visible screen more consistently.

## Update: Handle visibility fix with extra viewport fit margin (2026-03-24)
- Updated `src/components/Scene.jsx` katana placement so the sword is rendered slightly higher on screen (`position.y` increased for both mobile and desktop), preventing the handle from dropping below the viewport edge.
- Reduced responsive base katana scale again (`mobile: 0.56`, `desktop: 0.78`) while keeping the existing width/height `fitScale` and short-viewport penalty logic unchanged.
- Preserved all existing lighting, scroll interpolation, and post-processing behavior; only framing-related scale/position values were tuned.

### Why this update was made
On some screens, users could only see the blade while the handle was clipped at the bottom. Raising the model and applying a small extra downscale ensures the full katana (including handle) stays visible in a single screen composition.
