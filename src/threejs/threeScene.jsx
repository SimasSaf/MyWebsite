import { useEffect, useRef } from "react";
import * as THREE from "three";
import { setupCamera } from "./setupCamera";
import { setupRenderer } from "./setupRenderer";
import { setupLighting } from "./setupLighting";
import { setupEventHandlers } from "./eventHandlers";
import { loadModel } from "./loadModel";
import { setupLookingAroundCamera } from "./setupLookingAroundCamera";
import { selectObject } from "./selectObject";

const ThreeScene = () => {
  const mountRef = useRef(null);

  const state = useRef({
    model: null,
    mixer: null,
    pointLight: null,
    raycaster: new THREE.Raycaster(),
    lightTarget: new THREE.Vector3(),
    intersectPoint: new THREE.Vector3(),
    clock: new THREE.Clock(),
    renderer: null,
    camera: null,
    scene: null,
    targetRotation: new THREE.Euler(0, -0.6, 0),
    mouse: new THREE.Vector2(),
    selectedObject: null,
    outlinedObject: null,
  });

  useEffect(() => {
    const { current: s } = state; //instead of state.current. s. is used

    //setup
    s.scene = new THREE.Scene();
    s.camera = setupCamera();
    s.renderer = setupRenderer();
    mountRef.current.appendChild(s.renderer.domElement);

    setupLighting(s);
    setupEventHandlers(state);
    loadModel(state);
    setupLookingAroundCamera(state);

    selectObject(s);

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(s.renderer.domElement);
      }
      window.removeEventListener("mousemove", s.onMouseMove);
      window.removeEventListener("resize", s.onResize);
    };
  }, []);

  return <div className="threeScene" ref={mountRef} />;
};

export default ThreeScene;
