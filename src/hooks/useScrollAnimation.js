import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation(katanaRef) {
  useEffect(() => {
    if (!katanaRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    })

    // Section 1 → 2: Hero to Blade reveal
    // Katana starts vertical, tilts to 45 degrees, moves left
    tl.to(katanaRef.current.rotation, {
      z: -0.7,
      duration: 1,
    }, 0)
    tl.to(katanaRef.current.position, {
      x: -1,
      duration: 1,
    }, 0)

    // Section 2 → 3: Blade zooms toward camera (scale up)
    tl.to(katanaRef.current.scale, {
      x: 1.8,
      y: 1.8,
      z: 1.8,
      duration: 1,
    }, 1)
    tl.to(katanaRef.current.rotation, {
      y: 0.4,
      duration: 1,
    }, 1)

    // Section 3 → 4: Full 360 Y rotation
    tl.to(katanaRef.current.rotation, {
      y: Math.PI * 2,
      duration: 1.5,
    }, 2)
    tl.to(katanaRef.current.scale, {
      x: 1.2,
      y: 1.2,
      z: 1.2,
      duration: 1,
    }, 2)
    tl.to(katanaRef.current.position, {
      x: 0,
      duration: 1,
    }, 2)

    // Section 4 → 5: Blade tilts horizontal (draw position)
    tl.to(katanaRef.current.rotation, {
      z: -1.5708, // -90 degrees, pointing right
      y: 0,
      duration: 1,
    }, 3.5)
    tl.to(katanaRef.current.position, {
      x: -2,
      y: 0,
      duration: 1,
    }, 3.5)

    // Section 5 → 6: Katana returns to vertical center, end pose
    tl.to(katanaRef.current.rotation, {
      z: 0,
      y: 0,
      duration: 1,
    }, 4.5)
    tl.to(katanaRef.current.position, {
      x: 0,
      y: 0,
      duration: 1,
    }, 4.5)
    tl.to(katanaRef.current.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1,
    }, 4.5)

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [katanaRef])
}
