export default class LitearySubgenre {
  #name;
  #number;

  constructor(name, num) {
    this.#name = name;
    this.#number = num;
  }

  getName() {
    return this.#name;
  }

  getNumber() {
    return this.#number;
  }
}
