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

const carbon1 = kwm_renderer.renderAtom(
  {
    atom_type: AtomType.Chlorine,
    connections: Array.of(),
    charge: 0,
  },
  new three.Vector3(0, 5, 2)
);

const carbon2 = kwm_renderer.renderAtom(
  {
    atom_type: AtomType.Hydrogen,
    connections: Array.of(),
    charge: 0,
  },
  new three.Vector3(0, 0, -10)
);

const carbon3 = kwm_renderer.renderAtom(
  {
    atom_type: AtomType.Nitrogen,
    charge: 0,
    connections: Array.of(),
  },
  new three.Vector3(0, -6, 3)
);

kwm_renderer.onUpdate = () => {
  // This function gets called every frame
};

kwm_renderer.animate();

const kwm_handler = new KeyHandler()
  .createKeyMap(
    new Map()
      .set([Key.Space1, Key.Space2, Key.Up], () => {
        carbon3.position.y += 0.3;
      })
      .set([Key.Shift, Key.Down], () => {
        carbon3.position.y -= 0.3;
      })
      .set([Key.Right], () => {
        carbon3.position.x += 0.3;
      })
      .set([Key.Left], () => {
        carbon3.position.x -= 0.3;
      })
  )
  .setupKeyListeners();
