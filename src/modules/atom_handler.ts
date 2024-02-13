import * as three from "three";
import { KwmRenderer } from "./renderer";
import { Red } from "../lib/colors";
import { AtomHelper } from "../util/atom_helper";
import { getNearestAtom, mouseToThreePos } from "../util/util";

export class AtomHandler {
  private show_line: boolean = false;
  private line: three.Line;

  constructor(private atom_helper: AtomHelper) {
    this.line = this.atom_helper.createLine(
      Red,
      new three.Vector3(-10, 0, 0),
      new three.Vector3(1, 0, 0)
    );
  }

  onClick(event: MouseEvent, kwm_renderer: KwmRenderer) {
    const mouse = mouseToThreePos(
      new three.Vector2(event.clientX, event.clientY)
    );

    // Update the picking ray with the camera and mouse position
    kwm_renderer.raycaster!.setFromCamera(mouse, kwm_renderer.camera!);

    var intersects = undefined;
    for (let i = 0; i < kwm_renderer.atoms.length; i++) {
      intersects = kwm_renderer.raycaster!.intersectObject(
        kwm_renderer.atoms[i].object
      );

      if (intersects.length > 0) break;
    }

    if (intersects!.length > 0) {
      this.show_line = !this.show_line;
      this.atom_helper.setLineVisible(this.line, !this.show_line);
    }

    getNearestAtom(
      kwm_renderer.atoms,
      new three.Vector2(event.clientX, event.clientY)
    );
  }
}
