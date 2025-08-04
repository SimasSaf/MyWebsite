import * as THREE from 'three';

export const outlineObject = (object) => {
  if (!object || !object.isMesh) return;

  console.log(`outlining ${object.name}...`);

  const existingOutline = object.children.find(
    (child) => child.userData.isOutline
  );
  if (existingOutline) return;

  const outline = new THREE.Mesh(
    object.geometry.clone(),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.BackSide,
      depthWrite: false,
    })
  );

  outline.scale.multiplyScalar(1.05);
  outline.userData.isOutline = true;

  object.add(outline);
};

export const removeOutline = (object) => {
  if (!object || !object.isMesh) return;

  const outline = object.children.find(
    (child) => child.userData.isOutline
  );

  if (outline) {
    object.remove(outline);
    outline.geometry.dispose();
    outline.material.dispose();
  }
};
