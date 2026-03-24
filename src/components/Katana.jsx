import { forwardRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'

const BLOOM_LAYER = 10

const Katana = forwardRef(function Katana({ bladeEdgeRef, lightRefs, ...props }, ref) {
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
    const fillLight = ref.current.getObjectByName('blade-fill')

    ref.current.userData.bladeGroup = bladeGroup
    ref.current.userData.glintLight = glintLight

    if (bladeEdgeRef?.current) {
      bladeEdgeRef.current.layers.enable(BLOOM_LAYER)
    }

    if (lightRefs) {
      lightRefs.current = [glintLight, fillLight].filter(Boolean)
    }
  }, [ref, bladeEdgeRef, lightRefs])

  return (
    <group ref={ref} {...props}>
      <group name="blade-group" position={[0, 0, 0]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.085, 3.05, 0.015]} />
          <meshPhysicalMaterial
            color="#d8dde3"
            metalness={1}
            roughness={0.18}
            envMapIntensity={2.2}
            clearcoat={1}
            clearcoatRoughness={0.04}
            reflectivity={1}
          />
        </mesh>

        <mesh ref={bladeEdgeRef} position={[0.038, 0.08, 0.008]}>
          <boxGeometry args={[0.008, 2.75, 0.0025]} />
          <meshStandardMaterial
            color="#f6fbff"
            emissive="#e8f6ff"
            emissiveIntensity={1.15}
            metalness={0.95}
            roughness={0.12}
            toneMapped={false}
          />
        </mesh>

        <pointLight
          name="blade-glint"
          position={[0.06, 1.2, 0.2]}
          intensity={1.4}
          distance={2.8}
          decay={2}
          color="#dff3ff"
        />

        <spotLight
          name="blade-fill"
          position={[-0.18, 0.9, 0.75]}
          intensity={0.9}
          angle={0.34}
          penumbra={0.6}
          distance={4}
          color="#c7d7e8"
        />
      </group>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.56, -0.02]} geometry={tsubaGeometry}>
        <meshStandardMaterial color="#2b2b2f" metalness={0.95} roughness={0.18} />
      </mesh>

      <mesh position={[0, -2.02, 0]}>
        <cylinderGeometry args={[0.046, 0.052, 0.88, 24]} />
        <meshStandardMaterial color="#1d120a" metalness={0.2} roughness={0.75} />
      </mesh>

      <mesh position={[0, -2.52, 0]}>
        <cylinderGeometry args={[0.042, 0.064, 0.11, 24]} />
        <meshStandardMaterial color="#2d2d2d" metalness={0.85} roughness={0.25} />
      </mesh>
    </group>
  )
})

export default Katana
