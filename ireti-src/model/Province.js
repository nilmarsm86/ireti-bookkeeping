export default class Province {
  #name;

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  getInitialLetter() {
    return this.#name[0];
  }
}
