//for UI logic
import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import QuoteService from "./js/quote-service.js";
import MovieQuoteService from "./js/moviequote-service";
import Game from "./game.js";
//import Sounds from "./js/sounds.js";

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
          `<span class="quote-question">Who is talking in the quote?</span><span class="quote-text">"${response.content}"</span>`
        );
      }
      $("#choice" + i + " > label").text(response.author);
    });
  }
}

function checkAnswer(choiceNumber, newGame) {
  if (document.getElementById("ans" + choiceNumber).checked) {
    newGame.score();
    console.log("this is total score " + newGame.rightAnswer);
    console.log("success");
  } else {
    console.log("fail");
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
      }
      $("#choice" + i + " > label").html(
        `<h3>${response.role} from "${response.show}"</h3>`
      );
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
        generateRandomQuote(newGame, answerID);
      } else {
        $(".question").hide();
        $(".displayScore").show();
        $(".displayScore").text(`Your score is: ${newGame.rightAnswer}`);
      }
    });
  });

  $("#movieQuote").click(function () {
    console.log("movie quote click function");
    $("#submitMovieAnswer").show();
    $("#submitRandomAnswer").hide();
    $("#randomQuote").hide();
    $("#movieQuote").hide();
    $('audio#encore')[0].play(); 
    let newGame = new Game("", "");
    answerID = answerIndex();
    generateMovieQuote(answerID);

    $("#submitMovieAnswer").click(function () {
      checkAnswer(answerID, newGame);
      $(".progress").html(`<div class="progress-bar" role="progressbar" 
      style="width: ${(newGame.turnCount / 5) * 100}%;" aria-valuenow="${newGame.turnCount}" aria-valuemin="0" aria-valuemax="5"></div>
    `);
      answerID = answerIndex();
      if (newGame.turnCount < 5) {
        newGame.turnCount += 1;
        generateMovieQuote(answerID);
      } else {
        $(".question").hide();
        $(".results").show();
        $(".displayScore").text(`Your score is: ${newGame.rightAnswer}`);
        //run topMoviePlayers() here? 
        $("#movieFirst").text(`Name: ${newGame.movieRanking1.name}  Score: ${newGame.movieRanking1.score}`);
        $("#movieSecond").text(`Name: ${newGame.movieRanking2.name}  Score: ${newGame.movieRanking2.score}`);
        $("#movieThird").text(`Name: ${newGame.movieRanking3.name}  Score: ${newGame.movieRanking3.score}`);
      }
    });
  });
});
