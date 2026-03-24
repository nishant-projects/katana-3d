import { useEffect } from 'react'

export function useSnapScroll() {
  useEffect(() => {
    let isScrolling = false
    let touchStartY = 0
    let safetyTimer = null
    let wheelAccumulator = 0
    let wheelResetTimer = null
    const WHEEL_THRESHOLD = 44

    function getSections() {
      return Array.from(document.querySelectorAll('.scroll-container > section'))
    }

    function getSnapPoints() {
      const sections = getSections()
      return sections.map((section) => {
        const rect = section.getBoundingClientRect()
        const absoluteTop = window.scrollY + rect.top
        const centerOffset = Math.max(0, (rect.height - window.innerHeight) / 2)
        return Math.max(0, absoluteTop + centerOffset)
      })
    }

    function getCurrentSectionIndex(points) {
      const y = window.scrollY
      let index = 0
      for (let i = 0; i < points.length; i += 1) {
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
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (Math.abs(e.deltaY) < 0.8) return

      e.preventDefault()
      e.stopPropagation()

      if (isScrolling) return

      wheelAccumulator += e.deltaY
      if (wheelResetTimer) clearTimeout(wheelResetTimer)
      wheelResetTimer = setTimeout(() => {
        wheelAccumulator = 0
      }, 120)

      if (Math.abs(wheelAccumulator) < WHEEL_THRESHOLD) return

      const direction = wheelAccumulator > 0 ? 1 : -1
      wheelAccumulator = 0
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

    function onKeyDown(e) {
      if (isScrolling) return
      if (e.repeat) return

      const nextKeys = ['ArrowDown', 'PageDown', ' ']
      const prevKeys = ['ArrowUp', 'PageUp']

      if (nextKeys.includes(e.key)) {
        e.preventDefault()
        snapTo(1)
      } else if (prevKeys.includes(e.key)) {
        e.preventDefault()
        snapTo(-1)
      }
    }

    const wheelOptions = { passive: false, capture: true }
    window.addEventListener('wheel', onWheel, wheelOptions)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKeyDown, { passive: false })

    return () => {
      window.removeEventListener('wheel', onWheel, wheelOptions)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKeyDown)
      if (safetyTimer) clearTimeout(safetyTimer)
      if (wheelResetTimer) clearTimeout(wheelResetTimer)
      if (window.__lenis) window.__lenis.start()
    }
  }, [])
}
