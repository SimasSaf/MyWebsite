import * as THREE from "three";

export const setupCamera = () => {
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(1, 1, -1);
  return camera;
};
