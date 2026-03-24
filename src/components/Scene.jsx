import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Float, PerformanceMonitor } from '@react-three/drei'
import { Bloom, EffectComposer, ToneMapping } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import Katana from './Katana'

function AnimatedKatana({ katanaRef, isMobile }) {
  useScrollAnimation(katanaRef)

  useFrame((state) => {
    if (!katanaRef.current) return

    const pointerFactor = isMobile ? 0.28 : 0.72
    const targetX = state.pointer.y * 0.058 * pointerFactor
    const targetY = state.pointer.x * 0.1 * pointerFactor

    katanaRef.current.rotation.x += (targetX - katanaRef.current.rotation.x) * 0.03
    katanaRef.current.rotation.y += (targetY - katanaRef.current.rotation.y) * 0.03
  })

  return (
    <Float speed={0.28} floatIntensity={0.06} rotationIntensity={0.03}>
      <Katana
        ref={katanaRef}
        rotation={[0, 0, 0]}
        position={[0, isMobile ? -0.03 : 0, 0]}
        scale={isMobile ? 0.68 : 0.9}
      />
    </Float>
  )
}

function SceneContent({ katanaRef, isMobile }) {
  return (
    <>
      <ambientLight intensity={0.16} color="#ffffff" />
      <directionalLight position={[3, 3, 2]} intensity={2.4} color="#f6fbff" castShadow />
      <directionalLight position={[-3, 1.5, -1]} intensity={0.7} color="#9eb7d3" />
      <pointLight position={[0.4, 0.8, 1.8]} intensity={1.4} color="#c9e5ff" distance={5} />

      <Environment preset="city" />

      <AnimatedKatana katanaRef={katanaRef} isMobile={isMobile} />

      <ContactShadows
        position={[0, -2.65, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={1}
      />

      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={1} intensity={1.5} mipmapBlur />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </>
  )
}

export default function Scene() {
  const katanaRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [dpr, setDpr] = useState(1.5)

  const camera = useMemo(
    () => ({ position: [0, 0.1, isMobile ? 7 : 5.8], fov: 40, near: 0.1, far: 1000 }),
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
        shadows
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
