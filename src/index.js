//for UI logic
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import QuoteService from './js/quote-service.js'; 

function loopThroughQuestions() {
  for (let i = 1; i < 10; i++) {
    let submitAnswer = '#submitAnswer' + i;
    let currentQuestion = '#question' + i;
    let nextQuestion = '#question' + (i + 1);
    let quoteText = '#quoteText' + (i + 1);
    let correctAnswer = '#correctAnswer' + (i +1);

    $(submitAnswer).click(function() {
      $(currentQuestion).hide();
      $(nextQuestion).show();
      QuoteService.getQuote() 
      .then(function(response) {
        $(quoteText).text(response.content)
        $(correctAnswer).text(response.author);
      });
    })
  }
}

$(document).ready(function() {
  $('#startGame').click(function() {
    $('#submitAnswer').show();
    $('#question1').show();
    $('#startGame').hide();

    QuoteService.getQuote() 
      .then(function(response) {
        $('#quoteText1').text(response.content)
        $('#correctAnswer1').text(response.author);
      });
  });

  loopThroughQuestions();
}); 