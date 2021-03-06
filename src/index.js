//for UI logic
import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import "./assets/sounds/Correct-sound-effect (1).mp3";
import "./assets/sounds/wrongAnswer.mp3";
import "./assets/sounds/encore.mp3"; 
import QuoteService from "./js/quote-service.js";
import MovieQuoteService from "./js/moviequote-service";
import Game from "./game.js";
import ConfettiGenerator from "confetti-js"; 

function answerIndex() {
  const randomAnswerIndex = Math.floor(Math.random() * 4) + 1;
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
  mySound.volume = 0.1;
}

function playWrongAnswerSound() {
  let mySound = new Audio("./assets/img/wrongAnswer.mp3");
  mySound.play();
  mySound.volume = 0.1;
}

function playEncore() {
  let mySound = new Audio("./assets/img/encore.mp3"); 
  mySound.play();
  mySound.volume = 0.1; 
}

function checkAnswer(choiceNumber, newGame) {
  if (document.getElementById("ans" + choiceNumber).checked) {
    newGame.score();
    playCorrectAnswerSound();
    $('.correct').removeClass('.incorrect');
    $(".correct").addClass("correctAnswer"); 
    $('.incorrect').addClass("incorrectAnswer");
  } else {
    playWrongAnswerSound();
    $('.correct').removeClass('.incorrect');
    $(".correct").addClass("correctAnswer"); 
    $('.incorrect').addClass("incorrectAnswer"); 
  }
}

function generateMovieQuote(randomAnswerIndex) {
  $("#question").show();
  for (let i = 1; i < 5; i++) {
    MovieQuoteService.getMovieQuote().then(function (response) {
      if (i === randomAnswerIndex) {
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
  $("#nameBtn").click(function(event) {
    event.preventDefault();
    let newGame = new Game("", "");
    let name = $(".userName").val(); 
    newGame.player.name = name; 
    $("#nameForm, .intro").hide(); 
    $("#randomQuote, #movieQuote").show(); 
  
    let answerID = 0;
    $("#randomQuote").click(function () {
      $("#submitRandomAnswer").show();
      $("#submitMovieAnswer").hide();
      $("#randomQuote").hide();
      $("#movieQuote").hide();
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
            generateRandomQuote(newGame, answerID);
          }, "2500");
        } else {
          setTimeout(() => {
            newGame.topRandomPlayers();
            playEncore(); 
            let confettiSettings = { target: 'my-canvas' };
            let confetti = new ConfettiGenerator(confettiSettings);
            confetti.render();
            $(".question").hide();
            $(".results").show();
            $(".displayScore").text(`${newGame.player.name} your score is: ${newGame.rightAnswer}`);
            $('.randomLeaderBoard').show(); 
            $('#newGame').show();
            $("#randomFirst").text(`Name: ${newGame.randomRanking1.name}  Score: ${newGame.randomRanking1.score}`);
            $("#randomSecond").text(`Name: ${newGame.randomRanking2.name}  Score: ${newGame.randomRanking2.score}`);
            $("#randomThird").text(`Name: ${newGame.randomRanking3.name}  Score: ${newGame.randomRanking3.score}`);
          }, "2500");
        }
      });
    });

    $("#movieQuote").click(function () {
      $("#submitMovieAnswer").show();
      $("#submitRandomAnswer").hide();
      $("#randomQuote").hide();
      $("#movieQuote").hide();
      answerID = answerIndex();
      generateMovieQuote(answerID);

      $("#submitMovieAnswer").click(function () {
        checkAnswer(answerID, newGame);
        $(".progress").html(`<div class="progress-bar" role="progressbar" 
        style="width: ${(newGame.turnCount / 5) * 100}%;" aria-valuenow="${newGame.turnCount}" aria-valuemin="0" aria-valuemax="5"></div>`);
        answerID = answerIndex();
        if (newGame.turnCount < 5) {
          newGame.turnCount += 1;
          setTimeout(() => {
            $(".incorrect").removeClass("incorrectAnswer"); 
            $(".correct").removeClass("correctAnswer");
            $("label").removeClass("correct incorrect");
            generateMovieQuote(answerID);
          }, "2500");
        } else {
          setTimeout(() => {
            newGame.topMoviePlayers(); 
            playEncore();
            let confettiSettings = { target: 'my-canvas' };
            let confetti = new ConfettiGenerator(confettiSettings);
            confetti.render();
            $(".question").hide();
            $(".results").show();
            $(".displayScore").text(`${newGame.player.name} your score is: ${newGame.rightAnswer}`);
            $(".movieLeaderBoard").show(); 
            $('#newGame').show(); 
            $("#movieFirst").text(`Name: ${newGame.movieRanking1.name}  Score: ${newGame.movieRanking1.score}`);
            $("#movieSecond").text(`Name: ${newGame.movieRanking2.name}  Score: ${newGame.movieRanking2.score}`);
            $("#movieThird").text(`Name: ${newGame.movieRanking3.name}  Score: ${newGame.movieRanking3.score}`);
          }, "2500"); 
        }
      });
    });
  });

  $('#newGame').click(function() {
    this.rightAnswer = 0;
    this.turnCount = 1;
    location.reload(true);
  });
});
