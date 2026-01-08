import { Canvas, useThree } from "@react-three/fiber";
import Avatar from "./Avatar";
import "./Scene.css";
import { Suspense, useEffect, useState, useRef } from "react";
import * as THREE from "three";
import NamePlate from "../components/avatar/NamePlate";
import { profile } from "../data/profile";
import RoleCallout from "../components/avatar/RoleCallout";
import LeftPanel3D from "./LeftPanel3D";
import { getAvatarMetrics, type AvatarMetrics } from "./avatarMetrics";

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
  const avatarRef = useRef<THREE.Object3D>(null);
  const PanelsHost = ({ mainView }: { mainView: boolean }) => {
    const { camera, size } = useThree();
    const [metrics, setMetrics] = useState<AvatarMetrics | undefined>(
      undefined
    );

    useEffect(() => {
      // Recompute when entering panel view and on resize
      if (!mainView && avatarRef.current) {
        const m = getAvatarMetrics(avatarRef.current, camera, size);
        setMetrics(m);
        if (m) console.log("PanelsHost: computed avatar metrics", m);
      } else {
        setMetrics(undefined);
      }
    }, [mainView, camera, size]);

    if (!mainView) {
      return <LeftPanel3D avatarMetrics={metrics} />;
    }
    return null;
  };
  return (
    <div className="avatar-scene-container">
      <Canvas style={{ width: "100%", height: "100%", display: "block" }}>
        <DebugSize />
        <CameraController />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 2]} intensity={1.2} />
        <Suspense fallback={null}>
          <group>
            {mainView && (
              <NamePlate
                name={profile.name}
                headline={profile.identity.title}
              />
            )}
            <PanelsHost mainView={mainView} />
            <Avatar
              ref={avatarRef}
              mainView={mainView}
              onAvatarClick={handleAvatarClick}
            />

            {mainView && <RoleCallout roles={profile.hero.roleFacets} />}
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
