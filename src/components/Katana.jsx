import { forwardRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'

const Katana = forwardRef(function Katana(props, ref) {
  const bladeGeometry = useMemo(() => {
    const bladeLength = 3.18
    const baseHalfWidth = 0.042
    const tipInset = 0.18

    const shape = new THREE.Shape()
    shape.moveTo(-baseHalfWidth, -bladeLength / 2)
    shape.lineTo(baseHalfWidth, -bladeLength / 2)
    shape.lineTo(baseHalfWidth * 0.9, bladeLength / 2 - tipInset)
    shape.lineTo(0.012, bladeLength / 2 - 0.04)
    shape.lineTo(0, bladeLength / 2)
    shape.lineTo(-0.012, bladeLength / 2 - 0.04)
    shape.lineTo(-baseHalfWidth * 0.9, bladeLength / 2 - tipInset)
    shape.closePath()

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.014,
      bevelEnabled: true,
      bevelThickness: 0.0016,
      bevelSize: 0.0014,
      bevelOffset: 0,
      bevelSegments: 2,
      curveSegments: 32,
      steps: 1,
    })
  }, [])

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

  const bladeNormalMap = useMemo(() => {
    const size = 512
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')

    if (ctx) {
      ctx.fillStyle = 'rgb(127,127,255)'
      ctx.fillRect(0, 0, size, size)

      for (let y = 0; y < size; y += 8) {
        const wobble = Math.sin(y * 0.09) * 6
        ctx.strokeStyle = `rgb(${127 + Math.floor(Math.sin(y * 0.04) * 10)},${127 + Math.floor(Math.cos(y * 0.05) * 10)},255)`
        ctx.globalAlpha = 0.22
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, y + wobble)
        ctx.lineTo(size, y + wobble + 1)
        ctx.stroke()
      }

      ctx.globalAlpha = 0.12
      for (let i = 0; i < 2000; i += 1) {
        const x = Math.random() * size
        const y = Math.random() * size
        const radius = Math.random() * 0.8 + 0.2
        ctx.fillStyle = `rgb(${130 + Math.random() * 10},${122 + Math.random() * 8},255)`
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(1, 5)
    texture.anisotropy = 8
    texture.needsUpdate = true
    return texture
  }, [])

  useEffect(
    () => () => {
      bladeGeometry.dispose()
      tsubaGeometry.dispose()
      bladeNormalMap.dispose()
    },
    [bladeGeometry, tsubaGeometry, bladeNormalMap]
  )

  return (
    <group ref={ref} {...props}>
      <group name="blade-group" position={[0, 0, -0.007]}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow geometry={bladeGeometry}>
          <meshStandardMaterial
            color="#e6ebf2"
            metalness={1}
            roughness={0.05}
            envMapIntensity={2.5}
            normalMap={bladeNormalMap}
            normalScale={new THREE.Vector2(0.08, 0.24)}
          />
        </mesh>

        <mesh position={[0.036, 0.0, 0.001]}>
          <boxGeometry args={[0.0035, 2.95, 0.0016]} />
          <meshStandardMaterial
            color="#f7fbff"
            emissive="#d8f0ff"
            emissiveIntensity={0.35}
            metalness={1}
            roughness={0.08}
          />
        </mesh>
      </group>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.56, -0.02]} geometry={tsubaGeometry} castShadow>
        <meshStandardMaterial color="#2b2b2f" metalness={0.95} roughness={0.18} />
      </mesh>

      <mesh position={[0, -2.02, 0]} castShadow>
        <cylinderGeometry args={[0.046, 0.052, 0.88, 28]} />
        <meshStandardMaterial color="#1d120a" metalness={0.2} roughness={0.72} />
      </mesh>

      <mesh position={[0, -2.52, 0]} castShadow>
        <cylinderGeometry args={[0.042, 0.064, 0.11, 24]} />
        <meshStandardMaterial color="#2d2d2d" metalness={0.85} roughness={0.25} />
      </mesh>
    </group>
  )
})

export default Katana
