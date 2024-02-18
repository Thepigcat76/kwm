import { KwmRenderer } from "./modules/renderer";
import "./style.css";
import { AtomType } from "./lib/atom";
import * as three from "three";
import { atomsToString, getAtomPos, getMaterial, removeFromArray, setupOutlinePass } from "./util/util";
import { AtomHelper } from "./util/atom_helper";
import { MouseHelper } from "./util/mouse_helper";
import { RenderHelper } from "./util/render_helper";
import {
  ArcballControls,
  OrbitControls,
  RenderPass,
  TransformControls,
} from "three/examples/jsm/Addons.js";
import { Red } from "./lib/colors";
import { Key, KeyHandler } from "./modules/keybinds";

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
  controls.maxDistance = 60;
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;

  const transforms = new TransformControls(
    kwm_renderer.camera!,
    kwm_renderer.renderer?.domElement
  );

  transforms.addEventListener("change", () =>
    kwm_renderer.renderer?.render(kwm_renderer.scene!, kwm_renderer.camera!)
  );

  transforms.addEventListener("dragging-changed", function (event) {
    controls.enabled = !event.value;
  });

  new KeyHandler().createKeyMap(new Map().set([Key.R], () => transforms.setMode("rotate")).set([Key.P], () => transforms.setMode("translate"))).setupKeyListeners()

  const render_helper = new RenderHelper(kwm_renderer);

  const atom_helper = new AtomHelper(kwm_renderer, render_helper);

  const renderPass = new RenderPass(kwm_renderer.scene!, kwm_renderer.camera!);
  kwm_renderer.composer!.addPass(renderPass);

  const outlinePass = setupOutlinePass(kwm_renderer);
  kwm_renderer.composer!.addPass(outlinePass);

  const mouse_helper = new MouseHelper().setupMouseListener().setupActions(
    (event) => {
      mouse_helper.moveMouse(event, kwm_renderer);
    },
    (event) => mouse_helper.clickMouse(event, kwm_renderer, transforms)
  );

  const parent = new three.Object3D();

  const carbon3 = atom_helper.createAtom({
    atom_type: AtomType.Chlorine,
    charge: 0,
  });

  const carbon4 = atom_helper.createAtom({
    atom_type: AtomType.Chlorine,
    charge: 0,
  });

  const carbon5 = atom_helper.createAtom({
    atom_type: AtomType.Chlorine,
    charge: 0,
  });

  const carbon6 = atom_helper.createAtom({
    atom_type: AtomType.Nitrogen,
    charge: 0,
  });

  getMaterial(carbon3.electron_spheres[0]).color.set(Red)
  getMaterial(carbon4.electron_spheres[0]).color.set(Red);
  getMaterial(carbon5.electron_spheres[0]).color.set(Red);

  carbon3.object.rotateX(Math.PI / 2);
  carbon3.object.rotateZ(Math.PI / 2);

  carbon4.object.rotateX(Math.PI / 2);
  carbon4.object.rotateZ(-(Math.PI / 2));

  carbon5.object.rotateX(Math.PI / 2);
  carbon5.object.rotateZ(-(Math.PI / 2));

  carbon3.object.position.x = -5.5;

  kwm_renderer.addToScene(transforms);

  getAtomPos(carbon3).x += 10;
  getAtomPos(carbon4).x += 20;

  kwm_renderer.onUpdate = () => {
    controls.update();
    kwm_renderer.composer!.render();
  };

  kwm_renderer.animate();

  const gridHelper = new three.GridHelper(30, 25, 0xbfbfbf, 0x757575);
  gridHelper.position.setY(-3);
  kwm_renderer.addToScene(gridHelper);

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
