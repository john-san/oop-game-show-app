class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }

  /* Setup Functions */
  // add phrase to display
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

  /* Main Functions */
  checkLetter(letter) {
    return this.phrase.includes(letter)
  }

  // reveal all occurrences of letter on display
  showMatchedLetter(letter) {
    const letterDOMArr = [...document.getElementsByClassName(letter)];

    letterDOMArr.forEach(letterDOM => {
      letterDOM.classList.remove('hide');
      letterDOM.classList.add('show');
      animateCSS(letterDOM, "flipInY", () => game.interacting = false, "faster");
    });
  }

  /* Helper Functions */
  // helper for game.giveLetter
  get mostCommonAvailableLetter() {
    return [...document.querySelectorAll('button.key')]
      .filter(key => key.getAttribute('disabled') === null)
      .map(key => key.textContent)
      .reduce((highestCountLetter, currentLetter) => {
        const currentCount = this.count(this.phrase, currentLetter);
        const highestCount = this.count(this.phrase, highestCountLetter);
        if (currentCount > highestCount) {
          highestCountLetter = currentLetter
        }
        return highestCountLetter;
      }, 0);
  }
  
  // helper for mostCommonAvailableLetter
  count(str, char) {
    let total = 0;
    for (let i = 0; i < str.length; i++) {
      if (char === str[i]) {
        total += 1
      }
    }
    return total;
  }
}