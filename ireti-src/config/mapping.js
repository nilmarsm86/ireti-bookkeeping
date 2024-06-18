import { empty, letters, numbers, unique } from "../hook/validator";

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
