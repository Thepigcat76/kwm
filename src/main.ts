import { KwmRenderer } from "./modules/renderer";
import "./style.css";
import { AtomType } from "./lib/atom";
import * as three from "three";
import { Key, KeyHandler } from "./modules/keybinds";

main();

function main() {
  // Setup renderer
  const kwm_renderer = new KwmRenderer()
    .setupRenderer()
    .setupScene()
    .setupCamera(new three.Vector3(0, 2, 18))
    .setupLights();

  const carbon3 = kwm_renderer.renderAtom(
    {
      atom_type: AtomType.Carbon,
      charge: 0,
      connections: Array.of(),
    },
    new three.Vector3(0, 0, 0)
  );

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
}
