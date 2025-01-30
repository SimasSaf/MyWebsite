import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { createShaderMaterial } from "./createShaderMaterial"; // ✅ Import Shader

const ThreeScene = () => {
  const mountRef = useRef(null);
  let model = null;
  let mixer = null;
  let pointLight = null;
  let pointLightFish = null;
  let raycaster = new THREE.Raycaster();
  let lightTarget = new THREE.Vector3();
  let intersectPoint = new THREE.Vector3();
  let clock = new THREE.Clock();

  let renderer, camera, scene;
  const sensitivity = 0.0001;
  let targetRotation = new THREE.Euler(0, -0.6, 0);
  let smoothFactor = 0.1;
  let lightSmoothFactor = 0.05;
  let mouse = new THREE.Vector2();
  let shaderEnabled = false;

  useEffect(() => {
    scene = new THREE.Scene();
    camera = setupCamera();
    renderer = setupRenderer();
    mountRef.current.appendChild(renderer.domElement);

    setupLighting(scene);
    setupEventListeners();
    loadModel(scene);

    animate();

    return () => cleanup();
  }, []);

  const setupCamera = () => {
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(1, 1, -1);
    return camera;
  };

  const setupRenderer = () => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
    return renderer;
  };

  const setupLighting = (scene) => {
    scene.background = new THREE.Color(0x06aee8);
    scene.add(new THREE.AmbientLight(0xe5a6ed, 0.5));

    pointLight = new THREE.PointLight(0xffaa33, 2, 50);
    pointLight.position.set(2, 2, 5);
    scene.add(pointLight);
  };

  const onResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };

  const onMouseMove = (event) => {
    const deltaX = event.movementX || 0;
    const deltaY = event.movementY || 0;

    targetRotation.y -= deltaX * sensitivity;
    targetRotation.x -= deltaY * sensitivity;

    const maxPitch = Math.PI / 2 - 0.1;
    targetRotation.x = Math.max(
      -maxPitch,
      Math.min(maxPitch, targetRotation.x)
    );

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    if (mouse.x < -0.68 && mouse.y < 0.25) {
      raycaster.ray.at(2 - mouse.x * 5, intersectPoint);
    } else {
      raycaster.ray.at(2 - mouse.x * 1, intersectPoint);
    }
    lightTarget.copy(intersectPoint);
  };

  const setupEventListeners = () => {
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);

    const button = document.getElementById("underConstruction");
    if (button) {
      button.addEventListener("click", toggleShader); // ✅ Listen to button click only
    }
  };

  const loadModel = (scene) => {
    const loader = new GLTFLoader();
    loader.load(
      "/assets/room.glb",
      (gltf) => {
        model = gltf.scene;
        model.traverse((child) => {
          if (child.isMesh) {
            if (!child.userData.originalMaterial) {
              child.userData.originalMaterial = child.material.clone();
            }
          }
        });
        scene.add(model);

        if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
        }
      },
      undefined,
      (error) => console.error("Error loading GLB:", error)
    );
  };

  const toggleShader = () => {
    if (!model) return; // Ensure model is loaded

    model.traverse((child) => {
      if (child.isMesh) {
        if (shaderEnabled) {
          if (child.userData.originalMaterial) {
            child.material = child.userData.originalMaterial;
          }
        } else {
          child.material = createShaderMaterial();
        }
      }
    });

    shaderEnabled = !shaderEnabled; // Toggle state
  };

  const animate = () => {
    const renderLoop = () => {
      requestAnimationFrame(renderLoop);

      const time = performance.now() * 0.001;

      camera.rotation.x = THREE.MathUtils.lerp(
        camera.rotation.x,
        targetRotation.x,
        smoothFactor
      );
      camera.rotation.y = THREE.MathUtils.lerp(
        camera.rotation.y,
        targetRotation.y,
        smoothFactor
      );

      if (pointLight) {
        pointLight.position.lerp(lightTarget, lightSmoothFactor);
      }

      if (mixer) {
        const delta = clock.getDelta();
        mixer.update(delta);
      }

      renderer.render(scene, camera);
    };
    renderLoop();
  };

  const cleanup = () => {
    if (mountRef.current) {
      mountRef.current.removeChild(renderer.domElement);
    }
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("resize", onResize);

    const button = document.getElementById("underConstruction");
    if (button) {
      button.removeEventListener("click", toggleShader);
    }
  };

  return <div className="threeScene" ref={mountRef} />;
};

export default ThreeScene;
