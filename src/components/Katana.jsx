import { useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useScroll } from "@react-three/drei";
import gsap from "gsap";

export function KatanaModel() {
  const group = useRef();
  const blade = useRef(); // Reference specifically to the blade mesh
  const scroll = useScroll();
  const tl = useRef();

  // Load your model (ensure it's in /public)
  const { nodes, materials } = useGLTF("/katana.glb");

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    // The Animation: Unsheathe as we scroll from 0 to 1
    tl.current.to(blade.current.position, {
      z: 1.5, // Slide out on Z axis
      duration: 2,
      ease: "power2.inOut"
    }, 0);

    // Rotate the whole sword slightly for drama
    tl.current.to(group.current.rotation, {
      y: Math.PI * 2,
      duration: 2
    }, 0);
  }, []);

  useFrame(() => {
    // This connects the GSAP timeline to the Drei scroll progress
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  return (
    <group ref={group}>
      <mesh ref={blade} geometry={nodes.Blade.geometry} material={materials.Steel} />
      <mesh geometry={nodes.Scabbard.geometry} material={materials.Wood} />
    </group>
  );
}
