import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

export const KatanaHamonMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorSpine: new THREE.Color('#1a1a1a'),
    uColorEdge: new THREE.Color('#d0d0d0'),
    uColorHamon: new THREE.Color('#f0f0f0'),
    uHamonHeight: 0.3,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewDirection;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      vViewDirection = normalize(cameraPosition - worldPos.xyz);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float uTime;
    uniform vec3 uColorSpine;
    uniform vec3 uColorEdge;
    uniform vec3 uColorHamon;
    uniform float uHamonHeight;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewDirection;

    float hash(float n) {
      return fract(sin(n) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash(i.x + i.y * 57.0);
      float b = hash(i.x + 1.0 + i.y * 57.0);
      float c = hash(i.x + (i.y + 1.0) * 57.0);
      float d = hash(i.x + 1.0 + (i.y + 1.0) * 57.0);
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    void main() {
      // Fresnel rim
      float fresnel = pow(1.0 - max(dot(vNormal, vViewDirection), 0.0), 3.0);

      // Hamon wavy line using noise on Y UV
      float n = noise(vec2(vUv.y * 8.0 + uTime * 0.05, uTime * 0.02));
      float hamonEdge = uHamonHeight + n * 0.08 - 0.04;
      float hamonLine = smoothstep(hamonEdge - 0.015, hamonEdge, vUv.x)
                      * (1.0 - smoothstep(hamonEdge, hamonEdge + 0.025, vUv.x));

      // Edge glow
      float edgeGlow = smoothstep(0.85, 1.0, vUv.x);

      // Base color: spine to edge gradient
      vec3 color = mix(uColorSpine, uColorEdge, pow(vUv.x, 0.4));

      // Add hamon bright line
      color = mix(color, uColorHamon, hamonLine * 2.0);

      // Edge brightness
      color += edgeGlow * 0.5;

      // Fresnel adds rim highlight
      color += fresnel * 0.4;

      // Subtle time shimmer
      float shimmer = sin(vUv.y * 20.0 + uTime * 0.3) * 0.02;
      color += shimmer;

      gl_FragColor = vec4(color, 1.0);
    }
  `
)

extend({ KatanaHamonMaterial })
