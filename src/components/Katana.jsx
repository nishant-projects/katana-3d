import { forwardRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { MeshTransmissionMaterial } from '@react-three/drei'

const Katana = forwardRef(function Katana(props, ref) {
  const tsubaGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.absellipse(0, 0, 0.24, 0.16, 0, Math.PI * 2, false, 0)

    const centerCutout = new THREE.Path()
    centerCutout.absellipse(0, 0, 0.045, 0.02, 0, Math.PI * 2, true, 0)
    shape.holes.push(centerCutout)

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.045,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.004,
      bevelSegments: 2,
      curveSegments: 24,
    })
  }, [])

  useEffect(() => {
    if (!ref || typeof ref === 'function' || !ref.current) return

    const bladeGroup = ref.current.getObjectByName('blade-group')
    const glintLight = ref.current.getObjectByName('blade-glint')

    ref.current.userData.bladeGroup = bladeGroup
    ref.current.userData.glintLight = glintLight
  }, [ref])

  return (
    <group ref={ref} {...props}>
      <group name="blade-group" position={[0, 0, 0]}>
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.09, 3.4, 0.016]} />
          <meshStandardMaterial color="#dce1e8" metalness={1} roughness={0.05} envMapIntensity={1.6} />
        </mesh>

        <mesh position={[0, 0.1, 0.011]}>
          <boxGeometry args={[0.087, 3.2, 0.003]} />
          <MeshTransmissionMaterial
            thickness={0.08}
            transmission={0.95}
            roughness={0.12}
            ior={1.25}
            chromaticAberration={0.02}
            anisotropy={0.25}
            clearcoat={1}
            clearcoatRoughness={0.08}
            color="#ffffff"
            attenuationColor="#f4f8ff"
            attenuationDistance={0.8}
          />
        </mesh>

        <pointLight
          name="blade-glint"
          position={[0.06, 1.4, 0.2]}
          intensity={1.9}
          distance={2.8}
          decay={2}
          color="#dff2ff"
        />
      </group>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.68, -0.022]} geometry={tsubaGeometry}>
        <meshStandardMaterial color="#2b2b2f" metalness={0.95} roughness={0.18} />
      </mesh>

      <mesh position={[0, -2.22, 0]}>
        <cylinderGeometry args={[0.05, 0.055, 1.05, 24]} />
        <meshStandardMaterial color="#1d120a" metalness={0.2} roughness={0.75} />
      </mesh>

      <mesh position={[0, -2.8, 0]}>
        <cylinderGeometry args={[0.045, 0.07, 0.12, 24]} />
        <meshStandardMaterial color="#2d2d2d" metalness={0.85} roughness={0.25} />
      </mesh>
    </group>
  )
})

export default Katana
