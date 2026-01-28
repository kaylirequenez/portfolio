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
  const { camera, clock, size } = useThree();

  // Calculate responsive font sizes based on viewport width
  const isMobile = size.width < 768;
  const isCompact = size.width < 480;
  const isShort = size.height < 600;
  
  // Base sizes, scaled down for mobile
  const nameFontSize = isCompact ? 0.24 : isMobile ? 0.28 : 0.36;
  const nameFontSizeMain = isCompact ? 0.23 : isMobile ? 0.27 : 0.35;
  const headlineFontSize = isCompact ? 0.06 : isMobile ? 0.07 : 0.09;
  const headlineLetterSpacing = isCompact ? 0.02 : isMobile ? 0.025 : 0.03;

  /* ---------------- Always centered above avatar ---------------- */
  // Adjust vertical position for smaller screens - lower it to prevent cutoff
  const nameplateY = isShort ? 0.6 : isMobile ? 0.7 : 1.0;
  const { position } = useSpring({
    position: [0, nameplateY, 0.3],
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
        font="/fonts/VT323-Regular.ttf"
        fontSize={nameFontSize}
        color="#5EE6D6"
        anchorX="center"
        anchorY="middle"
        position={[0, 0.175, -0.01]}
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
        font="/fonts/VT323-Regular.ttf"
        fontSize={nameFontSizeMain}
        color="#EAEAF0"
        anchorX="center"
        anchorY="middle"
        position={[0, 0.2, 0]}
      >
        {name.toUpperCase()}
      </Text>

      {/* Headline */}
      <Text
        font="/fonts/VT323-Regular.ttf"
        fontSize={headlineFontSize}
        letterSpacing={headlineLetterSpacing}
        color="#8F94AA"
        anchorX="center"
        anchorY="middle"
        position={[0, -0.1, 0]}
        maxWidth={isMobile ? 2.5 : 4}
      >
        {headline}
      </Text>
    </a.group>
  );
}
