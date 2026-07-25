import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function TreeJsVit() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // 1. Получаем canvas только здесь, когда ref уже привязан
    const canvas = canvasRef.current;
    if (!canvas) return;

    const sizes = { width: 300, height: 300 };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.set(0, 2, 5);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });


    renderer.setSize(sizes.width, sizes.height);
    renderer.shadowMap.enabled = true;
    renderer.setClearColor('white', 1); // <-- цвет фона (небесно‑голубой)
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    // --- Свет ---
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.61);
    dirLight.position.set(-8, 12, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    scene.add(dirLight);

    // --- Пол ---
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 5),
      new THREE.MeshStandardMaterial({
        color: "green",
        metalness: 0,
        roughness: 0.5,
      })
    );
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI * 0.5;
    scene.add(floor);

    // --- Фон ---
    const loader = new THREE.TextureLoader();
    loader.load(
      "/upload/images/sky.jpg",
      (texture) => {
        scene.background = texture;
      },
      undefined,
      (err) => console.error("Ошибка загрузки текстуры:", err)
    );

    // --- Модель ---
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/upload/models/roomjob.glb",
      (gltf) => {
        const obj = gltf.scene.children[0];
        obj.scale.set(0.5, 0.5, 0.5);
        obj.position.set(-1, 0.2, 1);
        scene.add(obj);
      },
      undefined,
      (err) => console.error("Ошибка загрузки модели:", err)
    );

    let animationFrameId = null;

    const tick = () => {
      controls.update();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // --- Обработка ресайза ---
    const handleResize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (width === 0 || height === 0) return; // защита от нулевых размеров

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // применить сразу

    // --- Очистка ---
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      // Освобождаем ресурсы Three.js
      renderer.dispose();
      if (scene) {
        // простой способ освободить текстуры/материалы
        scene.traverse((obj) => {
          if (obj.isMesh) {
            obj.geometry.dispose();
            obj.material.dispose();
          }
        });
      }
    };
  }, []);

  return (
    <Card>
      <Card.Body>
        <canvas ref={canvasRef} className="canvas" style={{ width: "100%", height: "300px", display: "block" }} />
      </Card.Body>
    </Card>
  );
}
