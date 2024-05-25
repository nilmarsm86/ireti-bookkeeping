import { Book } from "./Book";

export default class Sale {
  #moment;
  #book;

  constructor(book) {
    if (book instanceof Book === false) {
      throw new Error("book must be type of Book");
    }
    this.#book = book;
    this.#book.decrese();
    this.#moment = new Date();
  }
}
