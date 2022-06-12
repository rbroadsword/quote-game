//for UI logic
import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import "./assets/sounds/Correct-sound-effect (1).mp3";
import "./assets/sounds/wrongAnswer.mp3";
import QuoteService from "./js/quote-service.js";
import MovieQuoteService from "./js/moviequote-service";
import Game from "./game.js";

function answerIndex() {
  const randomAnswerIndex = Math.floor(Math.random() * 4) + 1;
  console.log("this is the right answer: " + randomAnswerIndex);
  return randomAnswerIndex;
}

function generateRandomQuote(newGame, randomAnswerIndex) {
  $("#question").show();
  for (let i = 1; i < 5; i++) {
    QuoteService.getQuote().then(function (response) {
      if (i === randomAnswerIndex) {
        $("#quoteText").html(
          `<span class="card-body">
          <h1 class="card-title">Who is talking in the quote?</h1></span><span class="card-text"><h2>"${response.content}"</h2></span>`
        );
        $("#choice" + i + " > label").text(response.author);
        $("#choice" + i + " > label").addClass('correct');
      } else {
      $("#choice" + i + " > label").text(response.author);
      $("#choice" + i + " > label").addClass('incorrect'); 
      }
    });
  }
}

function playCorrectAnswerSound() {
  let mySound = new Audio("./assets/img/Correct-sound-effect (1).mp3");
  mySound.play();
}

function playWrongAnswerSound() {
  let mySound = new Audio("./assets/img/wrongAnswer.mp3");
  mySound.play();
}

function checkAnswer(choiceNumber, newGame) {
  if (document.getElementById("ans" + choiceNumber).checked) {
    newGame.score();
    playCorrectAnswerSound();
    $('.correct').removeClass('.incorrect');
    $(".correct").addClass("correctAnswer"); 
    $('.incorrect').addClass("incorrectAnswer");
    console.log("success");
  } else {
    playWrongAnswerSound();
    $('.correct').removeClass('.incorrect');
    $(".correct").addClass("correctAnswer"); 
    $('.incorrect').addClass("incorrectAnswer"); 
    console.log("fail");
  }
}

function generateMovieQuote(randomAnswerIndex) {
  $("#question").show();
  for (let i = 1; i < 5; i++) {
    MovieQuoteService.getMovieQuote().then(function (response) {
      if (i === randomAnswerIndex) {
        let quote = response.quote; 
        console.log(quote); 
        $("#quoteText").html(
          `<span class="card-body">
          <h1 class="card-title">Who is talking in the quote?</h1></span><span class="card-text"><h2>"${response.quote}"</h2></span>`
        );
        $("#choice" + i + " > label").html(
          `<h3>${response.role} from "${response.show}"</h3>`
        );
        $("#choice" + i + " > label").addClass('correct');
      } else {
      $("#choice" + i + " > label").html(
        `<h3>${response.role} from "${response.show}"</h3>`);
        $("#choice" + i + " > label").addClass('incorrect'); 
      }
    });
  }
}

$(document).ready(function () {
  let answerID = 0;
  $("#randomQuote").click(function () {
    $("#submitRandomAnswer").show();
    $("#submitMovieAnswer").hide();
    $("#randomQuote").hide();
    $("#movieQuote").hide();
    let newGame = new Game("", "");
    answerID = answerIndex();
    generateRandomQuote(newGame, answerID);
    $("#submitRandomAnswer").click(function () {
      checkAnswer(answerID, newGame);
      $(".progress").html(`<div class="progress-bar" role="progressbar" 
      style="width: ${(newGame.turnCount / 5) * 100}%;" aria-valuenow="${newGame.turnCount}" aria-valuemin="0" aria-valuemax="5"></div>
    `);
      answerID = answerIndex();
      if (newGame.turnCount < 5) {
        newGame.turnCount += 1;
        setTimeout(() => {
          $(".incorrect").removeClass("incorrectAnswer"); 
          $(".correct").removeClass("correctAnswer");
          $("label").removeClass("correct incorrect");
          console.log(document.getElementById("question")); 
          generateRandomQuote(newGame, answerID);
        }, "5000");
      } else {
        setTimeout(() => {
        $(".question").hide();
        $(".results").show();
        $(".displayScore").text(`Your score is: ${newGame.rightAnswer}`);
        $('.randomLeaderBoard').show(); 
        $('#newGame').show();
        $("#randomFirst").text(`Name: ${newGame.randomRanking1.name}  Score: ${newGame.randomRanking1.score}`);
        $("#randomSecond").text(`Name: ${newGame.randomRanking2.name}  Score: ${newGame.randomRanking2.score}`);
        $("#randomThird").text(`Name: ${newGame.randomRanking3.name}  Score: ${newGame.randomRanking3.score}`);
        }, "5000");
        
      }
    });
  });

  $("#movieQuote").click(function () {
    console.log("movie quote click function");
    $("#submitMovieAnswer").show();
    $("#submitRandomAnswer").hide();
    $("#randomQuote").hide();
    $("#movieQuote").hide();
    //$('audio#encore')[0].play(); 
    let newGame = new Game("", "");
    answerID = answerIndex();
    generateMovieQuote(answerID);

    $("#submitMovieAnswer").click(function () {
      checkAnswer(answerID, newGame);
      $(".progress").html(`<div class="progress-bar" role="progressbar" 
      style="width: ${(newGame.turnCount / 5) * 100}%;" aria-valuenow="${newGame.turnCount}" aria-valuemin="0" aria-valuemax="5"></div>`);
      answerID = answerIndex();
      if (newGame.turnCount < 5) {
        newGame.turnCount += 1;
        generateMovieQuote(answerID);
      } else {
        $(".question").hide();
        $(".results").show();
        $(".displayScore").text(`Your score is: ${newGame.rightAnswer}`);
        $(".movieLeaderBoard").show(); 
        $('#newGame').show();
        //run topMoviePlayers() here? 
        $("#movieFirst").text(`Name: ${newGame.movieRanking1.name}  Score: ${newGame.movieRanking1.score}`);
        $("#movieSecond").text(`Name: ${newGame.movieRanking2.name}  Score: ${newGame.movieRanking2.score}`);
        $("#movieThird").text(`Name: ${newGame.movieRanking3.name}  Score: ${newGame.movieRanking3.score}`);
      }
    });
  });
  $('#newGame').click(function() {
    this.rightAnswer = 0;
    this.turnCount = 1;
    location.reload(true);
  });
});
