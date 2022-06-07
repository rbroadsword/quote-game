export default class Sounds {
  constructor(correctSound, wrongSound) {
    this.correctSound = correctSound; 
    this.wrongSound = wrongSound; 
  }

  // this to be used in index.js 
  // mySound = new Sounds("../assets/img/sounds/Correct-sound-effect(1).mp3"); 
  //to call sound, mySound.playCorrectAnswer(); 
  playCorrectAnswer() {
    this.sound = document.createElement('audio'); 
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound); 
    this.play = function(){
      this.sound.play(); 
    }
    this.stop = function(){
      this.sound.pause(); 
    }
  }

  playWrongAnswer() {
    this.sound = document.createElement('audio'); 
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound); 
    this.play = function(){
      this.sound.play(); 
    }
    this.stop = function(){
      this.sound.pause(); 
    }
  }
}