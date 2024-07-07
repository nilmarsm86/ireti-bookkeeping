import {
  empty,
  float,
  letters,
  numbers,
  price,
  unique,
} from "../hook/validator";

export const literary_subgenre_mapping = {
  id: { value: null },
  name: {
    value: "",
    constraints: [
      { type: empty, message: "El género literario debe tener un nombre!" },
      {
        type: letters,
        message: "El nombre del género literario debe contener solo letras!",
      },
      {
        type: unique,
        message: "Ya existe un género literario con este nombre!",
      },
    ],
  },
  num: {
    value: "",
    constraints: [
      {
        type: empty,
        message: "El género literario debe tener un número identificador!",
      },
      {
        type: numbers,
        message:
          "El número identificador del género literario debe contener solo números!",
      },
      {
        type: unique,
        message: "Ya existe un género literario con este número!",
      },
    ],
  },
};

export const country_mapping = {
  id: { value: null },
  name: {
    value: "",
    constraints: [
      { type: empty, message: "El país debe tener un nombre!" },
      {
        type: letters,
        message: "El nombre del país debe contener solo letras!",
      },
      {
        type: unique,
        message: "Ya existe un país con este nombre!",
      },
    ],
  },
};

export const province_mapping = {
  id: { value: null },
  name: {
    value: "",
    constraints: [
      { type: empty, message: "La provincia debe tener un nombre!" },
      {
        type: letters,
        message: "El nombre de la provincia debe contener solo letras!",
      },
      {
        type: unique,
        message: "Ya existe una provincia con este nombre!",
      },
    ],
  },
  country: {
    value: "",
    constraints: [
      {
        type: empty,
        message: "Debe seleccionar un país!",
      },
    ],
  },
};

export const author_mapping = {
  id: { value: null },
  name: {
    value: "",
    constraints: [
      { type: empty, message: "El autor debe tener un nombre!" },
      {
        type: letters,
        message: "El nombre del autor debe contener solo letras!",
      },
      {
        type: unique,
        message: "Ya existe un autor con este nombre!",
      },
    ],
  },
  gender: {
    value: "",
    constraints: [
      {
        type: empty,
        message: "Debe seleccionar el sexo del autor!",
      },
    ],
  },
  country: {
    value: "",
    constraints: [
      {
        type: empty,
        message: "Debe seleccionar un país!",
      },
    ],
  },
  province: {
    value: "",
  },
};

export const publishing_mapping = {
  id: { value: null },
  name: {
    value: "",
    constraints: [
      { type: empty, message: "La editorial debe tener un nombre!" },
      {
        type: unique,
        message: "Ya existe una editorial con este nombre!",
      },
    ],
  },
};

export const book_mapping = {
  id: { value: null },
  title: {
    value: "",
    constraints: [{ type: empty, message: "El libro debe tener un título!" }],
  },
  editionYear: {
    value: "",
    constraints: [
      {
        type: empty,
        message: "Debe establecer el año de edición del libro",
      },
    ],
  },
  editionNumber: {
    value: "",
    constraints: [
      {
        type: empty,
        message: "Debe establecer el número de la edición del libro",
      },
    ],
  },
  acquisitionPrice: {
    value: "",
    constraints: [
      {
        type: empty,
        message: "Debe establecer el precio de adquisición del libro",
      },
      {
        type: price,
        message: "Debe establecer el precio con el formato correcto",
      },
    ],
  },
  transportPrice: {
    value: "",
    constraints: [
      {
        type: empty,
        message: "Debe establecer el precio de transportación del libro",
      },
      {
        type: price,
        message: "Debe establecer el precio con el formato correcto",
      },
    ],
  },
  marketingMegas: {
    value: "",
    constraints: [
      {
        type: empty,
        message:
          "Debe establecer la cantidad de megas invertidos en el marqueting del libro",
      },
      {
        type: numbers,
        message: "Debe establecer los megas en el formato correcto",
      },
    ],
  },
  difficultPrice: {
    value: "",
    constraints: [
      {
        type: empty,
        message:
          "Debe establecer el precio de dificultad de adquisición del libro",
      },
      {
        type: price,
        message: "Debe establecer el precio con el formato correcto",
      },
    ],
  },
  amount: {
    value: "",
    constraints: [
      {
        type: empty,
        message: "Debe seleccionar la cantidad de libros comprados",
      },
      {
        type: numbers,
        message: "La cantidad de libros comprados debe ser un número",
      },
    ],
  },
  literarySubgenre: {
    value: "",
    constraints: [
      {
        type: empty,
        message: "Debe seleccionar el género literario del libro",
      },
    ],
  },
  publishing: {
    value: "",
    constraints: [
      {
        type: empty,
        message: "Debe seleccionar la editorial del libro",
      },
    ],
  },
  authors: {
    value: [],
    constraints: [
      {
        type: empty,
        message: "Un libro debe tener al menos un autor.",
      },
    ],
  },
};
