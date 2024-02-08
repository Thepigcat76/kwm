import "./style.css";
import * as THREE from "three";

// Create a scene
const scene: THREE.Scene = new THREE.Scene();

// Create a camera
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.setZ(5);

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

setupLights()

const sphere: THREE.Mesh = createSphere(0.4);
createSphere(0.4).position.setY(1)

function createSphere(radius: number): THREE.Mesh {
  const geometry: THREE.SphereGeometry = new THREE.SphereGeometry(radius);
  const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
  });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
  return sphere
}

function setupLights() {
  const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0x404040);
  const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(
    0xffffff,
    1
  );
  directionalLight.position.set(5, 5, 5);

  scene.add(directionalLight);

  // Soft white light
  scene.add(ambientLight);
}

// Animation function
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  renderer.render(scene, camera);
}

// Start the animation loop
animate();
