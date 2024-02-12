import { KwmRenderer } from "./modules/renderer";
import "./style.css";
import { AtomType } from "./lib/atom";
import * as three from "three";
import { Key, KeyHandler } from "./modules/keybinds";
import { atomsToString } from "./util/util";
import { AtomHandler } from "./modules/atom_handler";
import { LineGeometry } from "three/examples/jsm/Addons.js";
import { Red } from "./lib/colors";
import { AtomHelper } from "./util/atom_helper";

main();

function main() {
  // Setup renderer
  const kwm_renderer = new KwmRenderer()
    .setupRenderer()
    .setupScene()
    .setupCamera(new three.Vector3(0, 2, 18))
    .setupLights()
    .setupRaycaster();

  const atom_helper = new AtomHelper(kwm_renderer);

  const atom_handler = new AtomHandler(kwm_renderer, atom_helper).setupMouseEvent();

  const carbon3 = kwm_renderer.createAtom({
    atom_type: AtomType.Hydrogen,
    charge: 0,
    connections: Array.of(),

    pos: new three.Vector3(-5, 0, 0),
  });

  const carbon4 = kwm_renderer.createAtom({
    atom_type: AtomType.Carbon,
    charge: 0,
    connections: Array.of(),

    pos: new three.Vector3(-5, -9, 0),
  });

  kwm_renderer.onUpdate = () => {
    // This function gets called every frame
  };

  kwm_renderer.animate();

  new KeyHandler()
    .createKeyMap(
      new Map()
        .set(
          [Key.Space1, Key.Space2, Key.Up],
          () => (carbon3.position.y += 0.3)
        )
        .set([Key.Shift, Key.Down], () => (carbon3.position.y -= 0.3))
        .set([Key.W], () => (carbon3.position.z -= 0.3))
        .set([Key.A], () => (carbon3.position.x -= 0.3))
        .set([Key.S], () => (carbon3.position.z += 0.3))
        .set([Key.D], () => (carbon3.position.x += 0.3))
        .set([Key.Left], () => (carbon3.rotation.y -= 0.15))
        .set([Key.Right], () => (carbon3.rotation.y += 0.15))
    )
    .setupKeyListeners();

  console.log("Atoms: " + atomsToString(kwm_renderer.atoms));

  window.addEventListener("resize", () => {
    kwm_renderer.camera!.aspect = window.innerWidth / window.innerHeight;
    kwm_renderer.camera!.updateProjectionMatrix();
    kwm_renderer.renderer!.setSize(window.innerWidth, window.innerHeight);
  });
}
