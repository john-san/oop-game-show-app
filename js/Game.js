/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
   constructor() {
     this.missed = 0;
     this.phrases = this.createPhrases();
     this.activePhrase = null;
     this.triesLeft = 5;
   }
   
   // initialize this.phrases
   createPhrases() {
     const phrases = [];
     phrases.push(new Phrase('Do you understand the words that are coming out of my mouth?'));
     phrases.push(new Phrase("Which one of y'all kicked me?"));
     phrases.push(new Phrase('Wipe yourself off, you dead.'));
     phrases.push(new Phrase('Man, who do you think you kidnapped? Chelsea Clinton?'));
     phrases.push(new Phrase("You didn't just touch my goddamn radio!"));

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
    document.getElementById('overlay').style.display = 'none';
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
   }

   checkForWin() {
     return document.querySelectorAll('#phrase ul li.hide').length === 0;
   }

   gameOver(outcome) {
    const overlay = document.getElementById('overlay');
    overlay.style.display = '';
    overlay.classList.remove('start', 'win', 'lose');
    const header = document.querySelector("h1#game-over-message");

    if (outcome === true) {
      overlay.classList.add('win');
      header.textContent = "You win! Congrats!!";
    } else {
      overlay.classList.add('lose');
      header.textContent = "You ran out of tries, you lose!";
    }
   }

   removeLife() {
    this.updateHeartImage();
    this.triesLeft -= 1;

    if (this.triesLeft === 0) { this.gameOver(false) }
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

   handleInteraction(button) {
     const letter = button.textContent;

     if (this.activePhrase.checkLetter(letter)) {
      button.classList.add('chosen');
      this.activePhrase.showMatchedLetter(letter);
      
      if (this.checkForWin()) { this.gameOver(true) }
     } else {
      button.classList.add('wrong');
      this.removeLife();
     }

     button.setAttribute('disabled', true);
   }
 }