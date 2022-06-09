export default class MovieQuoteService {
  static getMovieQuote() {
    return fetch(
      `https://movie-quote-api.herokuapp.com/v1/quote?censored`
    ).then(function (response) {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    });
  }
}
