export interface Atom {
  connections: Array<Atom>;
  electrons: number,
  atom_type: AtomType;
};

// Basically an enum but ts
// does not have good enums
// so we just go with this :p
export class AtomType {
  static readonly Hydrogen = new AtomType("H", 1);
  static readonly Oxygen = new AtomType("O", 6);
  static readonly Nitrogen = new AtomType("N", 5);
  static readonly Carbon = new AtomType("C", 4);

  private constructor(private ident: string, private electrons: number) {}

  public get getIdent(): string {
    return this.ident;
  }

  public get getElectrons(): number {
    return this.electrons;
  }
}
