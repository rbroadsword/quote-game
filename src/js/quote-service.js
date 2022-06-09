//for business logic, constructors, and functions

export default class QuoteService {
  static getQuote() {
    return fetch(`https://movie-quote-api.herokuapp.com/v1/quote/`)
      .then(function (response) {
        if (!response.ok) {
          return Promise.reject(response.status);
        }
        return response.json();
      });
  }
}