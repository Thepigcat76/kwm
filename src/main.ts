import * as color from "./lib/colors";
import { KwmRenderer } from "./modules/renderer";
import "./style.css";
import { handleKeyPress } from "./modules/keybinds";
import { AtomType } from "./lib/atom";
import * as three from "three";

// Setup renderer
const kwm_renderer = new KwmRenderer()
  .setupRenderer()
  .setupScene()
  .setupCamera()
  .setupLights();

kwm_renderer.camera?.position.set(0, 2, 18);

const carbon1 = kwm_renderer.renderAtom({
  atom_type: AtomType.Carbon,
  connections: Array.of(),
  charge: 0,
}, new three.Vector3(0, 5, 0));

const carbon2 = kwm_renderer.renderAtom({
  atom_type: AtomType.Hydrogen,
  connections: Array.of(),
  charge: 0,
}, new three.Vector3(0, 0, 0));

kwm_renderer.onUpdate = () => {
  carbon1.rotateX(0.02).rotateY(0.01).rotateZ(0.02);
  carbon2.rotateX(0.02).rotateY(0.01).rotateZ(0.0);
};

kwm_renderer.animate();

document.addEventListener("keydown", handleKeyPress);
