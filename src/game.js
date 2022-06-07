export default class Game {
  constructor(question, answer) {
    this.question = question;
    this.answer = answer;
    this.rightAnswer = 0;
    this.questions = [{
      text: 'who is president',
      answers: ['trump', 'biden', 'clinton', 'obama'],
      rightAnswer: 'biden',
      userAnswer: ''
    }];

  }

  score() {
    console.log('score function');
    return this.rightAnswer += 1;
  }

  topPlayers() {
    if (this.totalPoints > this.leaderboard.first)
  }






}