import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import NamePlate from "./components/NamePlate";
import RoleCallout from "./components/RoleCallout";
import { profile } from "../../data/profile";
import "../../styles/avatar-scene.css";
import Avatar from "../../avatar/Avatar";
import AvatarCamera from "../../avatar/AvatarCamera";
import GridOverlay from "../../components/GridOverlay";
import HelpButton from "../../components/HelpButton";

interface MainLandingViewProps {
  onEnter: () => void;
}

export default function MainLandingView({ onEnter }: MainLandingViewProps) {
  const avatarRef = useRef<THREE.Object3D>(null);

  return (
    <div className="avatar-scene-container bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950">
      <GridOverlay />
      <HelpButton tips={["Click on Avatar to view details"]} />
      <Canvas style={{ width: "100%", height: "100%", display: "block" }}>
        <AvatarCamera preset="landing" />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 2]} intensity={1.2} />
        <Suspense fallback={null}>
          <group>
            <NamePlate name={profile.name} headline={profile.title} />
            <Avatar ref={avatarRef} mainView={true} onAvatarClick={onEnter} />
            <RoleCallout roles={profile.roles} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
