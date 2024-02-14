import { Vector2, Vector3 } from "three";
import { AtomObject } from "../lib/atom";
import { OutlinePass } from "three/examples/jsm/Addons.js";
import { KwmRenderer } from "../modules/renderer";

export enum GeometryAttributes {
  Pos = "position",
}

export function atomsToString(atoms: Array<AtomObject>): string {
  let content: string[] = ["["];
  for (let i = 0; i < atoms.length; i++) {
    const atom = atoms[i];
    content.push(atomToString(atom) + ", ");
  }

  content.push("]");

  return content.join("");
}

export function atomToString(atom: AtomObject): string {
  return (
    "Atom { connections: " +
    atomsToString(atom.connections) +
    ", charge: " +
    atom.atom.charge +
    ", atom_type: " +
    atom.atom.atom_type.toString() +
    ", pos: " +
    vector3ToString(getAtomPos(atom)) +
    " }"
  );
}

export function vector3ToString(vec: Vector3): string {
  return "Vector3 { x: " + vec.x + ", y: " + vec.y + ", z: " + vec.z + " }";
}

export function vector2ToString(vec: Vector2): string {
  return "Vector2 { x: " + vec.x + ", y: " + vec.y + " }";
}

export function getNearestAtom(atoms: Array<AtomObject>, mouse_pos: Vector2) {
  const new_mouse_pos = mouseToThreePos(mouse_pos);
  const nearest = findNearestVector2(
    atoms.map((atom) => new Vector2(getAtomPos(atom).x, getAtomPos(atom).y)),
    new Vector2(new_mouse_pos.x * 10, new_mouse_pos.y * 10)
  );
  console.log(nearest);
}

function findNearestVector2(
  vectorArray: Array<Vector2>,
  targetVector: Vector2
): Vector2 {
  vectorArray.forEach((vec) => console.log(vector2ToString(vec)));
  console.log(targetVector);
  let nearest = vectorArray[0]; // Assume the first vector is the nearest initially
  let minDistance = targetVector.distanceTo(vectorArray[0]);

  for (let i = 1; i < vectorArray.length; i++) {
    const distance = targetVector.distanceTo(vectorArray[i]);

    if (distance < minDistance) {
      minDistance = distance;
      nearest = vectorArray[i];
    }
  }

  return nearest;
}

export function mouseToThreePos(mouse_pos: Vector2): Vector2 {
  return new Vector2(
    (mouse_pos.x / window.innerWidth) * 2 - 1,
    -(mouse_pos.y / window.innerHeight) * 2 + 1
  );
}

export function getAtomPos(atom_obj: AtomObject): Vector3 {
  return atom_obj.object.position;
}

export function setupOutlinePass(renderer: KwmRenderer) {
  const outlinePass = new OutlinePass(
    new Vector2(window.innerWidth, window.innerHeight),
    renderer.scene!,
    renderer.camera!
  );

  outlinePass.edgeStrength = 4;
  outlinePass.edgeThickness = 1;
  outlinePass.pulsePeriod = 0;
  outlinePass.visibleEdgeColor.set("#ffffff");
  outlinePass.hiddenEdgeColor.set("#ffffff");
  outlinePass.usePatternTexture = false;

  return outlinePass;
}
