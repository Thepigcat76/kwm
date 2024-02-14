import * as three from "three";
import { KwmRenderer } from "./renderer";
import { Red } from "../lib/colors";
import { AtomHelper } from "../util/atom_helper";
import { getNearestAtom, mouseToThreePos } from "../util/util";
import { OutlinePass } from "three/examples/jsm/Addons.js";

export class AtomHandler {
  private show_line: boolean = false;
  private line: three.Line;

  constructor(
    private atom_helper: AtomHelper,
    private outlinePass: OutlinePass
  ) {
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
      if (
        !this.outlinePass.selectedObjects.includes(intersecting_obj!.object)
      ) {
        this.outlinePass.selectedObjects.push(intersecting_obj!.object);
      } else {
        const indexToRemove = this.outlinePass.selectedObjects.indexOf(
          intersecting_obj?.object!
        );
        this.outlinePass.selectedObjects.splice(indexToRemove, 1)
        this.outlinePass.selectedObjects;
      }
    }
  }
}
