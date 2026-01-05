import { useRef, useLayoutEffect, useEffect } from "react";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import type { GLTF } from "three-stdlib";
import { a, useSpring } from "@react-spring/three";
import avatar from "../assets/avatar.glb?url";
import { useFrame, useThree } from "@react-three/fiber";
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

const Avatar = ({ mainView, onAvatarClick, ...props }: AvatarProps) => {
  const avatarRef = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    avatar
  ) as unknown as GLTFResult;
  const { actions } = useAnimations(animations, avatarRef);
  const { viewport } = useThree();

  // Ensure the idle breathing animation always starts once the clip is available.
  useLayoutEffect(() => {
    const breathingAction = actions["breathing"] as THREE.AnimationAction;
    if (breathingAction) {
      console.log("Starting breathing animation");
      breathingAction.reset();
      breathingAction.setLoop(THREE.LoopRepeat, Infinity);
      breathingAction.fadeIn(0.5).play();
    } else {
      console.log(
        "Breathing action not found, available actions:",
        Object.keys(actions)
      );
    }
  }, [actions]);

  const centerX = 0;
  const leftHalfCenterX = -viewport.width / 4;

  // subtle correction: keep true visual center on wide screens
  const visualCenterX = -centerX * (viewport.width > 6 ? 0.02 : 0);

  const { position } = useSpring({
    position: mainView ? [visualCenterX, -1, 0] : [leftHalfCenterX, -1, 0],
    config: { mass: 1, tension: 120, friction: 14 },
  });

  useEffect(() => {
    if (mainView && avatarRef.current) {
      avatarRef.current.rotation.set(0, 0, 0);
    }
  }, [mainView]);

  useFrame((_, delta) => {
    if (!mainView && avatarRef.current) {
      avatarRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <a.group
      ref={avatarRef}
      {...props}
      position={position as unknown as SpringValue<[number, number, number]>}
      onClick={(e) => {
        e.stopPropagation();
        onAvatarClick?.();
      }}
    >
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

export default Avatar;
