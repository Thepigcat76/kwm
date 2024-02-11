import * as three from "three";
import * as atom from "../lib/atom";
import * as colors from "../lib/colors";

export class KwmRenderer {
  scene: three.Scene | undefined;
  camera: three.PerspectiveCamera | undefined;
  renderer: three.WebGLRenderer | undefined;
  raycaster: three.Raycaster | undefined;
  atoms: Array<atom.Atom> = [];

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

  setupRaycaster(): this {
    this.raycaster = new three.Raycaster()
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
  createAtom(atom: atom.Atom): three.Object3D {
    var main_electron;

    if (atom.atom_type.maxElectrons == 2) {
      if (atom.atom_type.electrons == 1) {
        main_electron = this.createSphere(1.5, colors.Blue);
      } else {
        main_electron = this.createSphere(1.5, colors.Red);
      }
    } else {
      main_electron = this.createSphere(1.5, colors.Red);
    }

    main_electron.position.set(atom.pos.x+2.5, atom.pos.y, atom.pos.z);

    const electrons = this.createElectrons(atom, atom.pos);

    electrons.add(main_electron);
    this.addToScene(electrons);
    this.atoms.push(atom);
    return electrons;
  }

  createElectrons(atom: atom.Atom, center: three.Vector3): three.Object3D {
    const electrons = new three.Object3D();

    var binding = atom.atom_type.maxElectrons - atom.atom_type.electrons;

    if (atom.atom_type.maxElectrons == 2) {
      binding -= 1;
    }

    var not_binding = (atom.atom_type.electrons - binding) / 2;

    if (atom.atom_type.maxElectrons == 2 && atom.atom_type.electrons < 2) {
      not_binding = 0;
    }

    const bind_electrons = new Array(binding).fill(true);
    const not_bind_electrons = new Array(not_binding).fill(false);
    const electron_array = bind_electrons.concat(not_bind_electrons);

    const relative_coords: Array<three.Vector3> = [
      new three.Vector3(2.5, 2.25, 0),
      new three.Vector3(0.5, -1.35, -0.8),
      new three.Vector3(2.5, -1.35, 2),
      new three.Vector3(4.5, -1.35, -0.8),
    ];

    for (let i = 0; i < electron_array.length; i++) {
      const binds = electron_array[i];

      var electron;
      if (binds) {
        electron = this.createSphere(1, colors.Blue);
      } else {
        electron = this.createSphere(1, colors.Red);
      }

      const coords = relative_coords[i];

      electron.position.set(coords.x + center.x, coords.y + center.y, coords.z + center.z);

      electrons.add(electron);
    }
    return electrons;
  }
}
