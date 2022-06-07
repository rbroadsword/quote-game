//for UI logic
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import QuoteService from './js/quote-service.js';
import MovieQuoteService from './js/moviequote-service';
// import Game from './game.js';

// function getQuestion1(response) {
//   if (response instanceof Error === false) {
//     console.log(response);
//     $('.quote').text(`Who is talking in the quote?"
//     ${response.content}"`);
//     $('.answer').text(`${response.author}`);
//     $('.wrongAnswer1').text(`Wrong Person1`);
//     $('.wrongAnswer2').text(`Wrong Person2`);
//   }
// }

// function nextQuestion() { }

// function CheckAnswer() {
//   const game = new Game('', '');
//   if ($('.answer').click() === true) {
//     game.score();
//     nextQuestion();
//   } else {
//     nextQuestion();
//   }
// }
function generateRandomQuote() {
  $('#question').show();

  const randomAnswerIndex = Math.floor(Math.random() * 4) + 1;

  console.log(randomAnswerIndex);

  for (let i = 1; i < 5; i++) {
    QuoteService.getQuote()
      .then(function (response) {

        if (i === randomAnswerIndex) {
          $('#quoteText').text(`Who is talking in the quote? "${response.content}"`);
        }

        $('#choice' + i + ' > label').text(response.author);
      });
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
          $('#quoteText').text(`Who is talking in the quote? "${response.quote}"`);
        }

        $('#choice' + i + ' > label').text(`${response.role} from "${response.show}"`);
      });
  }
}


// function loopThroughQuestions() {
//   for (let i = 1; i < 10; i++) {
//     let submitAnswer = '#submitAnswer' + i;
//     let currentQuestion = '#question' + i;
//     let nextQuestion = '#question' + (i + 1);
//     let quoteText = '#quoteText' + (i + 1);
//     let correctAnswer = '#correctAnswer' + (i + 1);

//     $(submitAnswer).click(function () {
//       $(currentQuestion).hide();
//       $(nextQuestion).show();
//       QuoteService.getQuote()
//         .then(function (response) {
//           $(quoteText).text(response.content)
//           $(correctAnswer).text(response.author);
//         });
//     })
//   }
// }

$(document).ready(function () {
  //   $('#start').click(function() {
  //     QuoteService.getQuote()
  //       .then(function(response) {
  //         getQuestion1(response); 
  //       });
  //       CheckAnswer(); 
  //       console.log(`score is ${game.rightAnswer}`); 
  //     }); 
  //     console.log(`score is ${game.rightAnswer}`); 
  //   });



  $('#randomQuote').click(function () {
    $('#submitRandomAnswer').show();
    $('#submitMovieAnswer').hide();
    $('#randomQuote').hide();
    $('#movieQuote').hide();
    generateRandomQuote();
  });

  $('#submitRandomAnswer').click(function () {
    generateRandomQuote();
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

  // loopThroughQuestions();


}); 
