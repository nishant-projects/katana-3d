import { useEffect } from 'react'

// These must match the height of each section in App.jsx, in order:
// HeroDrop 200vh, BladeSection 200vh, EdgeSection 200vh,
// RotationSection 200vh, DrawSection 200vh, EndCard 100vh
const SECTION_HEIGHTS_VH = [200, 200, 200, 200, 200, 100]

export function useSnapScroll() {
  useEffect(() => {
    let isScrolling = false

    function getSnapPoints() {
      const vh = window.innerHeight
      const points = []
      let accumulated = 0
      for (const heightVh of SECTION_HEIGHTS_VH) {
        points.push(accumulated)
        accumulated += (heightVh / 100) * vh
      }
      return points
    }

    function getCurrentSectionIndex(points) {
      const y = window.scrollY
      let index = 0
      for (let i = 0; i < points.length; i++) {
        if (y >= points[i] - 20) {
          index = i
        }
      }
      return index
    }

    function onWheel(e) {
      e.preventDefault()

      if (isScrolling) return

      const points = getSnapPoints()
      const currentIndex = getCurrentSectionIndex(points)
      const direction = e.deltaY > 0 ? 1 : -1
      const nextIndex = Math.max(0, Math.min(points.length - 1, currentIndex + direction))

      if (nextIndex === currentIndex) return

      isScrolling = true

      window.__lenis.scrollTo(points[nextIndex], {
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        onComplete: () => {
          isScrolling = false
        },
      })
    }

    window.addEventListener('wheel', onWheel, { passive: false, capture: true })

    return () => {
      window.removeEventListener('wheel', onWheel, { capture: true })
    }
  }, [])
}
