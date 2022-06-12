export default class Game {
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
    this.randomAnswerIndex = 0;
    this.rightAnswer = 0;
    this.turnCount = 1;
    this.correctAnswers = {}; // key-value pair storage, key - question text, value - correct answer
    this.player = {name: "", score: 2}; 
    this.movieRanking1 = {name: "Coco", score: 5}; 
    this.movieRanking2 = {name: "David", score: 3}; 
    this.movieRanking3 = {name: "JJ", score: 1}; 
    this.randomRanking1 = {name: "", score: 5};
    this.randomRanking2 = {name: "", score: 3};
    this.randomRanking3 = {name: "", score: 1};
  }

  score() {
    this.rightAnswer += 1;
    console.log("total score: " + this.rightAnswer);
  }

  topMoviePlayers() {
    if (this.player.score > this.movieRanking1.score) {
      this.movieRanking1 = this.player; 
    } else if (this.player.score > this.movieRanking2.score) {
      this.movieRanking2 = this.player; 
    } else if (this.player.score > this.movieRanking3.score) {
      this.movieRanking3 = this.player; 
    }
  }

  topRandomPlayers() {
    if (this.player.score > this.randomRanking1.score) {
      this.randomRanking1 = this.player; 
    } else if (this.player.score > this.randomRanking2.score) {
      this.randomRanking2 = this.player; 
    } else if (this.player.score > this.randomRanking3.score) {
      this.randomRanking3 = this.player; 
    }
  }

}
