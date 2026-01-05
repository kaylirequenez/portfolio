import { Canvas, useThree } from "@react-three/fiber";
import Avatar from "./Avatar";
import "./Scene.css";
import { useEffect, useState } from "react";
function CameraController() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 0.5, 2.7);
    camera.lookAt(0, -0.2, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
}

function DebugSize() {
  const { size } = useThree();
  useEffect(() => {
    console.log("canvas size:", size.width, size.height);
  }, [size]);
  return null;
}
export default function AvatarScene() {
  const [mainView, setMainView] = useState(true);
  const handleAvatarClick = () => {
    setMainView(!mainView);
  };
  return (
    <div className="avatar-scene-container">
      <Canvas style={{ width: "100%", height: "100%", display: "block" }}>
        <DebugSize />
        <CameraController />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 7.5]} intensity={1} />
        <Avatar mainView={mainView} onAvatarClick={handleAvatarClick} />
      </Canvas>
    </div>
  );
}
