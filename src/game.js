export default class Game {
  constructor (question, answer){
    this.question = question;
    this.answer = answer;
    this.rightAnswer = 0; 
  }

  score() {
    console.log('score function'); 
    return this.rightAnswer +=1; 
  }

}