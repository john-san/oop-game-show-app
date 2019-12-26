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