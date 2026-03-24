import { useLayoutEffect, useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Katana from './Katana'

function AnimatedKatana({ katanaRef }) {
  useScrollAnimation(katanaRef)

  return <Katana ref={katanaRef} rotation={[0, 0, 0]} position={[0, 0, 0]} />
}

export default function Scene() {
  const spotLightRef = useRef(null)
  const spotTargetRef = useRef(null)
  const katanaRef = useRef()

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
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: '#000000', pointerEvents: 'none' }}
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
        <AnimatedKatana katanaRef={katanaRef} />
      </Canvas>
    </div>
  )
}
