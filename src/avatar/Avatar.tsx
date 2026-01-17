import React, {
  useRef,
  useLayoutEffect,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { a, useSpring } from "@react-spring/three";
import avatar from "../assets/avatar.glb?url";
import { useFrame } from "@react-three/fiber";
import type { SpringValue } from "@react-spring/core";

type GLTFResult = GLTF & {
  nodes: {
    EyeLeft: THREE.SkinnedMesh;
    EyeRight: THREE.SkinnedMesh;
    Wolf3D_Head: THREE.SkinnedMesh;
    Wolf3D_Teeth: THREE.SkinnedMesh;
    Wolf3D_Hair: THREE.SkinnedMesh;
    Wolf3D_Glasses: THREE.SkinnedMesh;
    Wolf3D_Body: THREE.SkinnedMesh;
    Wolf3D_Outfit_Bottom: THREE.SkinnedMesh;
    Wolf3D_Outfit_Footwear: THREE.SkinnedMesh;
    Wolf3D_Outfit_Top: THREE.SkinnedMesh;
    Hips: THREE.Bone;
  };
  materials: {
    Wolf3D_Eye: THREE.MeshStandardMaterial;
    Wolf3D_Skin: THREE.MeshStandardMaterial;
    Wolf3D_Teeth: THREE.MeshStandardMaterial;
    Wolf3D_Hair: THREE.MeshStandardMaterial;
    Wolf3D_Glasses: THREE.MeshStandardMaterial;
    Wolf3D_Body: THREE.MeshStandardMaterial;
    Wolf3D_Outfit_Bottom: THREE.MeshStandardMaterial;
    Wolf3D_Outfit_Footwear: THREE.MeshStandardMaterial;
    Wolf3D_Outfit_Top: THREE.MeshStandardMaterial;
  };
};

type AvatarProps = {
  onAvatarClick?: () => void;
  mainView?: boolean;
} & React.ComponentProps<typeof a.group>;

const AvatarInner = (
  { mainView, onAvatarClick, ...props }: AvatarProps,
  ref: React.ForwardedRef<THREE.Object3D>,
) => {
  const avatarRef = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    avatar,
  ) as unknown as GLTFResult;
  const { actions } = useAnimations(animations, avatarRef);

  const [hovered, setHovered] = useState(false);

  /* ---------------- Idle breathing animation ---------------- */
  useLayoutEffect(() => {
    const breathingAction = actions["breathing"] as THREE.AnimationAction;
    if (breathingAction) {
      breathingAction.reset();
      breathingAction.setLoop(THREE.LoopRepeat, Infinity);
      breathingAction.fadeIn(0.5).play();
    }
  }, [actions]);

  /* ---------------- Position animation (keep centered always) ---------------- */
  const { position } = useSpring({
    position: mainView ? [0, -1.4, 0] : [0, 0.075, 0],
    config: { mass: 1, tension: 120, friction: 14 },
  });

  /* ---------------- Hover scale ---------------- */
  const { scale } = useSpring({
    scale: mainView ? (hovered ? 1.24 : 1.2) : hovered ? 0.65 : 0.63,
    config: { tension: 180, friction: 18 },
  });

  /* ---------------- Reset rotation when returning to main view ---------------- */
  useEffect(() => {
    if (mainView && avatarRef.current) {
      avatarRef.current.rotation.set(0, 0, 0);
    }
  }, [mainView]);

  /* ---------------- Close-up idle rotation ---------------- */
  useFrame((_, delta) => {
    if (!mainView && avatarRef.current) {
      avatarRef.current.rotation.y += delta * 0.6;
    }
  });

  // Expose the underlying group via forwarded ref
  useImperativeHandle(
    ref,
    () => avatarRef.current as unknown as THREE.Object3D,
    [avatarRef],
  );

  return (
    <a.group
      ref={avatarRef}
      {...props}
      position={position as unknown as SpringValue<[number, number, number]>}
      scale={scale as unknown as SpringValue<number>}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onAvatarClick?.();
      }}
    >
      {/* Subtle hover illumination */}
      <a.pointLight
        position={[0, 1.5, 1.5]}
        intensity={hovered ? 0.5 : 0}
        distance={4}
        color="#ffffff"
      />
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="EyeLeft"
        geometry={nodes.EyeLeft.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeLeft.skeleton}
        morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
      />
      <skinnedMesh
        name="EyeRight"
        geometry={nodes.EyeRight.geometry}
        material={materials.Wolf3D_Eye}
        skeleton={nodes.EyeRight.skeleton}
        morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
        morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Head"
        geometry={nodes.Wolf3D_Head.geometry}
        material={materials.Wolf3D_Skin}
        skeleton={nodes.Wolf3D_Head.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
      />
      <skinnedMesh
        name="Wolf3D_Teeth"
        geometry={nodes.Wolf3D_Teeth.geometry}
        material={materials.Wolf3D_Teeth}
        skeleton={nodes.Wolf3D_Teeth.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Hair.geometry}
        material={materials.Wolf3D_Hair}
        skeleton={nodes.Wolf3D_Hair.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Glasses.geometry}
        material={materials.Wolf3D_Glasses}
        skeleton={nodes.Wolf3D_Glasses.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Body.geometry}
        material={materials.Wolf3D_Body}
        skeleton={nodes.Wolf3D_Body.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
        material={materials.Wolf3D_Outfit_Bottom}
        skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
        material={materials.Wolf3D_Outfit_Footwear}
        skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
      />
      <skinnedMesh
        geometry={nodes.Wolf3D_Outfit_Top.geometry}
        material={materials.Wolf3D_Outfit_Top}
        skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
      />
    </a.group>
  );
};
AvatarInner.displayName = "Avatar";

export default forwardRef<THREE.Object3D, AvatarProps>(AvatarInner);
