import { forwardRef, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { KatanaHamonMaterial } from './KatanaShaderMaterial'

const BLADE_LENGTH = 3.2
const BLADE_BASE_WIDTH = 0.09
const BLADE_THICKNESS = 0.012
const BLADE_BASE_Y = -1.55
const BLADE_TIP_Y = BLADE_BASE_Y + BLADE_LENGTH
const BLADE_HALF_THICKNESS = BLADE_THICKNESS / 2

void KatanaHamonMaterial

const Katana = forwardRef(function Katana(props, ref) {
  const hamonRef = useRef()

  useFrame((_, delta) => {
    if (hamonRef.current) {
      hamonRef.current.uTime += delta
    }
  })

  const bladeGeometry = useMemo(() => {
    const halfBaseWidth = BLADE_BASE_WIDTH / 2

    const positions = new Float32Array([
      -halfBaseWidth,
      BLADE_BASE_Y,
      BLADE_HALF_THICKNESS,
      halfBaseWidth,
      BLADE_BASE_Y,
      BLADE_HALF_THICKNESS,
      -halfBaseWidth,
      BLADE_BASE_Y,
      -BLADE_HALF_THICKNESS,
      halfBaseWidth,
      BLADE_BASE_Y,
      -BLADE_HALF_THICKNESS,
      0,
      BLADE_TIP_Y,
      BLADE_HALF_THICKNESS,
      0,
      BLADE_TIP_Y,
      -BLADE_HALF_THICKNESS,
    ])

    const indices = [
      0, 2, 1,
      1, 2, 3,
      0, 1, 4,
      2, 5, 3,
      0, 4, 2,
      2, 4, 5,
      1, 3, 4,
      3, 5, 4,
    ]

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()

    return geometry
  }, [])

  return (
    <group ref={ref} frustumCulled={false} {...props}>
      <group rotation={[0, 0, 0.02]}>
        <mesh geometry={bladeGeometry}>
          <katanaHamonMaterial ref={hamonRef} />
        </mesh>

        <mesh position={[-0.028, -0.15, BLADE_HALF_THICKNESS + 0.0006]}>
          <planeGeometry args={[0.003, 2.8]} />
          <meshStandardMaterial
            color="#e8e8e8"
            emissive="#ffffff"
            emissiveIntensity={0.3}
            metalness={0.15}
            roughness={0.2}
          />
        </mesh>
      </group>

      <mesh position={[0, -1.55, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.03, 8]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
      </mesh>

      <mesh position={[0, -1.98, 0]}>
        <cylinderGeometry args={[0.045, 0.055, 0.85, 24]} />
        <meshStandardMaterial color="#1a0a00" metalness={0} roughness={0.9} />
      </mesh>

      <mesh position={[0, -2.44, 0]}>
        <cylinderGeometry args={[0.04, 0.065, 0.08, 24]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  )
})

export default Katana
