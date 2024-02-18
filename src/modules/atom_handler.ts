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
  ) {
    this.line = this.atom_helper.createLine(
      Red,
      new three.Vector3(-10, 0, 0),
      new three.Vector3(1, 0, 0)
    );
  }
}
