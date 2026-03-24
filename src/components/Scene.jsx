import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, PerformanceMonitor, Stage } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import Katana from './Katana'

function AnimatedKatana({ katanaRef, isMobile }) {
  useScrollAnimation(katanaRef)

  useFrame((state) => {
    if (!katanaRef.current) return

    const pointerFactor = isMobile ? 0.35 : 1
    const targetX = state.pointer.y * 0.08 * pointerFactor
    const targetY = state.pointer.x * 0.14 * pointerFactor

    katanaRef.current.rotation.x += (targetX - katanaRef.current.rotation.x) * 0.04
    katanaRef.current.rotation.y += (targetY - katanaRef.current.rotation.y) * 0.04
  })

  return (
    <Float speed={0.45} floatIntensity={0.08} rotationIntensity={0.05}>
      <Katana
        ref={katanaRef}
        rotation={[0, 0, 0]}
        position={[0, isMobile ? -0.04 : 0, 0]}
        scale={isMobile ? 0.68 : 0.9}
      />
    </Float>
  )
}

function SceneContent({ katanaRef, isMobile }) {
  return (
    <>
      <Stage
        intensity={0.65}
        environment="studio"
        preset="rembrandt"
        adjustCamera={false}
        shadows={false}
      >
        <AnimatedKatana katanaRef={katanaRef} isMobile={isMobile} />
      </Stage>

      <Environment preset="city" />

      <EffectComposer>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
      </EffectComposer>
    </>
  )
}

export default function Scene() {
  const katanaRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [dpr, setDpr] = useState(1.5)

  const camera = useMemo(
    () => ({ position: [0, 0.1, isMobile ? 7 : 5.6], fov: 40, near: 0.1, far: 1000 }),
    [isMobile]
  )

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 992)

    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={camera}
        dpr={dpr}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        style={{ position: 'fixed', top: 0, left: 0, background: '#000000', pointerEvents: 'none' }}
      >
        <PerformanceMonitor
          bounds={() => [45, 60]}
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(1.5)}
        />

        <SceneContent katanaRef={katanaRef} isMobile={isMobile} />
      </Canvas>
    </div>
  )
}
