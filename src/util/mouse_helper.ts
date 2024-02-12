import { Vector2, Vector3 } from "three";
import { KwmRenderer } from "../modules/renderer";
import * as three from "three";
import { FirstPersonControls } from "three/examples/jsm/Addons.js";

type MouseAction = (event: MouseEvent) => void;

export class MouseHelper {
  private heldDownAction: MouseAction = () => {};
  private clickedAction: MouseAction = () => {};
  public mouse_down = false;
  private previousMousePosition: { x: number; y: number } = { x: 0, y: 0 };
  private camera: three.Camera;
  private accumulatedRotation: { x: number; y: number } = { x: 0, y: 0 };

  constructor(private renderer: KwmRenderer) {
    this.camera = this.renderer.camera!;
  }

  setupMouseListener(): this {
    document.addEventListener("mousedown", () => {
      this.mouse_down = true;
      console.log("down");
      this.previousMousePosition = { x: 0, y: 0 };
    });

    document.addEventListener("mouseup", () => {
      this.mouse_down = false;
      console.log("up");
      this.accumulatedRotation = { x: 0, y: 0 };
    });

    window.addEventListener("click", (event) => this.clickedAction(event));

    document.addEventListener("mousemove", (event) => {
      if (this.mouse_down) this.heldDownAction(event);
    });

    document.addEventListener("mouseleave", (event) => {
      this.mouse_down = false;
      console.log("up");
      this.accumulatedRotation = { x: 0, y: 0 };
    });

    return this;
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
    const currentMousePosition = { x: event.clientX, y: event.clientY };
    const delta = {
      x: currentMousePosition.x - this.previousMousePosition.x,
      y: currentMousePosition.y - this.previousMousePosition.y,
    };

    this.rotateCamera(delta);

    this.previousMousePosition = currentMousePosition;
  }

  private rotateCamera(delta: { x: number; y: number }) {
    const rotationSpeed = 0.002;

    const quaternionX = new three.Quaternion().setFromAxisAngle(
      new three.Vector3(1, 0, 0),
      delta.y * rotationSpeed
    );

    const quaternionY = new three.Quaternion().setFromAxisAngle(
      new three.Vector3(0, 1, 0),
      delta.x * rotationSpeed
    );

    this.camera.quaternion.multiply(quaternionX).multiply(quaternionY);

    // Limit the vertical rotation to avoid flipping
    const maxVerticalRotation = Math.PI / 2;
    this.camera.rotation.x = Math.max(
      -maxVerticalRotation,
      Math.min(maxVerticalRotation, this.camera.rotation.x)
    );

    // Accumulate the rotation
    this.accumulatedRotation.x += delta.y * rotationSpeed;
    this.accumulatedRotation.y += delta.x * rotationSpeed;
  }
}
