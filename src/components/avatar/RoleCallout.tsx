import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import type { RoleFacet } from "../../data/profile";

type RoleCalloutProps = {
  roles: RoleFacet[];
};

// seconds
const IN = 2.5;
const HOLD = 5.0;
const OUT = 2.5;
const GAP = 1.5;
const TOTAL = IN + HOLD + OUT + GAP;
const MIN_SCALE = 0.8;

export default function RoleCallout({ roles }: RoleCalloutProps) {
  const groupRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Mesh>(null);
  const { camera, clock } = useThree();

  const [index, setIndex] = useState(0);
  const startTime = useRef(clock.getElapsedTime());

  useFrame(() => {
    if (!groupRef.current || !textRef.current) return;

    // billboard
    groupRef.current.lookAt(camera.position);

    const now = clock.getElapsedTime();
    const t = now - startTime.current;

    let opacity = 0;
    let scale = MIN_SCALE;

    if (t < IN) {
      // zoom in
      const k = THREE.MathUtils.smoothstep(t / IN, 0, 1);
      opacity = k;
      scale = THREE.MathUtils.lerp(MIN_SCALE, 1, k);
    } else if (t < IN + HOLD) {
      // hold
      opacity = 1;
      scale = 1;
    } else if (t < IN + HOLD + OUT) {
      // zoom out
      const k = THREE.MathUtils.smoothstep((t - IN - HOLD) / OUT, 0, 1);
      opacity = 1 - k;
      scale = THREE.MathUtils.lerp(1, MIN_SCALE, k);
    } else {
      // gap
      opacity = 0;
      scale = MIN_SCALE;
    }

    groupRef.current.scale.setScalar(scale);
    (textRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;

    // advance role only after full cycle
    if (t > TOTAL) {
      startTime.current = now;
      setIndex((i) => (i + 1) % roles.length);
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.85, 0.25]}>
      <Text
        ref={textRef}
        font="/VT323-Regular.ttf"
        fontSize={0.16}
        letterSpacing={0.04}
        color="#D6DAE8"
        anchorX="center"
        anchorY="middle"
        material-transparent
        material-opacity={0}
      >
        {roles[index].title}
      </Text>
    </group>
  );
}
