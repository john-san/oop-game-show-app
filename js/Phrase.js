class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  // display phrase on game board
  addPhraseToDisplay() {
    const phraseUL = document.querySelector('#phrase ul');
    const characters = this.phrase.split('');
    const letterRegex = /[a-z]/;
    const spaceRegex = /\s/;
    const puncRegex = /[',\.!\?]/;

    characters.forEach(character => {
      const li = document.createElement('li');
      li.textContent = character;
      li.classList.add('animated');
      if (letterRegex.test(character)) {
        li.classList.add('hide', 'letter', character);
      } else if (spaceRegex.test(character)) {
        li.classList.add('space');
      } else if (puncRegex.test(character)) {
        li.classList.add('punc', 'show');
      }

      phraseUL.appendChild(li);
    });
  }
  
  checkLetter(letter) { return this.phrase.includes(letter) }

  showMatchedLetter(letter) {
    const letterDOMArr = [...document.getElementsByClassName(letter)];

    letterDOMArr.forEach(letterDOM => {
      letterDOM.classList.remove('hide');
      letterDOM.classList.add('show');
      animateCSS(letterDOM, "flipInY", () => game.interacting = false , "faster");
    });
  }
}