import { KwmRenderer } from "../modules/renderer";
import * as three from "three";

type MouseAction = (event: MouseEvent) => void;

export class MouseHelper {
  public mouse_down = false;

  private heldDownAction: MouseAction;
  private clickedAction: MouseAction;
  private renderer: KwmRenderer;
  private camera: three.Camera;
  private prev_mouse_pos: three.Vector2 | undefined;

  constructor(renderer: KwmRenderer) {
    this.heldDownAction = () => {};
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

    document.addEventListener("mousemove", (event) => this.onMouseMove(event));

    return this;
  }

  private onMouseUp() {
    this.mouse_down = false;
  }

  private onMouseDown() {
    this.mouse_down = true;
  }

  private onMouseMove(event: MouseEvent) {
    if (this.mouse_down) this.heldDownAction(event);
  }

  setupActions(
    heldDownAction?: MouseAction | undefined,
    clickedAction?: MouseAction | undefined
  ): this {
    if (heldDownAction != undefined) this.heldDownAction = heldDownAction;

    if (clickedAction != undefined) this.clickedAction = clickedAction;

    return this;
  }

  moveCamera(event: MouseEvent) {
    if (this.prev_mouse_pos == undefined) {
      this.prev_mouse_pos = new three.Vector2(event.clientX, event.clientY);
      return;
    }

    const delta = new three.Vector2(
      this.prev_mouse_pos.x - event.clientX,
      this.prev_mouse_pos.y - event.clientY
    );

    this.prev_mouse_pos = new three.Vector2(event.clientX, event.clientY)
  }
}
