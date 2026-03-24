import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Katana from './Katana'


const DUST_COUNT = 40
const DUST_POSITIONS = new Float32Array(DUST_COUNT * 3)

for (let i = 0; i < DUST_COUNT; i++) {
  DUST_POSITIONS[i * 3] = (Math.random() - 0.5) * 10
  DUST_POSITIONS[i * 3 + 1] = (Math.random() - 0.5) * 10
  DUST_POSITIONS[i * 3 + 2] = (Math.random() - 0.5) * 5
}

function DustParticles() {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={DUST_COUNT} array={DUST_POSITIONS} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#888888"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

function AnimatedKatana({ katanaRef, isMobile }) {
  useScrollAnimation(katanaRef)

  return (
    <Katana
      ref={katanaRef}
      rotation={[0, 0, 0]}
      position={[0, 0, 0]}
      scale={isMobile ? 0.75 : 1}
    />
  )
}

export default function Scene() {
  const spotLightRef = useRef(null)
  const spotTargetRef = useRef(null)
  const katanaRef = useRef()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 768)

    updateViewport()
    window.addEventListener('resize', updateViewport)

    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  useLayoutEffect(() => {
    if (!spotLightRef.current || !spotTargetRef.current) return

    spotLightRef.current.target = spotTargetRef.current
    spotLightRef.current.target.updateMatrixWorld()
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
        camera={{ position: [0, 0, isMobile ? 7 : 5], fov: 45, near: 0.1, far: 1000 }}
        performance={{ min: 0.5 }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: 'high-performance' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          background: '#000000',
          pointerEvents: 'none',
        }}
      >
        <ambientLight intensity={0.05} color="#ffffff" />
        <directionalLight position={[3, 2, 2]} intensity={4} color="#ffffff" />
        <directionalLight position={[-3, 1, -1]} intensity={0.8} color="#b0c4de" />
        <pointLight position={[0, 3, 2]} intensity={1.5} color="#d4a847" distance={8} />
        <rectAreaLight position={[2, 0, 1]} width={0.5} height={4} intensity={3} color="#c0c0c0" />
        <spotLight
          ref={spotLightRef}
          position={[1, 4, 3]}
          intensity={5}
          angle={0.3}
          penumbra={0.5}
          color="#ffffff"
        />
        <object3D ref={spotTargetRef} position={[0, 0, 0]} />
        <Environment preset="studio" />
        <AnimatedKatana katanaRef={katanaRef} isMobile={isMobile} />
        <DustParticles />
      </Canvas>
    </div>
  )
}
