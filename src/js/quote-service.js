//for business logic, constructors, and functions

export default class QuoteService {
  static getQuote() {
    return fetch(`https://api.quotable.io/random?tags=famous-quotes`)
      .then(function (response) {
        if (!response.ok) {
          return Promise.reject(response.status);
        }
        return response.json();
      });
  }
}