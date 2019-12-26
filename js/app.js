const game = new Game();

// event listeners
document.getElementById('btn__reset').addEventListener('click', e => {
  game.startGame();
});

document.getElementById('qwerty').addEventListener('click', e => {
  if (e.target.tagName === "BUTTON") {
    game.handleInteraction(e.target);
  }
});

document.querySelector('body').addEventListener('keyup', e => {
  if (game.active) {
    // allow alphabetical keystrokes when game is active.  allow user to resign.
    if (/[a-z]/.test(e.key) && e.key.length === 1) {
      game.handleKeystokeInteraction(e.key);
    } else if (e.key === "Escape") {
      const choice = confirm('Do you give up?');
      if (choice) { game.gameOver(false) }
    }
  } else {
    if (e.key === "Enter") { game.startGame() }
  }
});