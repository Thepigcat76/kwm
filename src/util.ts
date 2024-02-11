import { Vector3 } from "three";
import { Atom } from "./lib/atom";

export function atomsToString(atoms: Array<Atom>): string {
  let content: string[] = ["["];
  for (let i = 0; i < atoms.length; i++) {
    const atom = atoms[i];
    content.push(atomToString(atom) + ", ");
  }

  content.push("]");

  return content.join("");
}

export function atomToString(atom: Atom): string {
  return (
    "Atom { connections: " +
    atomsToString(atom.connections) +
    ", charge: " +
    atom.charge +
    ", atom_type: " +
    atom.atom_type.toString() +
    ", pos: " +
    vectorToString(atom.pos) +
    " }"
  );
}

export function vectorToString(vec: Vector3): string {
  return "Vector3 { x: " + vec.x + ", y: " + vec.y + ", z: " + vec.z + " }";
}
