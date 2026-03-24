import { useEffect } from 'react'

const SWORD_STATES = [
  {
    rotation: { x: 0, y: 0, z: 0 },
    position: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    bladeY: 0,
  },
  {
    rotation: { x: 0, y: 0.12, z: -0.35 },
    position: { x: -0.35, y: 0.03, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    bladeY: 0.08,
  },
  {
    rotation: { x: 0, y: 0.28, z: -0.18 },
    position: { x: 0.18, y: 0.06, z: 0 },
    scale: { x: 1.08, y: 1.08, z: 1.08 },
    bladeY: 0.38,
  },
  {
    rotation: { x: 0, y: Math.PI * 1.15, z: 0 },
    position: { x: 0, y: 0.02, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    bladeY: 0.14,
  },
  {
    rotation: { x: 0, y: 0.05, z: -0.62 },
    position: { x: -0.22, y: -0.02, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    bladeY: 0.04,
  },
  {
    rotation: { x: 0, y: 0, z: 0 },
    position: { x: 0, y: 0, z: 0 },
    scale: { x: 0.95, y: 0.95, z: 0.95 },
    bladeY: 0,
  },
]

const damp = (current, target, smoothing) => current + (target - current) * smoothing
const lerp = (a, b, t) => a + (b - a) * t

const lerpState = (from, to, alpha) => ({
  rotation: {
    x: lerp(from.rotation.x, to.rotation.x, alpha),
    y: lerp(from.rotation.y, to.rotation.y, alpha),
    z: lerp(from.rotation.z, to.rotation.z, alpha),
  },
  position: {
    x: lerp(from.position.x, to.position.x, alpha),
    y: lerp(from.position.y, to.position.y, alpha),
    z: lerp(from.position.z, to.position.z, alpha),
  },
  scale: {
    x: lerp(from.scale.x, to.scale.x, alpha),
    y: lerp(from.scale.y, to.scale.y, alpha),
    z: lerp(from.scale.z, to.scale.z, alpha),
  },
  bladeY: lerp(from.bladeY, to.bladeY, alpha),
})

export function useScrollAnimation(katanaRef) {
  useEffect(() => {
    if (!katanaRef.current) return

    const bladeGroup = katanaRef.current.userData?.bladeGroup
    const totalSegments = SWORD_STATES.length - 1

    let targetProgress = 0
    let smoothProgress = 0
    let raf = 0

    const updateTargetProgress = () => {
      const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1)
      targetProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1)

      const el = document.getElementById('scroll-progress')
      if (el) el.style.height = `${targetProgress * 60}vh`
    }

    const animate = () => {
      if (!katanaRef.current) return

      smoothProgress = damp(smoothProgress, targetProgress, 0.12)
      const sectionProgress = smoothProgress * totalSegments
      const lowerIndex = Math.floor(sectionProgress)
      const upperIndex = Math.min(lowerIndex + 1, totalSegments)
      const localT = sectionProgress - lowerIndex

      const fromState = SWORD_STATES[lowerIndex]
      const toState = SWORD_STATES[upperIndex]
      const interpolated = lerpState(fromState, toState, localT)

      katanaRef.current.rotation.set(
        interpolated.rotation.x,
        interpolated.rotation.y,
        interpolated.rotation.z
      )
      katanaRef.current.position.set(
        interpolated.position.x,
        interpolated.position.y,
        interpolated.position.z
      )
      katanaRef.current.scale.set(interpolated.scale.x, interpolated.scale.y, interpolated.scale.z)

      if (bladeGroup) {
        bladeGroup.position.y = interpolated.bladeY
      }

      raf = window.requestAnimationFrame(animate)
    }

    window.addEventListener('scroll', updateTargetProgress, { passive: true })
    window.addEventListener('resize', updateTargetProgress)
    updateTargetProgress()
    animate()

    return () => {
      window.removeEventListener('scroll', updateTargetProgress)
      window.removeEventListener('resize', updateTargetProgress)
      window.cancelAnimationFrame(raf)
    }
  }, [katanaRef])
}
