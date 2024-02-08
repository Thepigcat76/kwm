import * as three from "three";
import * as atom from "../lib/atom";
import * as colors from "../lib/colors";

export class KwmRenderer {
  scene: three.Scene | undefined;
  camera: three.PerspectiveCamera | undefined;
  renderer: three.WebGLRenderer | undefined;

  onUpdate: () => void;

  constructor() {
    this.animate = this.animate.bind(this);
    this.onUpdate = () => {};
  }

  // Setup functions
  setupScene(): this {
    this.scene = new three.Scene();
    return this;
  }

  setupCamera(): this {
    this.camera = new three.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera?.position.setX(0);
    this.camera?.position.setZ(1);
    this.camera?.position.setY(1);
    return this;
  }

  setupRenderer(): this {
    this.renderer = new three.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer!.domElement);
    return this;
  }

  // Setup lights
  setupLights(): this {
    const ambientLight: three.AmbientLight = new three.AmbientLight(0x404040);
    const directionalLight: three.DirectionalLight = new three.DirectionalLight(
      0xffffff,
      1
    );
    directionalLight.position.set(5, 5, 5);

    this.addToScene(directionalLight).addToScene(ambientLight);
    return this;
  }

  // Add object to the scene
  addToScene(...object: three.Object3D[]): this {
    for (var x = 0; x < object.length; x++) {
      this.scene?.add(object[x]);
    }
    return this;
  }

  // create forms
  createSphere(radius: number, color: three.ColorRepresentation): three.Mesh {
    const geometry: three.SphereGeometry = new three.SphereGeometry(radius);
    const material: three.MeshStandardMaterial = new three.MeshStandardMaterial(
      {
        color: color,
      }
    );
    const sphere = new three.Mesh(geometry, material);
    this.scene?.add(sphere);
    return sphere;
  }

  // Update the scene regularly and execute code
  animate() {
    requestAnimationFrame(this.animate);

    this.onUpdate();

    this.renderer!.render(this.scene!, this.camera!);
  }

  // render the atoms
  renderAtom(atom: atom.Atom) {
    const sphere = this.createSphere(1, colors.Red);
    sphere.position.setY(0);

    const circle = this.createCircleOfSpheres(new three.Vector3(0, 0, 0), 1.75, Array.of(true), colors.Blue, colors.Red);
    this.addToScene(circle);
  }

  createCircleOfSpheres(
    center: THREE.Vector3,
    radius: number,
    canElectronBind: Array<boolean>,
    colorBind: three.ColorRepresentation,
    colorNotBind: three.ColorRepresentation,
  ): THREE.Object3D {
    const circle = new three.Object3D();

    for (let i = 0; i < canElectronBind.length; i++) {
      const angle = (i / canElectronBind.length) * 2 * Math.PI;
      const x = center.x + radius * Math.cos(angle);
      const y = center.y + radius * Math.sin(angle);

      const sphereGeometry = new three.SphereGeometry(1, 16, 16);
      var sphereMaterial;
      if (canElectronBind[i]) {
        sphereMaterial = new three.MeshStandardMaterial({ color: colorBind });
      } else {
        sphereMaterial = new three.MeshStandardMaterial({ color: colorNotBind });
      }
      const sphere = new three.Mesh(sphereGeometry, sphereMaterial);

      sphere.position.set(x, y, 0);
      circle.add(sphere);
    }

    return circle;
  }
}