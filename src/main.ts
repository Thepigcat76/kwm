import { KwmRenderer } from "./modules/renderer";
import "./style.css";
import { AtomType } from "./lib/atom";
import * as three from "three";
import { Key, KeyHandler } from "./modules/keybinds";
import { atomsToString } from "./util/util";
import { AtomHandler } from "./modules/atom_handler";
import {
  FirstPersonControls,
  LineGeometry,
} from "three/examples/jsm/Addons.js";
import { Red } from "./lib/colors";
import { AtomHelper } from "./util/atom_helper";
import { MouseHelper } from "./util/mouse_helper";

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

  const atom_handler = new AtomHandler(kwm_renderer, atom_helper);

  /*
  const mouse_helper = new MouseHelper(kwm_renderer)
    .setupMouseListener()
    .setupActions(
      (event) => {
        mouse_helper.moveCamera(event);
      },
      (event) => atom_handler.onClick(event, kwm_renderer)
    );
  */

  const controls = new FirstPersonControls(
    kwm_renderer.camera!,
    kwm_renderer.renderer?.domElement
  );
  controls.movementSpeed = 10;
  controls.lookSpeed = 0.1;

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
    controls.update(new three.Clock().getDelta());
  };

  kwm_renderer.animate();

  /*
  new KeyHandler()
    .createKeyMap(
      new Map()
        .set(
          [Key.Space1, Key.Space2, Key.Up],
          () => (kwm_renderer.camera!.position.y += 0.3)
        )
        .set(
          [Key.Shift, Key.Down],
          () => (kwm_renderer.camera!.position.y -= 0.3)
        )
        .set([Key.W], () => (kwm_renderer.camera!.position.z -= 0.3))
        .set([Key.A], () => (kwm_renderer.camera!.position.x -= 0.3))
        .set([Key.S], () => (kwm_renderer.camera!.position.z += 0.3))
        .set([Key.D], () => (kwm_renderer.camera!.position.x += 0.3))
        .set([Key.Left], () => (kwm_renderer.camera!.rotation.y -= 0.01))
        .set([Key.Right], () => (kwm_renderer.camera!.rotation.y += 0.01))
    )
    .setupKeyListeners();

  */

  console.log("Atoms: " + atomsToString(kwm_renderer.atoms));

  window.addEventListener("resize", () => {
    kwm_renderer.camera!.aspect = window.innerWidth / window.innerHeight;
    kwm_renderer.camera!.updateProjectionMatrix();
    kwm_renderer.renderer!.setSize(window.innerWidth, window.innerHeight);
  });
}
