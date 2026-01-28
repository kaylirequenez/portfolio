import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

type CameraPreset = "landing" | "detail";

const CAMERA_PRESETS: Record<
  CameraPreset,
  { position: [number, number, number]; lookAt: [number, number, number] }
> = {
  landing: {
    position: [0, 0.5, 2.7],
    lookAt: [0, -0.2, 0],
  },
  detail: {
    position: [0, 1.05, 2.1],
    lookAt: [0, 0.65, 0],
  },
};

interface AvatarCameraProps {
  preset: CameraPreset;
}

export default function AvatarCamera({ preset }: AvatarCameraProps) {
  const { camera, size } = useThree();

  useEffect(() => {
    const { position, lookAt } = CAMERA_PRESETS[preset];

    // Adjust camera for mobile/compact screens
    const isMobile = size.width < 768;
    const isCompact = size.height < 600;

    let adjustedPosition: [number, number, number] = [...position];
    let adjustedLookAt: [number, number, number] = [...lookAt];

    if (preset === "landing") {
      if (isMobile) {
        // Move camera closer and adjust for mobile
        adjustedPosition = [0, 0.3, 2.2];
        adjustedLookAt = [0, -0.3, 0];
      } else if (isCompact) {
        // Adjust for compact height
        adjustedPosition = [0, 0.4, 2.4];
        adjustedLookAt = [0, -0.25, 0];
      }
    }

    camera.position.set(...adjustedPosition);
    camera.lookAt(...adjustedLookAt);
    camera.updateProjectionMatrix();
  }, [camera, preset, size.width, size.height]);

  return null;
}
