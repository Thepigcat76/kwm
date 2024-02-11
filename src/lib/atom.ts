import { Vector3 } from "three";

export interface Atom {
  connections: Array<Atom>;
  charge: number;
  atom_type: AtomType;

  pos: Vector3;
}

// Basically an enum but ts
// does not have good enums
// so we just go with this :p
export class AtomType {
  static readonly Hydrogen = new AtomType("H", 1, 2);
  static readonly Oxygen = new AtomType("O", 6);
  static readonly Nitrogen = new AtomType("N", 5);
  static readonly Carbon = new AtomType("C", 4);
  static readonly Chlorine = new AtomType("Cl", 7);
  static readonly Sulphur = new AtomType("S", 6);
  static readonly Flourine = new AtomType("F", 7);
  static readonly Phosphor = new AtomType("P", 5);

  private constructor(
    public readonly ident: string,
    public readonly electrons: number,
    public readonly maxElectrons: number = 8
  ) {}

  toString(): string {
    var string = "undefined";
    if (this === AtomType.Hydrogen) {
      string = this.toRawString("Hydrogen");
    } else if (this === AtomType.Oxygen) {
      string = this.toRawString("Oxygen");
    } else if (this === AtomType.Carbon) {
      string = this.toRawString("Carbon");
    } else if (this === AtomType.Chlorine) {
      string = this.toRawString("Chlorine");
    } else if (this === AtomType.Flourine) {
      string = this.toRawString("Flourine");
    } else if (this === AtomType.Nitrogen) {
      string = this.toRawString("Nitrogen");
    } else if (this === AtomType.Phosphor) {
      string = this.toRawString("Phosphor");
    } else if (this === AtomType.Sulphur) {
      string = this.toRawString("Sulphur");
    }
    return string;
  }

  private toRawString(atom_name: string): string {
    return (
      atom_name+": { symbol: " +
      this.ident +
      ", electrons: " +
      this.electrons +
      ", maxElectrons: " +
      this.maxElectrons +
      "}"
    );
  }
}
