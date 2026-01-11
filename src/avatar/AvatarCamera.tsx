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
  const { camera } = useThree();

  useEffect(() => {
    const { position, lookAt } = CAMERA_PRESETS[preset];

    camera.position.set(...position);
    camera.lookAt(...lookAt);
    camera.updateProjectionMatrix();
  }, [camera, preset]);

  return null;
}
