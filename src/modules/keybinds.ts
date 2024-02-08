enum Key {
    Up = "ArrowUp",
    Down = "ArrowDown",
    Left = "ArrowLeft",
    Right = "ArrowRight",
}

export function handleKeyPress(event: KeyboardEvent): void {
  switch (event.key) {
    case Key.Up:
      console.log("Up arrow key pressed");
      break;
    case Key.Down:
      console.log("Down arrow key pressed");
      break;
    case Key.Left:
      console.log("Left arrow key pressed");
      break;
    case Key.Right:
      console.log("Right arrow key pressed");
      break;
    case "Enter":
      console.log("Enter key pressed");
      break;
    default:
      console.log(`Key pressed: ${event.key}`);
  }
}
