class Game {
   constructor() {
     this.active = false; //true when game is active, error safeguard
     this.missed = 0;
     this.phrases = this.createPhrases();
     this.activePhrase = null;
     this.interacting = false; // true when handleInteraction is running, error safeguard
   }
   
   // initialize this.phrases
   createPhrases() {
     const phrases = [];
     phrases.push(new Phrase("Man destroyin' a classic!"));
     phrases.push(new Phrase("Don't stop 'till you get enough!"));
     phrases.push(new Phrase("'Cha mone Lee!"));
     phrases.push(new Phrase("I knew you was 'lyin."));
     phrases.push(new Phrase("OK Fungow, right now! ...What did I just say?"));
     phrases.push(new Phrase("Follow the rich white man."));
     phrases.push(new Phrase("That's Ricky Tan? That's a midget in a bathrobe!"));
     phrases.push(new Phrase("I said 'she was the bomb'"));
     phrases.push(new Phrase("You Americans are so funny."));
     phrases.push(new Phrase("Drop the blade and let the bird go."));
     phrases.push(new Phrase("I knew somethin' was wrong when my key wasn't working."));
     phrases.push(new Phrase("I'll shoot you, say 'ya fell in the kitchen."));
     phrases.push(new Phrase("Big party tonight."));
     phrases.push(new Phrase("Why didn't you tell me this man rolls like this?"));
     phrases.push(new Phrase("That means 'I go this way and you go that way.'"));
     phrases.push(new Phrase("I will slap you if you don't move this car!"));
     phrases.push(new Phrase("Who died, Lee?"));
     phrases.push(new Phrase("Carter, this is your city, right?"));
     phrases.push(new Phrase("Better watch 'yo back. AHH!"));
     phrases.push(new Phrase("Butter cream, butter cream, croc skin."));
     phrases.push(new Phrase("Who put they hand on my butt?"));
     phrases.push(new Phrase("I've always wanted to go to Madison Square Garden."));
     phrases.push(new Phrase("Jackie always okay!"));

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

    this.fadeOutDisplay();
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
    this.updateHeartsCounter();
   }

   // clear phrase, reset keyboard & hearts 
   resetGame() {
    this.activePhrase = null;
    this.interacting = false;
    this.missed = 0;

    const phraseUL = document.querySelector('#phrase ul');
    const phraseULChildren = [...phraseUL.children];
    phraseULChildren.forEach(child => phraseUL.removeChild(child));

    const buttons = [...document.querySelectorAll('button.key')]
      .filter(key => key.classList.value.includes("chosen") || key.classList.value.includes("wrong") );
    buttons.forEach(button => {
      button.classList.remove('chosen', 'wrong');
      button.removeAttribute('disabled');
    });

    const hearts = [...document.querySelectorAll('li.tries img')]
      .filter(heart => heart.getAttribute("src") === "images/lostHeart.png")
      .forEach(heart => {
        heart.setAttribute('src', "images/liveHeart.png");
        heart.setAttribute('alt', 'Heart Icon');
    });
   }

   // display correct gameOver message based on game situation
   gameOver(outcome) {
    this.fadeInDisplay();
    this.showAnswer();

    const gameOverMessage = document.querySelector("h1#game-over-message");
    
    if (outcome === true) {
      overlay.classList.add('win');
      gameOverMessage.textContent = "You win! Congrats!!";
    } else {
      overlay.classList.add('lose');
      gameOverMessage.textContent = "You ran out of tries, you lose!";
    }
   }

   handleInteraction(button) {
    if (this.interacting === false) {
      this.interacting = true;

      const letter = button.textContent;
      button.setAttribute('disabled', true);

      //  if letter exists in phrase, reveal the letter. if not, remove a life.
      if (this.activePhrase.checkLetter(letter)) {
        button.classList.add('chosen');
        this.activePhrase.showMatchedLetter(letter);
        if (this.checkForWin()) { this.gameOver(true) } // checkforWin
      } else {
        button.classList.add('wrong');
        this.removeLife();
        this.interacting = false;
      }
    }
  }

  handleKeystokeInteraction(key) {
    const button = [...document.querySelectorAll("button.key")]
      .find(button => button.textContent === key);
    // only handleInteraction if button isn't used already
    if (button.getAttribute('disabled') !== "true") {
      this.handleInteraction(button);
    } 
  }

   // no more li elements w/ hide class === all letters are revealed
   checkForWin() {
     return document.querySelectorAll('#phrase ul li.hide').length === 0;
   }

   // fade out screen when starting game from overlay screen 
   fadeOutDisplay() {
    if (this.active === false) {
      animateCSS(overlay, 'fadeOut', () =>  {
        overlay.style.display = "none";
        this.active = true;
      });
    }
   }

   // fade in overlay screen on gameOver
   fadeInDisplay() {
    overlay.classList.remove('start', 'win', 'lose');
    if (this.active === true) { 
      overlay.style.display = "flex"; // note to self: must set before animateCSS, otherwise won't work
      animateCSS(overlay, 'fadeIn', () => this.active = false, "delay-0-5s") 
    }
   }

   // helper in gameOver to show answer
   showAnswer() {
     document.getElementById('phrase-answer').textContent = `The answer was: "${this.activePhrase.phrase}"`;
   }

   // hint to give free letters
   giveLetter() {
     const letter = this.activePhrase.mostCommonAvailableLetter;
     const button = [...document.querySelectorAll('button.key')]
      .find(button => button.textContent === letter);
      
     this.handleInteraction(button);
   }

   removeLife() {
     if (this.missed < 5) { 
      this.missed += 1;
      this.updateHeartImage();
      this.updateHeartsCounter();
      
      // if they've used up all their guesses, end the game w/ loss message
      if (this.missed === 5) { this.gameOver(false) }
     }
   }

   updateHeartImage() {
    const heartToRemove = this.heartToRemove;
    heartToRemove.setAttribute('src', "images/lostHeart.png");
    heartToRemove.setAttribute('alt', 'Missing Heart Icon');
   }

   updateHeartsCounter() {
     document.getElementById("hearts-left").textContent = 5 - this.missed;
   }
   get heartToRemove() {
     const remainingHearts = document.querySelectorAll('li.tries img[src="images/liveHeart.png"]');
     return remainingHearts[remainingHearts.length - 1];
   }
 }