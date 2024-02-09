export enum Key {
  Up = "ArrowUp",
  Down = "ArrowDown",
  Left = "ArrowLeft",
  Right = "ArrowRight",
  Space1 = "Space",
  Space2 = " ",
  Shift = "Shift",
}

type Keymap = Map<Array<string>, () => void>;

export class KeyHandler {
  constructor(
    private keymap: Keymap = new Map(),
    private pressedKeys: Array<string> = []
  ) {}

  // Setup functions
  createKeyMap(keymap: Keymap): this {
    this.keymap = keymap;
    return this;
  }

  setupKeyListeners(): this {
    document.addEventListener("keydown", (event) => this.handleKeyDown(event));
    document.addEventListener("keyup", (event) => this.handleKeyUp(event));
    return this;
  }

  // Helper functions for key events
  handleKeyDown(event: KeyboardEvent) {
    if (!this.pressedKeys.includes(event.key)) {
      this.pressedKeys.push(event.key);
    }

    this.checkKeys();
  }

  handleKeyUp(event: KeyboardEvent) {
    // Remove the released key from the array
    const index = this.pressedKeys.indexOf(event.key);
    if (index !== -1) {
      this.pressedKeys.splice(index, 1);
    }

    // Check if multiple keys are still being held down
    this.checkKeys();
  }

  checkKeys(this: KeyHandler) {
    for (let j = 0; j < this.keymap.size; j++) {
      const [keys, action] = Array.from(this.keymap.entries())[j];
      for (let k = 0; k < keys.length; k++) {
        if (this.pressedKeys.includes(keys[k])) {
          action();
        }
      }
    }

    console.log("Keys: " + this.keymap);
  }
}
