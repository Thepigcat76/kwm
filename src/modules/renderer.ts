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

  setupCamera(pos: three.Vector3): this {
    this.camera = new three.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera?.position.set(pos.x, pos.y, pos.z);
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
  renderAtom(atom: atom.Atom, pos: three.Vector3): three.Object3D {
    const sphere = this.createSphere(1, colors.Red);
    sphere.position.set(pos.x, pos.y, pos.z);

    const binding_electrons = atom.atom_type.getMaxElectrons() - atom.atom_type.getElectrons();

    var electrons: Array<boolean> = Array.of();

    for (let index = 0; index < binding_electrons; index++) {
      electrons.push(true);
    }

    const not_binding = atom.atom_type.getElectrons() - binding_electrons;

    for (let index = 0; index < not_binding/2; index++) {
      electrons.push(false);
    }

    const circle = this.createCircleOfSpheres(
      new three.Vector3(pos.x, pos.y, pos.z),
      1.75, electrons,
      colors.Blue,
      colors.Red
    );

    circle.add(sphere);
    this.addToScene(circle);
    return circle;
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

      var radius1;
      if (canElectronBind[i]) {
        radius1 = 1;
      } else {
        radius1 = 1.1;
      } 

      const sphereGeometry = new three.SphereGeometry(radius1, 16, 16);
      var sphereMaterial;
      if (canElectronBind[i]) {
        sphereMaterial = new three.MeshStandardMaterial({ color: colorBind });
      } else {
        sphereMaterial = new three.MeshStandardMaterial({ color: colorNotBind });
      }
      const sphere = new three.Mesh(sphereGeometry, sphereMaterial);

      sphere.position.set(x, y, center.z);
      circle.add(sphere);
    }

    return circle;
  }
}
