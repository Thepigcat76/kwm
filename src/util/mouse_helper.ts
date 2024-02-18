import { KwmRenderer } from "../modules/renderer";
import * as three from "three";
import { mouseToThreePos } from "./util";
import { OutlinePass } from "three/examples/jsm/Addons.js";

type MouseAction = (event: MouseEvent) => void;

export class MouseHelper {
  public mouse_down = false;

  private moveAction: MouseAction;
  private clickedAction: MouseAction;
  private renderer: KwmRenderer;
  private camera: three.Camera;
  private prev_mouse_pos: three.Vector2 | undefined;

  constructor(renderer: KwmRenderer, private outlinePass: OutlinePass) {
    this.moveAction = () => {};
    this.clickedAction = () => {};
    this.renderer = renderer;
    this.camera = this.renderer.camera!;
    this.prev_mouse_pos = undefined;
  }

  setupMouseListener(): this {
    document.addEventListener("mousedown", () => this.onMouseDown());

    document.addEventListener("mouseup", () => this.onMouseUp());

    document.addEventListener("mouseleave", (_) => this.onMouseUp());

    window.addEventListener("click", (event) => this.clickedAction(event));

    document.addEventListener("mousemove", (event) => this.moveAction(event));

    return this;
  }

  private onMouseUp() {
    this.mouse_down = false;
  }

  private onMouseDown() {
    this.mouse_down = true;
  }

  setupActions(
    moveAction?: MouseAction | undefined,
    clickedAction?: MouseAction | undefined
  ): this {
    if (moveAction != undefined) this.moveAction = moveAction;

    if (clickedAction != undefined) this.clickedAction = clickedAction;

    return this;
  }

  moveMouse(event: MouseEvent, kwm_renderer: KwmRenderer) {
    const mouse = mouseToThreePos(
      new three.Vector2(event.clientX, event.clientY)
    );

    // Update the picking ray with the camera and mouse position
    kwm_renderer.raycaster!.setFromCamera(mouse, kwm_renderer.camera!);

    var intersects = undefined;
    var intersecting_obj = undefined;
    for (let i = 0; i < kwm_renderer.atoms.length; i++) {
      intersects = kwm_renderer.raycaster!.intersectObject(
        kwm_renderer.atoms[i].object
      );
      intersecting_obj = kwm_renderer.atoms[i];

      if (intersects.length > 0) break;
    }

    if (intersects!.length > 0) {
      if (
        !this.outlinePass.selectedObjects.includes(intersecting_obj!.object)
      ) {
        this.outlinePass.selectedObjects.push(intersecting_obj!.object);
        intersecting_obj!.selected = true;
      }
    } else {
        intersecting_obj!.selected = false;
      const indexToRemove = this.outlinePass.selectedObjects.indexOf(
        intersecting_obj?.object!
      );
      this.outlinePass.selectedObjects.splice(indexToRemove, 1);
      this.outlinePass.selectedObjects;
    }
  }

  clickMouse(event: MouseEvent, kwm_renderer: KwmRenderer) {
    const mouse = mouseToThreePos(
      new three.Vector2(event.clientX, event.clientY)
    );

    // Update the picking ray with the camera and mouse position
    kwm_renderer.raycaster!.setFromCamera(mouse, kwm_renderer.camera!);

    var intersects = undefined;
    var intersecting_obj = undefined;
    for (let i = 0; i < kwm_renderer.atoms.length; i++) {
      intersects = kwm_renderer.raycaster!.intersectObject(
        kwm_renderer.atoms[i].object
      );
      intersecting_obj = kwm_renderer.atoms[i];

      if (intersects.length > 0) break;
    }

    console.log(intersects);

    if (intersects!.length > 0) {
    }
  }
}
