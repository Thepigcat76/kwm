import * as three from "three";
import { KwmRenderer } from "./renderer";
import { Red } from "../lib/colors";
import { AtomHelper } from "../util/atom_helper";

export class AtomHandler {
  private show_line: boolean = false;
  private line: three.Line;

  constructor(
    private kwm_renderer: KwmRenderer,
    private atom_helper: AtomHelper
  ) {
    this.line = this.atom_helper.createLine(
      Red,
      new three.Vector3(-10, 0, 0),
      new three.Vector3(1, 0, 0)
    );
  }
  
  onClick(event: MouseEvent, kwm_renderer: KwmRenderer) {
    const mouse = new three.Vector2();
    // Calculate normalized device coordinates (-1 to +1) for the mouse position
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    kwm_renderer.raycaster!.setFromCamera(mouse, kwm_renderer.camera!);

    var intersects = undefined;
    for (let i = 0; i < kwm_renderer.atom_objects.length; i++) {
      intersects = kwm_renderer.raycaster!.intersectObject(
        kwm_renderer.atom_objects[i]
      );

      if (intersects.length > 0) break;
    }

    if (intersects!.length > 0) {
      this.show_line = !this.show_line;
      this.atom_helper.setLineVisible(this.line, !this.show_line);
    }
  }
}
