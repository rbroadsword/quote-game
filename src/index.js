//for UI logic
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import QuoteService from './js/quote-service.js'; 
import Game from './game.js'; 

function getQuestion1(response) {
  if (response instanceof Error === false) {
    console.log(response); 
    $('.quote').text(`Who is talking in the quote?"
    ${response.content}"`);
    $('.answer').text(`${response.author}`);
    $('.wrongAnswer1').text(`Wrong Person1`);
    $('.wrongAnswer2').text(`Wrong Person2`);
  } 
}

function CheckAnswer() {
  const game = new Game('','');
  if($('.answer').click() === true) {
    game.score(); 
    nextQuestion(); 
  } else {
    nextQuestion(); 
  }
}



$(document).ready(function() {
  $('#start').click(function() {
    QuoteService.getQuote()
      .then(function(response) {
        getQuestion1(response); 
      });
      CheckAnswer(); 
      console.log(`score is ${game.rightAnswer}`); 
    }); 
    console.log(`score is ${game.rightAnswer}`); 
  });



