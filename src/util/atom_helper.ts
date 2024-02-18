import * as three from "three";
import * as atom from "../lib/atom";
import * as colors from "../lib/colors";
import { KwmRenderer } from "../modules/renderer";
import { GeometryAttributes } from "./util";
import { RenderHelper } from "./render_helper";

export class AtomHelper {
  constructor(
    private kwm_render: KwmRenderer,
    private render_helper: RenderHelper
  ) {}

  createLine(
    color: three.ColorRepresentation,
    start: three.Vector3,
    end: three.Vector3
  ): three.Line {
    const geometry = new three.BufferGeometry();
    const vertices = new Float32Array([
      start.x,
      start.y,
      start.z,
      end.x,
      end.y,
      end.z,
    ]);
    geometry.setAttribute(
      GeometryAttributes.Pos,
      new three.BufferAttribute(vertices, 3)
    );

    // Define the material
    const material = new three.LineBasicMaterial({ color: color });

    // Create the line
    const line = new three.Line(geometry, material);

    return line;
  }

  setLineVisible(line: three.Line, visible: boolean) {
    if (visible) {
      this.kwm_render.addToScene(line);
    } else if (!visible) {
      this.kwm_render.hideFromScene(line);
    }
  }

  selectAtoms(atom: atom.AtomObject) {
    atom.electron_spheres.forEach((electron) => {
      let mtl: three.MeshStandardMaterial =
        electron.material as three.MeshStandardMaterial;
      mtl.color.set(colors.LightAqua);
    });
  }

  // render the atoms
  createAtom(atom: atom.Atom): atom.AtomObject {
    var main_electron;

    if (atom.atom_type.maxElectrons == 2) {
      if (atom.atom_type.electrons == 1) {
        main_electron = this.render_helper.createSphere(1.5, colors.Aqua);
      } else {
        main_electron = this.render_helper.createSphere(1.5, colors.Red);
      }
    } else {
      main_electron = this.render_helper.createSphere(1.5, colors.Red);
    }

    const atom_obj = this.createElectrons(atom, new three.Vector3(-2.5, 0, 0));

    atom_obj.main_electron = main_electron;

    atom_obj.object.add(main_electron);
    atom_obj.index = this.kwm_render.atoms.length
    this.kwm_render.atoms.push(atom_obj);
    this.kwm_render.addToScene(atom_obj.object);
    return atom_obj;
  }

  createElectrons(atom: atom.Atom, center: three.Vector3): atom.AtomObject {
    const atom_obj: atom.AtomObject = {
      main_electron: new three.Mesh(),
      object: new three.Object3D(),
      electron_spheres: [],
      connections: [],
      atom: atom,
      selected: false,
      index: 0,
    };

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

      var electron: three.Mesh;
      if (binds) {
        electron = this.render_helper.createSphere(1, colors.Aqua);
      } else {
        electron = this.render_helper.createSphere(1, colors.Red);
      }

      const coords = relative_coords[i];

      electron.position.set(
        coords.x + center.x,
        coords.y + center.y,
        coords.z + center.z
      );

      atom_obj.object.add(electron);

      atom_obj.electron_spheres.push(electron);
    }
    return atom_obj;
  }
}
