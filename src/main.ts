import { KwmRenderer } from "./modules/renderer";
import "./style.css";
import { AtomType } from "./lib/atom";
import * as three from "three";
import { Key, KeyHandler } from "./modules/keybinds";

// Setup renderer
const kwm_renderer = new KwmRenderer()
  .setupRenderer()
  .setupScene()
  .setupCamera(new three.Vector3(0, 2, 18))
  .setupLights();

const kwm_handler = new KeyHandler();

const carbon1 = kwm_renderer.renderAtom({
  atom_type: AtomType.Chlorine,
  connections: Array.of(),
  charge: 0,
}, new three.Vector3(0, 5, 2));

const carbon2 = kwm_renderer.renderAtom({
  atom_type: AtomType.Hydrogen,
  connections: Array.of(),
  charge: 0,
}, new three.Vector3(0, 0, -10));

const carbon3 = kwm_renderer.renderAtom({
  atom_type: AtomType.Nitrogen,
  charge: 0,
  connections: Array.of()
}, new three.Vector3(0, -6, 3));

kwm_handler.createKeyMap(new Map()
  .set(Key.)
);

kwm_renderer.onUpdate = () => {
  carbon1.rotateX(0.02).rotateY(0.01).rotateZ(0.02);
  carbon2.rotateX(0.02).rotateY(0.01).rotateZ(0.01);
};

kwm_renderer.animate();

document.addEventListener("keydown", kwm_handler.handleKeyPress);
