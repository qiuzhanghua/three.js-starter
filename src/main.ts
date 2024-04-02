import "./style.css";
import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 2;

const renderer = new Three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", () => renderer.render(scene, camera));

const geometry = new Three.BoxGeometry();
const material = new Three.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
const cube = new Three.Mesh(geometry, material);
scene.add(cube);

window.addEventListener(
  "resize",
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  },
  false,
);

const stats = new Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();
const cubeFolder = gui.addFolder("Cube");
cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "y", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "z", 0, Math.PI * 2);
cubeFolder.open();
const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "z", 0, 10);
cameraFolder.open();

function animate() {
  requestAnimationFrame(animate);
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;
  renderer.render(scene, camera);
  stats.update();
}

animate();
// renderer.render(scene, camera);
