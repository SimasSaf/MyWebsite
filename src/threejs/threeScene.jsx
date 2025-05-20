import { useEffect, useRef } from "react";
import * as THREE from "three";
import { setupCamera } from "./setupCamera";
import { setupRenderer } from "./setupRenderer";
import { setupLighting } from "./setupLighting";
import { setupEventListeners } from "./eventHandlers";
import { loadModel } from "./loadModel";
import { toggleShader } from "./toggleShader";
import { animate } from "./animateCamera";

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
    shaderEnabled: false,
    renderer: null,
    camera: null,
    scene: null,
    targetRotation: new THREE.Euler(0, -0.6, 0),
    mouse: new THREE.Vector2(),
  });

  useEffect(() => {
    const { current: s } = state;

    s.scene = new THREE.Scene();
    s.camera = setupCamera();
    s.renderer = setupRenderer();
    mountRef.current.appendChild(s.renderer.domElement);

    setupLighting(s);
    setupEventListeners(state, toggleShader);
    loadModel(state);

    animate(state);

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(s.renderer.domElement);
      }
      window.removeEventListener("mousemove", s.onMouseMove);
      window.removeEventListener("resize", s.onResize);

      const button = document.getElementById("underConstruction");
      if (button) {
        button.removeEventListener("click", toggleShader);
      }
    };
  }, []);

  return <div className="threeScene" ref={mountRef} />;
};

export default ThreeScene;
