const keysRow1 = [
  { code: 'Backquote', char: '`', size: 'sm' },
  { code: 'Digit1', char: '1', size: 'sm' },
  { code: 'Digit2', char: '2', size: 'sm' },
  { code: 'Digit3', char: '3', size: 'sm' },
  { code: 'Digit4', char: '4', size: 'sm' },
  { code: 'Digit5', char: '5', size: 'sm' },
  { code: 'Digit6', char: '6', size: 'sm' },
  { code: 'Digit7', char: '7', size: 'sm' },
  { code: 'Digit8', char: '8', size: 'sm' },
  { code: 'Digit9', char: '9', size: 'sm' },
  { code: 'Digit0', char: '0', size: 'sm' },
  { code: 'Minus', char: '-', size: 'sm' },
  { code: 'Equal', char: '=', size: 'sm' },
  { code: 'Backspace', char: 'Delete', size: 'md' },
];
const keysRow2 = [
  { code: 'Tab', char: 'Tab', size: 'md' },
  { code: 'KeyQ', char: 'Q', size: 'sm' },
  { code: 'KeyW', char: 'W', size: 'sm' },
  { code: 'KeyE', char: 'E', size: 'sm' },
  { code: 'KeyR', char: 'R', size: 'sm' },
  { code: 'KeyT', char: 'T', size: 'sm' },
  { code: 'KeyY', char: 'Y', size: 'sm' },
  { code: 'KeyU', char: 'U', size: 'sm' },
  { code: 'KeyI', char: 'I', size: 'sm' },
  { code: 'KeyO', char: 'O', size: 'sm' },
  { code: 'KeyP', char: 'P', size: 'sm' },
  { code: 'BracketLeft', char: '[', size: 'sm' },
  { code: 'BracketRight', char: ']', size: 'sm' },
  { code: 'Backslash', char: '\\', size: 'sm' },
];
const keysRow3 = [
  { code: 'CapsLock', char: 'Caps Lock', size: 'lg' },
  { code: 'KeyA', char: 'A', size: 'sm' },
  { code: 'KeyS', char: 'S', size: 'sm' },
  { code: 'KeyD', char: 'D', size: 'sm' },
  { code: 'KeyF', char: 'F', size: 'sm' },
  { code: 'KeyG', char: 'G', size: 'sm' },
  { code: 'KeyH', char: 'H', size: 'sm' },
  { code: 'KeyJ', char: 'J', size: 'sm' },
  { code: 'KeyK', char: 'K', size: 'sm' },
  { code: 'KeyL', char: 'L', size: 'sm' },
  { code: 'Semicolon', char: ':', size: 'sm' },
  { code: 'Quote', char: "'", size: 'sm' },
  { code: 'Enter', char: 'Enter', size: 'lg' },
];
const keysRow4 = [
  { code: 'ShiftLeft', char: 'Shift', size: 'xl' },
  { code: 'KeyZ', char: 'Z', size: 'sm' },
  { code: 'KeyX', char: 'X', size: 'sm' },
  { code: 'KeyC', char: 'C', size: 'sm' },
  { code: 'KeyV', char: 'V', size: 'sm' },
  { code: 'KeyB', char: 'B', size: 'sm' },
  { code: 'KeyN', char: 'N', size: 'sm' },
  { code: 'KeyM', char: 'M', size: 'sm' },
  { code: 'Comma', char: ',', size: 'sm' },
  { code: 'Period', char: '.', size: 'sm' },
  { code: 'Slash', char: '/', size: 'sm' },
  { code: 'ShiftRight', char: 'Shift', size: 'xl' },
];
const keysRowR = [{ code: 'Space', char: ' ', size: 'xl' }];

export const keysList = [keysRow1, keysRow2, keysRow3, keysRow4, keysRowR];

export const allChars = [...keysRow1, ...keysRow2, ...keysRow3, ...keysRow4];
