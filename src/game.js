export default class Game {
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
    this.randomAnswerIndex = 0;
    this.rightAnswer = 0;
    this.turnCount = 1;
    this.correctAnswers = {}; // key-value pair storage, key - question text, value - correct answer
  }

  score() {
    this.rightAnswer += 1;
    console.log("total score: " + this.rightAnswer);
  }

  topPlayers() {
    if (this.totalPoints > this.leaderboard.first) {
      // TODO: 
    }
  }
}