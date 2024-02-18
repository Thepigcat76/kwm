import { KwmRenderer } from "./modules/renderer";
import "./style.css";
import { AtomType } from "./lib/atom";
import * as three from "three";
import { atomsToString, getAtomPos, setupOutlinePass } from "./util/util";
import { AtomHelper } from "./util/atom_helper";
import { KeyHandler } from "./modules/keybinds";
import { MouseHelper } from "./util/mouse_helper";
import { RenderHelper } from "./util/render_helper";
import {
  OrbitControls,
  RenderPass,
  TransformControls,
} from "three/examples/jsm/Addons.js";

main();

function main() {
  // Setup renderer
  const kwm_renderer = new KwmRenderer()
    .setupRenderer()
    .setupScene()
    .setupCamera(new three.Vector3(0, 2, 18))
    .setupLights()
    .setupRaycaster()
    .setupComposer();

  const controls = new OrbitControls(
    kwm_renderer.camera!,
    kwm_renderer.renderer!.domElement
  );
  controls.minDistance = 5;
  controls.maxDistance = 30;
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;

  const transforms = new TransformControls(
    kwm_renderer.camera!,
    kwm_renderer.renderer?.domElement
  );
  transforms.addEventListener("objectChange", function () {
    transforms.scale.set(1, 1, 1)    
  })

  transforms.addEventListener("change", () => kwm_renderer.renderer?.render(kwm_renderer.scene!, kwm_renderer.camera!));

  transforms.addEventListener("dragging-changed", function (event) {
    controls.enabled = !event.value;
  });

  const render_helper = new RenderHelper(kwm_renderer);

  const atom_helper = new AtomHelper(kwm_renderer, render_helper);

  const renderPass = new RenderPass(kwm_renderer.scene!, kwm_renderer.camera!);
  kwm_renderer.composer!.addPass(renderPass);

  const outlinePass = setupOutlinePass(kwm_renderer);
  kwm_renderer.composer!.addPass(outlinePass);

  const mouse_helper = new MouseHelper(kwm_renderer, outlinePass)
    .setupMouseListener()
    .setupActions(
      (event) => {
        mouse_helper.moveMouse(event, kwm_renderer);
      },
      (event) => mouse_helper.clickMouse(event, kwm_renderer)
    );

  const carbon3 = atom_helper.createAtom({
    atom_type: AtomType.Oxygen,
    charge: 0,
  });

  const carbon4 = atom_helper.createAtom({
    atom_type: AtomType.Carbon,
    charge: 0,
  });

  transforms.attach(carbon4.object);
  kwm_renderer.addToScene(transforms)

  getAtomPos(carbon3).x = 10;

  kwm_renderer.onUpdate = () => {
    controls.update();
    kwm_renderer.composer!.render();
  };

  kwm_renderer.animate();

  console.log("Atoms: " + atomsToString(kwm_renderer.atoms));

  window.addEventListener("resize", () => {
    kwm_renderer.camera!.aspect = window.innerWidth / window.innerHeight;
    kwm_renderer.camera!.updateProjectionMatrix();
    kwm_renderer.renderer!.setSize(window.innerWidth, window.innerHeight);
  });

  const add_button = document.getElementById("add-button");
  add_button?.addEventListener("click", () => {
    const atom = atom_helper.createAtom({
      charge: 0,
      atom_type: AtomType.Carbon,
    });
    const last_pos = getAtomPos(
      kwm_renderer.atoms[kwm_renderer.atoms.length - 2]
    ).x;
    console.log(last_pos);
    getAtomPos(atom).x = last_pos - 10;
    console.log(
      "Last: " + getAtomPos(kwm_renderer.atoms[kwm_renderer.atoms.length - 2]).x
    );
  });
}
