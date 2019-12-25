/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

 class Game {
   constructor() {
     this.missed = 0;
     this.phrases = this.createPhrases();
     this.activePhrase = null;
   }
   
   // initialize this.phrases
   createPhrases() {
     const phrases = [];
     phrases.push(new Phrase('Do you understand the words that are coming out of my mouth?'));
     phrases.push(new Phrase("Which one of y'all kicked me?"));
     phrases.push(new Phrase('Wipe yourself off, you dead.'));
     phrases.push(new Phrase('Fifty million dollars? Man, who do you think you kidnapped? Chelsea Clinton?'));
     phrases.push(new Phrase("Oh, hell nah! You didn't just touch my goddamn radio!"));

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
 }