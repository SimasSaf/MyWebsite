import * as THREE from "three";

export const setupLighting = (state) => {
  const { scene } = state;
  scene.background = new THREE.Color(0x06aee8);
  scene.add(new THREE.AmbientLight(0xe5a6ed, 0.5));

  const pointLight = new THREE.PointLight(0xffaa33, 2, 50);
  pointLight.position.set(2, 2, 5);
  scene.add(pointLight);
  state.pointLight = pointLight;
};
