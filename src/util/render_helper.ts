import * as three from "three";
import { KwmRenderer } from "../modules/renderer";

export class RenderHelper {
  constructor(private renderer: KwmRenderer) {}
  // create forms
  createSphere(radius: number, color: three.ColorRepresentation): three.Mesh {
    const geometry: three.SphereGeometry = new three.SphereGeometry(radius);
    const material: three.MeshStandardMaterial = new three.MeshStandardMaterial(
      {
        color: color,
      }
    );
    const sphere = new three.Mesh(geometry, material);
    this.renderer.scene?.add(sphere);
    return sphere;
  }

  createOutlineSphere(radius: number): three.Mesh {
    const geometry: three.SphereGeometry = new three.SphereGeometry(radius);
    const material: three.MeshBasicMaterial = new three.MeshBasicMaterial(
      {
        color: 0xFFFFFF,
        side: three.BackSide
      }
    );
    const sphere = new three.Mesh(geometry, material);
    this.renderer.scene?.add(sphere);
    return sphere;
  }
}
