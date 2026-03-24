import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'


export function useScrollAnimation(katanaRef) {
  useEffect(() => {
    if (!katanaRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2,
      }
    })

    // Section 1 → 2: Katana tilts left and moves off-center
    tl.to(katanaRef.current.rotation, { z: -0.7, duration: 1 }, 0)
    tl.to(katanaRef.current.position, { x: -1, duration: 1 }, 0)

    // Section 2 → 3: Scale up toward camera, slight Y rotation to show edge
    tl.to(katanaRef.current.scale, { x: 1.8, y: 1.8, z: 1.8, duration: 1 }, 1)
    tl.to(katanaRef.current.rotation, { y: 0.4, duration: 1 }, 1)

    // Section 3 → 4: Full 360 degree spin, scale back slightly, return to center
    tl.to(katanaRef.current.rotation, { y: Math.PI * 2, duration: 1 }, 2)
    tl.to(katanaRef.current.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 1 }, 2)
    tl.to(katanaRef.current.position, { x: 0, duration: 1 }, 2)

    // Section 4 → 5: Tilt horizontal for draw position
    tl.to(katanaRef.current.rotation, { z: -1.5708, y: 0, duration: 1 }, 3)
    tl.to(katanaRef.current.position, { x: -2, y: 0, duration: 1 }, 3)

    // Section 5 → 6: Return to vertical center for end card
    tl.to(katanaRef.current.rotation, { z: 0, y: 0, duration: 1 }, 4)
    tl.to(katanaRef.current.position, { x: 0, y: 0, duration: 1 }, 4)
    tl.to(katanaRef.current.scale, { x: 1, y: 1, z: 1, duration: 1 }, 4)

    const handleScrollProgress = () => {
      const scrolled =
        window.scrollY / (document.body.scrollHeight - window.innerHeight)
      const el = document.getElementById('scroll-progress')
      if (el) el.style.height = (scrolled * 60) + 'vh'
    }

    window.addEventListener('scroll', handleScrollProgress)

    return () => {
      window.removeEventListener('scroll', handleScrollProgress)
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [katanaRef])
}
