export const setupEventHandlers = (stateRef) => {
  const s = stateRef.current;

  s.onResize = () => {
    s.renderer.setSize(window.innerWidth, window.innerHeight);
    s.camera.aspect = window.innerWidth / window.innerHeight;
    s.camera.updateProjectionMatrix();
  };

  s.onMouseMove = (event) => {
    const deltaX = event.movementX || 0;
    const deltaY = event.movementY || 0;
    const sensitivity = 0.0001;

    s.targetRotation.y -= deltaX * sensitivity;
    s.targetRotation.x -= deltaY * sensitivity;

    const maxPitch = Math.PI / 2 - 0.1;
    s.targetRotation.x = Math.max(-maxPitch, Math.min(maxPitch, s.targetRotation.x));

    s.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    s.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    s.raycaster.setFromCamera(s.mouse, s.camera);

    if (s.mouse.x < -0.68 && s.mouse.y < 0.25) {
      s.raycaster.ray.at(2 - s.mouse.x * 5, s.intersectPoint);
    } else {
      s.raycaster.ray.at(2 - s.mouse.x * 1, s.intersectPoint);
    }

    s.lightTarget.copy(s.intersectPoint);
  };


  window.addEventListener("resize", s.onResize);
  window.addEventListener("mousemove", s.onMouseMove);
  window.addEventListener("click", s.onClick);
};
