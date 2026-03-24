import { useEffect } from 'react'

const SECTION_HEIGHTS_VH = [200, 200, 200, 200, 200, 100]

export function useSnapScroll() {
  useEffect(() => {
    let isScrolling = false
    let touchStartY = 0

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

    function snapTo(direction) {
      if (isScrolling) return
      if (!window.__lenis) return

      const points = getSnapPoints()
      const currentIndex = getCurrentSectionIndex(points)
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

    function onWheel(e) {
      e.preventDefault()
      const direction = e.deltaY > 0 ? 1 : -1
      snapTo(direction)
    }

    function onTouchStart(e) {
      touchStartY = e.touches[0].clientY
    }

    function onTouchEnd(e) {
      const delta = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(delta) < 30) return
      const direction = delta > 0 ? 1 : -1
      snapTo(direction)
    }

    function onTouchMove(e) {
      e.preventDefault()
    }

    window.addEventListener('wheel', onWheel, { passive: false, capture: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      window.removeEventListener('wheel', onWheel, { capture: true })
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [])
}
