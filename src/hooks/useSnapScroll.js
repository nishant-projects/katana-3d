import { useEffect } from 'react'

const SECTION_HEIGHTS_VH = [200, 200, 200, 200, 200, 100]

export function useSnapScroll() {
  useEffect(() => {
    let isScrolling = false
    let touchStartY = 0
    let safetyTimer = null

    function getSnapPoints() {
      const vh = window.innerHeight
      const points = []
      let sectionTop = 0

      for (const heightVh of SECTION_HEIGHTS_VH) {
        const sectionHeightPx = (heightVh / 100) * vh
        const snapTarget = heightVh > 100 ? sectionTop + vh : sectionTop
        points.push(snapTarget)
        sectionTop += sectionHeightPx
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

    function unlock() {
      isScrolling = false
      if (safetyTimer) {
        clearTimeout(safetyTimer)
        safetyTimer = null
      }
    }

    function snapTo(direction) {
      if (isScrolling) return
      if (!window.__lenis) return

      const points = getSnapPoints()
      const currentIndex = getCurrentSectionIndex(points)
      const nextIndex = Math.max(0, Math.min(points.length - 1, currentIndex + direction))

      if (nextIndex === currentIndex) return

      isScrolling = true

      // Safety unlock in case onComplete never fires
      safetyTimer = setTimeout(unlock, 2000)

      window.__lenis.scrollTo(points[nextIndex], {
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        onComplete: unlock,
      })
    }

    function onWheel(e) {
      e.preventDefault()
      const direction = e.deltaY > 0 ? 1 : -1
      snapTo(direction)
    }

    function onTouchStart(e) {
      touchStartY = e.touches[0].clientY
      // Pause lenis free-scroll while we decide where to snap
      if (window.__lenis) window.__lenis.stop()
    }

    function onTouchEnd(e) {
      const delta = touchStartY - e.changedTouches[0].clientY

      // Re-enable lenis before snapping so scrollTo works
      if (window.__lenis) window.__lenis.start()

      if (Math.abs(delta) < 30) return

      const direction = delta > 0 ? 1 : -1
      snapTo(direction)
    }

    window.addEventListener('wheel', onWheel, { passive: false, capture: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', onWheel, { capture: true })
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      if (safetyTimer) clearTimeout(safetyTimer)
      if (window.__lenis) window.__lenis.start()
    }
  }, [])
}
