import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const TOTAL_SCROLL_SPAN_VH = 500

const SWORD_STATES = {
  section2: {
    rotation: { z: -0.7 },
    position: { x: -1 }
  },
  section3: {
    scale: { x: 1.8, y: 1.8, z: 1.8 },
    rotation: { y: 0.4 }
  },
  section4: {
    rotation: { y: Math.PI * 2 },
    scale: { x: 1.2, y: 1.2, z: 1.2 },
    position: { x: 0 }
  },
  section5: {
    rotation: { z: -1.5708, y: 0 },
    position: { x: -2, y: 0 }
  },
  section6: {
    rotation: { z: 0, y: 0 },
    position: { x: 0, y: 0 },
    scale: { x: 1, y: 1, z: 1 }
  }
}

export function useScrollAnimation(katanaRef) {
  useEffect(() => {
    if (!katanaRef.current) return

    const tl = gsap.timeline({
      defaults: { ease: 'none', duration: 1 },
      scrollTrigger: {
        trigger: '.scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    })

    // Timeline keyframe anchors: 0, 1, 2, 3, 4 across a 500vh scroll span.
    // This means each timeline unit represents 100vh of effective scroll.
    tl.to(katanaRef.current.rotation, SWORD_STATES.section2.rotation, 0)
    tl.to(katanaRef.current.position, SWORD_STATES.section2.position, 0)

    tl.to(katanaRef.current.scale, SWORD_STATES.section3.scale, 1)
    tl.to(katanaRef.current.rotation, SWORD_STATES.section3.rotation, 1)

    tl.to(katanaRef.current.rotation, SWORD_STATES.section4.rotation, 2)
    tl.to(katanaRef.current.scale, SWORD_STATES.section4.scale, 2)
    tl.to(katanaRef.current.position, SWORD_STATES.section4.position, 2)

    tl.to(katanaRef.current.rotation, SWORD_STATES.section5.rotation, 3)
    tl.to(katanaRef.current.position, SWORD_STATES.section5.position, 3)

    tl.to(katanaRef.current.rotation, SWORD_STATES.section6.rotation, 4)
    tl.to(katanaRef.current.position, SWORD_STATES.section6.position, 4)
    tl.to(katanaRef.current.scale, SWORD_STATES.section6.scale, 4)

    const handleScrollProgress = () => {
      const scrollSpanPx = (TOTAL_SCROLL_SPAN_VH / 100) * window.innerHeight
      const scrolledPx = Math.min(window.scrollY, scrollSpanPx)
      const scrolled = scrollSpanPx > 0 ? scrolledPx / scrollSpanPx : 0
      const el = document.getElementById('scroll-progress')
      if (el) el.style.height = (scrolled * 60) + 'vh'
    }

    window.addEventListener('scroll', handleScrollProgress)
    handleScrollProgress()

    return () => {
      window.removeEventListener('scroll', handleScrollProgress)
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [katanaRef])
}
