// Globals
const game = new Game();
const overlay = document.getElementById("overlay");

// modified animateCSS helper, from https://github.com/daneden/animate.css
function animateCSS(element, animationName, callback, speed = "fast") {
  const node = element;
  node.classList.add('animated', animationName, speed);

  function handleAnimationEnd() {
    node.classList.remove('animated', animationName, speed);
    node.removeEventListener('animationend', handleAnimationEnd);

    if (typeof callback === 'function') callback()
  }

  node.addEventListener('animationend', handleAnimationEnd);
};

// event listeners
document.getElementById('btn__reset').addEventListener('click', e => {
  game.startGame();
});

document.getElementById('btn__free-letter').addEventListener('click', e => {
  game.giveLetter();
});

document.getElementById('btn__new-game').addEventListener('click', e => {
  game.startGame();
});

document.getElementById('btn__resign').addEventListener('click', e => {
  const choice = confirm("Are you sure you'd like to resign?");
  if (choice) {
    game.gameOver(false);
    document.getElementById('btn__resign').blur();
  }
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
      const choice = confirm("Are you sure you'd like to resign?");
      if (choice) {
        game.gameOver(false)
      }
    }
  } else {
    if (e.key === "Enter") {
      game.startGame()
    }
  }
});
