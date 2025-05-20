import * as THREE from "three";

export const animate = (stateRef) => {
  const s = stateRef.current;
  const smoothFactor = 0.1;
  const lightSmoothFactor = 0.05;

  const renderLoop = () => {
    requestAnimationFrame(renderLoop);

    s.camera.rotation.x = THREE.MathUtils.lerp(s.camera.rotation.x, s.targetRotation.x, smoothFactor);
    s.camera.rotation.y = THREE.MathUtils.lerp(s.camera.rotation.y, s.targetRotation.y, smoothFactor);

    if (s.pointLight) {
      s.pointLight.position.lerp(s.lightTarget, lightSmoothFactor);
    }

    if (s.mixer) {
      const delta = s.clock.getDelta();
      s.mixer.update(delta);
    }

    s.renderer.render(s.scene, s.camera);
  };

  renderLoop();
};
