import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import NamePlate from "./MainLanding/NamePlate";
import RoleCallout from "./MainLanding/RoleCallout";
import { profile } from "../data/profile";
import "../styles/avatar-scene.css";
import Avatar from "../models/Avatar";

function CameraController() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 0.5, 2.7);
    camera.lookAt(0, -0.2, 0);
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
}

interface MainLandingViewProps {
  onEnter: () => void;
}

export default function MainLandingView({ onEnter }: MainLandingViewProps) {
  const avatarRef = useRef<THREE.Object3D>(null);

  return (
    <div className="avatar-scene-container">
      <Canvas style={{ width: "100%", height: "100%", display: "block" }}>
        <CameraController />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 2]} intensity={1.2} />
        <Suspense fallback={null}>
          <group>
            <NamePlate name={profile.name} headline={profile.title} />
            <Avatar ref={avatarRef} mainView={true} onAvatarClick={onEnter} />
            <RoleCallout roles={profile.roleFacets} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
