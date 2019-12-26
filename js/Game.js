class Game {
   constructor() {
     this.active = false;
     this.missed = 0;
     this.phrases = this.createPhrases();
     this.activePhrase = null;
     
   }
   
   // initialize this.phrases
   createPhrases() {
     const phrases = [];
    //  RH 1
     phrases.push(new Phrase('Do you understand the words that are coming out of my mouth?'));
     phrases.push(new Phrase("Which one of y'all kicked me?"));
     phrases.push(new Phrase('Wipe yourself off, you dead.'));
     phrases.push(new Phrase('Man, who do you think you kidnapped? Chelsea Clinton?'));
     phrases.push(new Phrase("You didn't just touch my goddamn radio!"));
    // RH 2
     phrases.push(new Phrase("In HK, I am Michael Jackson and you are Toto."));
     phrases.push(new Phrase("Follow the rich white man."));
     phrases.push(new Phrase("Women think I'm  cute. Like Snoopy."));
     phrases.push(new Phrase("That's Ricky Tan? Man, that's a midget in a bathrobe!"));
     phrases.push(new Phrase("I said 'she was the bomb'"));
     phrases.push(new Phrase("You Americans are so funny."));
     phrases.push(new Phrase("Mmmm, butter cream, butter cream, croc skin, butter cream..."));
     phrases.push(new Phrase("Drop the blade and let the bird go."));
     phrases.push(new Phrase("I knew somethin' was wrong when my key wasn't working."));
     phrases.push(new Phrase("I'll shoot you, say 'ya fell in the kitchen."));

     
     return phrases;
   }

   // grab random phrase from this.phrases
   getRandomPhrase() {
    // gets random number between 0 and [max - 1](arr = 0 based idx)
    const getRandomNumber = (max) => Math.floor(Math.random() * max);    
    const randomIdx = getRandomNumber(this.phrases.length);
    return this.phrases[randomIdx];
   }

   startGame() {
    this.resetGame();
    this.active = true;
    document.getElementById('overlay').style.display = 'none';
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
   }

   // clear phrase, reset keyboard & hearts 
   resetGame() {
    const phraseUL = document.querySelector('#phrase ul');
    const phraseULChildren = [...phraseUL.children];
    phraseULChildren.forEach(child => phraseUL.removeChild(child));

    const buttons = [...document.querySelectorAll('button.key')]
      .filter(key => key.classList.value.includes("chosen") || key.classList.value.includes("wrong") );
    buttons.forEach(button => {
      button.classList.remove('chosen', 'wrong');
      button.removeAttribute('disabled');
    });

    this.missed = 0;
    const hearts = [...document.querySelectorAll('li.tries img[src="images/lostHeart.png"]')];
    hearts.forEach(heart => {
      heart.setAttribute('src', "images/liveHeart.png");
      heart.setAttribute('alt', 'Heart Icon');
    });
   }

   // display correct gameOver message based on game situation
   gameOver(outcome) {
    const overlay = document.getElementById('overlay');
    overlay.style.display = '';
    overlay.classList.remove('start', 'win', 'lose');
    const gameOverMessage = document.querySelector("h1#game-over-message");
    document.getElementById('phrase-answer').textContent = `The answer was: "${this.activePhrase.phrase}"`;
    this.active = false;

    if (outcome === true) {
      overlay.classList.add('win');
      gameOverMessage.textContent = "You win! Congrats!!";
    } else {
      overlay.classList.add('lose');
      gameOverMessage.textContent = "You ran out of tries, you lose!";
    }
   }

   handleInteraction(button) {
    const letter = button.textContent;
    button.setAttribute('disabled', true);

    //  if letter exists in phrase, reveal the letter. if not, remove a life.
    if (this.activePhrase.checkLetter(letter)) {
     button.classList.add('chosen');
     this.activePhrase.showMatchedLetter(letter);
     
     // if entire phrase is revealed, end game w/ win message
     if (this.checkForWin()) { this.gameOver(true) }
    } else {
     button.classList.add('wrong');
     this.removeLife();
    }
  }

  handleKeystokeInteraction(key) {
    const button = [...document.querySelectorAll("button.key")]
      .find(button => button.textContent === key);
    this.handleInteraction(button);
  }

   // no more li elements w/ hide class === all letters are revealed
   checkForWin() {
     return document.querySelectorAll('#phrase ul li.hide').length === 0;
   }

   removeLife() {
    this.updateHeartImage();
    this.missed += 1;

    // if they've used up all their guesses, end the game w/ loss message
    if (this.missed === 5) { this.gameOver(false) }
   }

   updateHeartImage() {
    const heartToRemove = this.heartToRemove;
    heartToRemove.setAttribute('src', "images/lostHeart.png");
    heartToRemove.setAttribute('alt', 'Missing Heart Icon');
   }

   get heartToRemove() {
     const remainingHearts = document.querySelectorAll('li.tries img[src="images/liveHeart.png"]');
     return remainingHearts[remainingHearts.length - 1];
   }
 }