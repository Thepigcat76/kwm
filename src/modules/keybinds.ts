export enum Key {
    Up = "ArrowUp",
    Down = "ArrowDown",
    Left = "ArrowLeft",
    Right = "ArrowRight",
}

export class KeyHandler {
  private keys: Map<string, () => void> 
  
  constructor() {
    this.keys = new Map();
  }

  createKeyMap(keys: Map<string, () => void>): this {
    this.keys = keys;
    return this;
  }

  handleKeyPress(event: KeyboardEvent): void {
    this.keys.get(event.key)!()
  }
}
