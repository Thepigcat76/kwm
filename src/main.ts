import { KwmRenderer } from "./modules/renderer";
import "./style.css";
import { AtomType } from "./lib/atom";
import * as three from "three";
import { atomsToString } from "./util/util";
import { AtomHandler } from "./modules/atom_handler";
import { AtomHelper } from "./util/atom_helper";
import { Key, KeyHandler } from "./modules/keybinds";
import { MouseHelper } from "./util/mouse_helper";
import { RenderHelper } from "./util/render_helper";
import {
  EffectComposer,
  OrbitControls,
  OutlinePass,
  RenderPass,
} from "three/examples/jsm/Addons.js";

main();

function main() {
  // Setup renderer
  const kwm_renderer = new KwmRenderer()
    .setupRenderer()
    .setupScene()
    .setupCamera(new three.Vector3(0, 2, 18))
    .setupLights()
    .setupRaycaster();

  const render_helper = new RenderHelper(kwm_renderer);

  const atom_helper = new AtomHelper(kwm_renderer, render_helper);

  const atom_handler = new AtomHandler(atom_helper);

  const mouse_helper = new MouseHelper(kwm_renderer)
    .setupMouseListener()
    .setupActions(
      (event) => {
        mouse_helper.moveCamera(event);
      },
      (event) => atom_handler.onClick(event, kwm_renderer)
    );

  const composer = new EffectComposer(kwm_renderer.renderer!);
  const renderPass = new RenderPass(kwm_renderer.scene!, kwm_renderer.camera!);
  composer.addPass(renderPass);

  const outlinePass = new OutlinePass(
    new three.Vector2(window.innerWidth, window.innerHeight),
    kwm_renderer.scene!,
    kwm_renderer.camera!
  );

  composer.addPass(outlinePass);

  const carbon3 = atom_helper.createAtom({
    atom_type: AtomType.Oxygen,
    charge: 0,
  });

  const carbon4 = atom_helper.createAtom({
    atom_type: AtomType.Carbon,
    charge: 0,
  });

  outlinePass.selectedObjects = [carbon4.object, carbon4.main_electron];

  const controls = new OrbitControls(
    kwm_renderer.camera!,
    kwm_renderer.renderer!.domElement
  );
  controls.enableDamping = true; // an animation loop is required when damping is enabled
  controls.dampingFactor = 0.25;

  kwm_renderer.onUpdate = () => {
    controls.update();
    composer.render();
  };

  kwm_renderer.animate();

  new KeyHandler()
    .createKeyMap(
      new Map()
        .set([Key.Space1, Key.Space2, Key.Up], () => {
          kwm_renderer.camera!.position.y += 0.3;
          atom_helper.selectAtoms(carbon3);
        })
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

  console.log("Atoms: " + atomsToString(kwm_renderer.atoms));

  window.addEventListener("resize", () => {
    kwm_renderer.camera!.aspect = window.innerWidth / window.innerHeight;
    kwm_renderer.camera!.updateProjectionMatrix();
    kwm_renderer.renderer!.setSize(window.innerWidth, window.innerHeight);
  });
}
