import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer } from "three";

export const loadModel = (stateRef) => {
  const s = stateRef.current;
  const loader = new GLTFLoader();

  loader.load(
    "/assets/room.glb",
    (gltf) => {
      s.model = gltf.scene;
      s.model.traverse((child) => {
        if (child.isMesh) {
          child.userData.originalMaterial ??= child.material.clone();
        }
      });
      s.scene.add(s.model);

      if (gltf.animations.length > 0) {
        s.mixer = new AnimationMixer(s.model);
        const action = s.mixer.clipAction(gltf.animations[0]);
        action.play();
      }
    },
    undefined,
    (err) => console.error("Error loading GLB:", err)
  );
};
