export default class Game {
  constructor (player){
    this.player = player; 
    this.totalPoints = 0; 
    this.leaderboard =  [ first = {name: "Nick", score: 15}, second = {name: "Victoria", score: 10}, third = {name: "Louie", score: 5}]; 
  }

  score() {
    console.log('score function'); 
    return this.totalPoints +=1; 
  }

  topPlayers() {
    if (this.totalPoints > this.leaderboard.first)
  }






}