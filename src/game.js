export default class Game {
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
    this.randomAnswerIndex = 0;
    this.rightAnswer = 0;
    this.turnCount = 1;
    this.correctAnswers = {}; 
    this.player = {name: "", score: 2}; 
    this.movieRanking1 = {name: "Coco", score: 4}; 
    this.movieRanking2 = {name: "David", score: 3}; 
    this.movieRanking3 = {name: "JJ", score: 1}; 
    this.randomRanking1 = {name: "Theo", score: 4};
    this.randomRanking2 = {name: "Leo", score: 3};
    this.randomRanking3 = {name: "Cleo", score: 1};
  }

  score() {
    this.rightAnswer += 1;
    this.player.score = this.rightAnswer; 
  }

  topMoviePlayers() {
    if (this.player.score > this.movieRanking1.score) {
      this.movieRanking3 = this.movieRanking2; 
      this.moviewRanking2 = this.movieRanking1; 
      this.movieRanking1 = this.player; 
    } else if (this.player.score > this.movieRanking2.score) {
      this.movieRanking3 = this.movieRanking2; 
      this.movieRanking2 = this.player; 
    } else if (this.player.score > this.movieRanking3.score) {
      this.movieRanking3 = this.player; 
    }
  }
  topRandomPlayers() {
    if (this.player.score > this.randomRanking1.score) {
      this.randomRanking3 = this.randomRanking2; 
      this.randomRanking2 = this.randomRanking1; 
      this.randomRanking1 = this.player; 
    } else if (this.player.score > this.randomRanking2.score) {
      this.randomRanking3 = this.randomRanking2; 
      this.randomRanking2 = this.player; 
    } else if (this.player.score > this.randomRanking3.score) {
      this.randomRanking3 = this.player; 
    }
  }

}
