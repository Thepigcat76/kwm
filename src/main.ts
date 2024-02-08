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

kwm_renderer.camera?.position.setZ(10);

// Create sphere
/*
const sphere = kwm_renderer.createSphere(0.4, color.Red);
sphere.position.setY(1);
const sphere2 = kwm_renderer.createSphere(0.2, color.Blue);
sphere2.position.setY(2);
const sphere3 = kwm_renderer.createSphere(0.2, color.Blue);
sphere3.position.setY(0);
*/

kwm_renderer.renderAtom({
  atom_type: AtomType.Carbon,
  connections: Array.of(),
  electrons: 2,
});

kwm_renderer.onUpdate = () => {
  //sphere.rotateX(0.01).rotateY(0.01);
};

kwm_renderer.animate();

document.addEventListener("keydown", handleKeyPress);

