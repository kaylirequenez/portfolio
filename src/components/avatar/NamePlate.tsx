import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type NamePlateProps = {
  name: string;
  headline: string;
};

export default function NamePlate({ name, headline }: NamePlateProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera, clock } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;

    // Always face the camera
    groupRef.current.lookAt(camera.position);

    // Subtle idle float
    const t = clock.getElapsedTime();
    groupRef.current.position.y = 1 + Math.sin(t * 1.2) * 0.025;
  });

  return (
    <group ref={groupRef} position={[0, 1, 0.3]}>
      {/* Shadow pass (depth) */}
      <Text
        font="/VT323-Regular.ttf"
        fontSize={0.36}
        color="#5EE6D6"
        anchorX="center"
        anchorY="middle"
        position={[0, 0.115, -0.01]}
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
        position={[0, 0.14, 0]}
      >
        {name.toUpperCase()}
      </Text>

      {/* HEADLINE */}
      <Text
        font="/VT323-Regular.ttf"
        fontSize={0.09}
        letterSpacing={0.03}
        color="#8F94AA"
        anchorX="center"
        anchorY="middle"
        position={[0, -0.1, 0]}
      >
        {headline}
      </Text>
    </group>
  );
}
