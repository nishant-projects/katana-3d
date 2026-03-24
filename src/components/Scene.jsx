import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ background: '#000000' }}
    >
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <mesh>
        <boxGeometry args={[0.08, 3, 0.01]} />
        <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0.1} />
      </mesh>
    </Canvas>
  )
}
