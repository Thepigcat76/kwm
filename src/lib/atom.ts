type Atom = {
  electrons: Array<Electron>;
  atom_type: AtomType;
};

type Electron = {
  connections: Array<Atom>;
};

class AtomType {
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
