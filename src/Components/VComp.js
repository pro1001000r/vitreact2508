import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card } from "react-bootstrap";
import * as THREE from "three";
//import {CubeTextureLoader} from "three";
//import init from "../init";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//GLTFLoader загрузчик векторной графики
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function VComp() {
  const [canvas, setCanvas] = useState(null);
  const [isEnabled, setEnabled] = useState(false);
  const Vit3d = () => {
    const sizes = {
      // width: window.innerWidth,
      // height: window.innerHeight,
      width: 300,
      height: 300,
    };
    //console.log(">>>>", new Date(), " >>>>:", sizes); //консоль

    const scene = new THREE.Scene();
    setCanvas(document.querySelector(".canvas"));
    //const canvas = document.querySelector(".canvas");

    //console.log(">>>>canvas>>>>:", canvas);

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    scene.add(camera);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    const renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);

    // //const { sizes, camera, scene, canvas, controls, renderer } = init();
    camera.position.set(0, 2, 5);

    // //Кубик
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({
    //   color: "red",
    //   wireframe: true,
    // });
    // const mesh = new THREE.Mesh(geometry, material);
    // mesh.position.y = 1.35;
    // mesh.position.set(0, 1.35, 0);

    // scene.add(mesh);

    //устанавливаем поверхность земли
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

    // const loaderA = new GLTFLoader();
    // console.log('>>>>АВОКАДО >>>>:', loaderA);
    // loaderA.load('/models/Avocado/Avocado.gltf', (gltf) => {
    // 	console.log('>>>>АВОКАДО ', new Date(), ' >>>>:', gltf);
    // 	gltf.scene.children[0].scale.set(50, 50, 50);
    // 	gltf.scene.children[0].position.set(-4, 0, -5);
    // 	scene.add(gltf.scene.children[0]);
    // });

    const loaderA = new GLTFLoader();
    // console.log('>>>>АВОКАДО >>>>:', loaderA);
    loaderA.load("/upload/models/roomjob.glb", (gltf) => {
      //console.log(">>>>АВОКАДО ", new Date(), " >>>>:", gltf);
      gltf.scene.children[0].scale.set(0.5, 0.5, 0.5);
      gltf.scene.children[0].position.set(-1, 0.2, 1);
      scene.add(gltf.scene.children[0]);
    });

    //********************** */ фон *************************************************
    //Load background texture
    const loader = new THREE.TextureLoader();
    loader.load(
      "/upload/images/sky.jpg",
      function (texture) {
        scene.background = texture;
      }
    );

    // const texture = [
    //   "/upload/images/sky.jpg",
    //   "/upload/images/sky.jpg",
    //   "/upload/images/sky.jpg",
    //   "/upload/images/sky.jpg",
    //   "/upload/images/sky.jpg",
    //   "/upload/images/sky.jpg",
    // ];

    // const reflectionCube = new THREE.CubeTextureLoader().load(texture);
    // const refractionCube = new THREE.CubeTextureLoader().load(texture);
    // refractionCube.mapping = THREE.CubeRefractionMapping;

    // scene.background = reflectionCube;
    //refractionCube.mapping = THREE.CubeRefractionMapping;

    // const loader1 = new CubeTextureLoader();
    // const texture = loader1.load([
    //   '/upload/images/sky.jpg',
    //   '/upload/images/sky.jpg',
    //   '/upload/images/sky.jpg',
    //   '/upload/images/sky.jpg',
    //   '/upload/images/sky.jpg',
    //   '/upload/images/sky.jpg',
    // ]);

    // //консоль 02 Июнь 2025 (понедельник)
    //console.log('>>>> texture из (VComp):', reflectionCube); //консоль

    // scene.background = texture;

    //*************Робот****************** */
    // let mixer = null; //для робота

    // //робот
    // const loader = new GLTFLoader();
    // console.log("loader", loader);
    // loader.load("/models/BrainStem/BrainStem.gltf", (gltf) => {
    //   gltf.scene.scale.set(1, 1, 1);
    //   gltf.scene.position.set(0, 0, -0.4);

    //   mixer = new THREE.AnimationMixer(gltf.scene);

    //   const action = mixer.clipAction(gltf.animations[0]);
    //   action.play();

    //   console.log(">>>>", new Date(), " >>>>:", gltf);
    //   scene.add(gltf.scene);
    // });

    // const clock = new THREE.Clock(); //для робота

    //устанавливаем свет
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.61);
    dirLight.position.set(-8, 12, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    scene.add(dirLight);

    // /** Базовые обпаботчики событий длы поддержки ресайза */
    window.addEventListener("resize", () => {
      // Обновляем размеры
      // sizes.width = window.innerWidth;
      // sizes.height = window.innerHeight;
      // sizes.width = 300;
      // sizes.height = 300;

      // Обновляем соотношение сторон камеры
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Обновляем renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.render(scene, camera);
    });

    // window.addEventListener("dblclick", () => {
    //   if (!document.fullscreenElement) {
    //     canvas.requestFullscreen();
    //   } else {
    //     document.exitFullscreen();
    //   }
    // });

    const tick = () => {
      controls.update();
      renderer.render(scene, camera);

      // const delta = clock.getDelta(); //для робота
      // if (mixer) {
      //   //для робота
      //   mixer.update(delta); //для робота
      // } //для робота

      window.requestAnimationFrame(tick);
    };

    tick();
    // return (<tick/>)
  };

  const VitVisible = () => {
    setCanvas(document.querySelector(".canvas"));
    setEnabled(!isEnabled);
    <Vit3d />;
  };

  useEffect(() => {
    <Vit3d />;
  }, []);

  return (
    <>
      <Card className="border-5">
        <Card.Body className="text-center bg-info">
          <b>three.js</b> <br />
          Использование 3d проектов прямо в мобильнике
          <br />
          <canvas className="canvas"></canvas>
          <br />
          <Button variant="primary" onClick={() => VitVisible()}>
            {isEnabled ? "On" : "Off"}
          </Button>
          {isEnabled && <Vit3d />}
        </Card.Body>
      </Card>
    </>
  );
}
