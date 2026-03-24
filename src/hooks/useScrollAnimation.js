import { useEffect } from 'react'
import gsap from 'gsap'

const SWORD_STATES = {
  section2: {
    rotation: { z: -0.55 },
    position: { x: -0.8 },
  },
  section3: {
    scale: { x: 1.7, y: 1.7, z: 1.7 },
    rotation: { y: 0.35 },
  },
  section4: {
    rotation: { y: Math.PI * 2 },
    scale: { x: 1.2, y: 1.2, z: 1.2 },
    position: { x: 0 },
  },
  section5: {
    rotation: { z: -1.35, y: 0 },
    position: { x: -1.75, y: 0 },
  },
  section6: {
    rotation: { z: 0, y: 0 },
    position: { x: 0, y: 0 },
    scale: { x: 1, y: 1, z: 1 },
  },
}

export function useScrollAnimation(katanaRef) {
  useEffect(() => {
    if (!katanaRef.current) return

    const bladeGroup = katanaRef.current.userData?.bladeGroup

    const tl = gsap.timeline({
      defaults: { ease: 'none', duration: 1 },
      scrollTrigger: {
        trigger: '.scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      },
    })

    if (bladeGroup) {
      tl.to(bladeGroup.position, { y: 1.12 }, 0)
      tl.to(bladeGroup.position, { y: 0 }, 1.15)
    }

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

    const updateProgress = () => {
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1)
      const progress = Math.min(window.scrollY / maxScroll, 1)
      const el = document.getElementById('scroll-progress')
      if (el) el.style.height = `${progress * 60}vh`
    }

    window.addEventListener('scroll', updateProgress)
    updateProgress()

    return () => {
      window.removeEventListener('scroll', updateProgress)
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [katanaRef])
}
