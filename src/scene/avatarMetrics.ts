import * as THREE from "three";

export type AvatarMetrics = {
  topPx: number; // Distance from top of screen to top of avatar
  bottomSpacePx: number; // Distance from bottom of avatar to bottom of screen
  avatarHeightPx: number; // Height of the avatar in pixels
  leftPx: number; // Distance from left edge of screen to left edge of avatar
};

export function getAvatarMetrics(
  avatar: THREE.Object3D | null | undefined,
  camera: THREE.Camera,
  size: { width: number; height: number }
): AvatarMetrics | undefined {
  if (!avatar) return undefined;

  const box = new THREE.Box3().setFromObject(avatar);
  const corners = [
    new THREE.Vector3(box.min.x, box.min.y, box.min.z),
    new THREE.Vector3(box.min.x, box.max.y, box.min.z),
    new THREE.Vector3(box.min.x, box.min.y, box.max.z),
    new THREE.Vector3(box.min.x, box.max.y, box.max.z),
    new THREE.Vector3(box.max.x, box.min.y, box.min.z),
    new THREE.Vector3(box.max.x, box.max.y, box.min.z),
    new THREE.Vector3(box.max.x, box.min.y, box.max.z),
    new THREE.Vector3(box.max.x, box.max.y, box.max.z),
  ];

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const c of corners) {
    const projected = c.clone().project(camera);
    const pxX = (projected.x * 0.5 + 0.5) * size.width;
    const pxY = (-projected.y * 0.5 + 0.5) * size.height;
    minX = Math.min(minX, pxX);
    maxX = Math.max(maxX, pxX);
    minY = Math.min(minY, pxY);
    maxY = Math.max(maxY, pxY);
  }

  return {
    topPx: Math.max(0, minY),
    bottomSpacePx: Math.max(0, size.height - maxY),
    avatarHeightPx: Math.max(0, maxY - minY),
    leftPx: Math.max(0, minX),
  };
}
