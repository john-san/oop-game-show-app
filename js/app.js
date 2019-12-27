// Globals
const game = new Game();
const overlay = document.getElementById("overlay");
const startBtn = document.getElementById('btn__reset');
const freeLetterBtn = document.getElementById('btn__free-letter');
const newGameBtn = document.getElementById('btn__new-game');
const resignBtn = document.getElementById('btn__resign');
const onscreenKeyboard = document.getElementById('qwerty');

// event listeners
startBtn.addEventListener('click', e => game.startGame());

freeLetterBtn.addEventListener('click', e => {
  game.giveLetter();
  freeLetterBtn.blur();
});

newGameBtn.addEventListener('click', e => game.startGame());

resignBtn.addEventListener('click', e => {
  const choice = confirm("Are you sure you'd like to resign?");
  if (choice === true) {
    game.gameOver(false);
    resignBtn.blur();
  }
});

onscreenKeyboard.addEventListener('click', e => {
  if (e.target.tagName === "BUTTON") {
    game.handleInteraction(e.target)
  }
});

document.querySelector('body').addEventListener('keyup', e => {
  if (game.active === true) {
    // allow alphabetical keystrokes when game is active.  
    if (/[a-z]/.test(e.key) && e.key.length === 1) {
      game.handleKeystokeInteraction(e.key);
    } else if (e.key === "Escape") { // allow user to resign active game
      const choice = confirm("Are you sure you'd like to resign?");
      if (choice === true) {
        game.gameOver(false)
      }
    }
    // allow user to start game using enter key
  } else if (e.key === "Enter") {
    game.startGame()
  }
});

/* General helper functions */
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

function toggleClass(node, className) {
  if (node.classList.value.includes(className)) {
    node.classList.remove(className);
  } else {
    node.classList.add(className);
  }
}

const addClassIfDoesNotExist = (node, className) => {
  if (node.classList.value.includes(className) === false) {
    node.classList.add(className);
  }
};

const removeClassIfExists = (node, className) => {
  if (node.classList.value.includes(className)) {
    node.classList.remove(className);
  }
};
