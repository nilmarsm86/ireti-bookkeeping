import Province from "./Province";

export default class Country {
  #name;
  #provinces;

  constructor(name) {
    this.#name = name;
    this.#provinces = [];
  }

  addProvince(province) {
    if (province instanceof Province) {
      throw new Error("province must be type of Province");
    }

    if (this.#provinces.indexOf(province) === -1) {
      this.#provinces.push(province);
    }
  }

  getProvinces() {
    return this.#provinces;
  }

  getName() {
    return this.#name;
  }

  getInitialLetter() {
    return this.#name[0];
  }
}
