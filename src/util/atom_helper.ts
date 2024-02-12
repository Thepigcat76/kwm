import * as three from "three";
import { KwmRenderer } from "../modules/renderer";
import { GeometryAttributes } from "./util";

export class AtomHelper {
  constructor(private kwm_render: KwmRenderer) {}

  createLine(
    color: three.ColorRepresentation,
    start: three.Vector3,
    end: three.Vector3
  ): three.Line {
    const geometry = new three.BufferGeometry();
    const vertices = new Float32Array([
      start.x,
      start.y,
      start.z,
      end.x,
      end.y,
      end.z,
    ]);
    geometry.setAttribute(
      GeometryAttributes.Pos,
      new three.BufferAttribute(vertices, 3)
    );

    // Define the material
    const material = new three.LineBasicMaterial({ color: color });

    // Create the line
    const line = new three.Line(geometry, material);

    return line;
  }

  setLineVisible(line: three.Line, visible: boolean) {
    if (visible) {
      this.kwm_render.addToScene(line);
    } else if (!visible) {
      this.kwm_render.hideFromScene(line);
    }
  }
}
