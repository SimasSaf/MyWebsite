import { createShaderMaterial } from "./createShaderMaterial";

export const toggleShader = (stateRef) => {
  const s = stateRef.current;
  if (!s.model) return;

  s.model.traverse((child) => {
    if (child.isMesh) {
      child.material = s.shaderEnabled
        ? child.userData.originalMaterial
        : createShaderMaterial();
    }
  });

  s.shaderEnabled = !s.shaderEnabled;
};
