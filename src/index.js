//for UI logic
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import QuoteService from './js/quote-service.js';
import MovieQuoteService from './js/moviequote-service';
import Game from './game.js';

function answerIndex() {
  const randomAnswerIndex = Math.floor(Math.random() * 4) + 1;
  console.log("this is the right answer: " + randomAnswerIndex);
  return randomAnswerIndex;
}

function generateRandomQuote(newGame, randomAnswerIndex) {
  $('#question').show();
  for (let i = 1; i < 5; i++) {
    QuoteService.getQuote()
      .then(function (response) {
        if (i === randomAnswerIndex) {
          $('#quoteText').html(`<span class="quote-question">Who is talking in the quote?</span><span class="quote-text">"${response.content}"</span>`);
        }
        $('#choice' + i + ' > label').text(response.author);
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

function generateMovieQuote() {
  $('#question').show();
  const randomAnswerIndex = Math.floor(Math.random() * 4) + 1;
  console.log(randomAnswerIndex);
  for (let i = 1; i < 5; i++) {
    MovieQuoteService.getMovieQuote()
      .then(function (response) {
        if (i === randomAnswerIndex) {
          $('#quoteText').html(`<span class="quote-question">Who is talking in the quote?</span> <span class="quote-text">"${response.quote}"</span>`);
        }
        $('#choice' + i + ' > label').text(`${response.role} from "${response.show}"`);
      });
  }
}

$(document).ready(function () {
  let answerID = 0;
  $('#randomQuote').click(function () {
    $('#submitRandomAnswer').show();
    $('#submitMovieAnswer').hide();
    $('#randomQuote').hide();
    $('#movieQuote').hide();
    let newGame = new Game("", "");
    answerID = answerIndex();
    generateRandomQuote(newGame, answerID);
    $('#submitRandomAnswer').click(function () {
      checkAnswer(answerID, newGame);
      answerID = answerIndex();
      if (newGame.turnCount < 5) {
        newGame.turnCount += 1;
        generateRandomQuote(newGame, answerID);
      } else {
        $(".question").hide();
        $(".displayScore").show();
        $('.displayScore').text(`Your score is: ${newGame.rightAnswer}`);
      }
    });


    $('#movieQuote').click(function () {
      $('#submitMovieAnswer').show();
      $('#submitRandomAnswer').hide();
      $('#randomQuote').hide();
      $('#movieQuote').hide();
      generateMovieQuote();
    });

    $('#submitMovieAnswer').click(function () {
      generateMovieQuote();
    });
  });
});


