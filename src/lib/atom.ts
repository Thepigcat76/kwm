export interface Atom {
  connections: Array<Atom>;
  charge: number,
  atom_type: AtomType;
};

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

  private constructor(public readonly ident: string, public readonly electrons: number, public readonly maxElectrons: number = 8) {}
}
