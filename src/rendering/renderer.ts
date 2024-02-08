import * as THREE from "three";

class KwmRenderer {
  scene: THREE.Scene | undefined;
  camera: THREE.PerspectiveCamera | undefined;
  renderer: THREE.WebGLRenderer | undefined;

  constructor() {}

  setupScene(): KwmRenderer {
    this.scene = new THREE.Scene();
    return this;
  }

  setupCamera(): KwmRenderer {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    return this;
  }

  setupRenderer(): KwmRenderer {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    return this;
  }
}
