//for business logic, constructors, and functions
// https://api.quotable.io/random

export default class QuoteService {
  static getQuote() {
    return fetch(`https://api.quotable.io/random`)
      .then(function (response) {
        if (!response.ok) {
          return Promise.reject(response.status);
        }
        return response.json();
      });
  }
}