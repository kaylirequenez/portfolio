import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { a, SpringValue, useSpring } from "@react-spring/three";

type NamePlateProps = {
  name: string;
  headline: string;
};

export default function NamePlate({ name, headline }: NamePlateProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera, clock } = useThree();

  /* ---------------- Always centered above avatar ---------------- */
  const { position } = useSpring({
    position: [0, 1, 0.3],
    config: { tension: 120, friction: 16 },
  });

  /* ---------------- Billboard + subtle float ---------------- */
  useFrame(() => {
    if (!groupRef.current) return;

    // Always face camera
    groupRef.current.lookAt(camera.position);

    // Subtle idle float (Y offset only)
    const t = clock.getElapsedTime();
    groupRef.current.position.y = position.get()[1] + Math.sin(t * 1.2) * 0.025;
  });

  return (
    <a.group
      ref={groupRef}
      position={position as unknown as SpringValue<[number, number, number]>}
    >
      {/* Shadow pass */}
      <Text
        font="/VT323-Regular.ttf"
        fontSize={0.36}
        color="#5EE6D6"
        anchorX="center"
        anchorY="middle"
        position={[0, 0.05, -0.01]}
        material={
          new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0.25,
          })
        }
      >
        {name.toUpperCase()}
      </Text>

      {/* Main name */}
      <Text
        font="/VT323-Regular.ttf"
        fontSize={0.35}
        color="#EAEAF0"
        anchorX="center"
        anchorY="middle"
        position={[0, 0.08, 0]}
      >
        {name.toUpperCase()}
      </Text>

      {/* Headline */}
      <Text
        font="/VT323-Regular.ttf"
        fontSize={0.09}
        letterSpacing={0.03}
        color="#8F94AA"
        anchorX="center"
        anchorY="middle"
        position={[0, -0.21, 0]}
      >
        {headline}
      </Text>
    </a.group>
  );
}
