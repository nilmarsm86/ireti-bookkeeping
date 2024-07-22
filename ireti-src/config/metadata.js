export const literary_subgenre_metadata = [
  {
    name: "id",
    title: "ID",
    show: false,
    sortDirection: "descending",
    numeric: false,
  },
  {
    name: "name",
    title: "Nombre",
    show: true,
    sortDirection: "",
    numeric: false,
  },
  {
    name: "num",
    title: "Número",
    show: true,
    sortDirection: "",
    numeric: false,
    style: { maxWidth: "100px" },
  },
];

export const country_metadata = [
  {
    name: "id",
    title: "ID",
    show: false,
    sortDirection: "descending",
    numeric: false,
  },
  {
    name: "name",
    title: "Nombre",
    show: true,
    sortDirection: "",
    numeric: false,
  },
];

export const province_metadata = [
  {
    name: "id",
    title: "ID",
    show: false,
    sortDirection: "descending",
    numeric: false,
  },
  {
    name: "name",
    title: "Nombre",
    show: true,
    sortDirection: "",
    numeric: false,
  },
  {
    name: "country",
    title: "País",
    show: true,
    sortDirection: "",
    numeric: false,
  },
];

export const author_metadata = [
  {
    name: "id",
    title: "ID",
    show: false,
    sortDirection: "descending",
    numeric: false,
  },
  {
    name: "name",
    title: "Nombre",
    show: true,
    sortDirection: "",
    numeric: false,
    style: { minWidth: "350px" },
  },
  {
    name: "sex",
    title: "Género",
    show: true,
    sortDirection: "",
    numeric: true,
    style: { maxWidth: "55px", justifyContent: "center" },
    value: "gender",
  },
  {
    name: "country",
    title: "País",
    show: true,
    sortDirection: "",
    numeric: false,
  },
  {
    name: "province",
    title: "Provincia",
    show: true,
    sortDirection: "",
    numeric: false,
  },
];

export const publishing_metadata = [
  {
    name: "id",
    title: "ID",
    show: false,
    sortDirection: "descending",
    numeric: false,
  },
  {
    name: "name",
    title: "Nombre",
    show: true,
    sortDirection: "",
    numeric: false,
  },
];

export const book_metadata = [
  {
    name: "id",
    title: "ID",
    show: false,
    sortDirection: "descending",
    numeric: false,
  },
  {
    name: "fullTitle",
    title: "Título",
    show: true,
    sortDirection: "",
    numeric: false,
    badge: "amount",
    tooltip: true,
  },
  {
    name: "edition_year",
    title: "Año",
    show: true,
    sortDirection: "",
    numeric: false,
    style: { maxWidth: "45px", justifyContent: "center" },
  },
  {
    name: "edition_number",
    title: "Edición",
    show: true,
    sortDirection: "",
    numeric: false,
    style: { maxWidth: "75px", justifyContent: "center" },
  },
  {
    name: "acquisitionPrice",
    title: "Precio de adquisición",
    show: true,
    sortDirection: "",
    numeric: false,
    style: { justifyContent: "center" },
  },
  {
    name: "transportPrice",
    title: "Precio de transportación",
    show: false,
    sortDirection: "",
    numeric: false,
  },
  {
    name: "marketing_megas",
    title: "Megas en marketing",
    show: false,
    sortDirection: "",
    numeric: false,
  },
  {
    name: "marketing_price",
    title: "Precio en marketing",
    show: false,
    sortDirection: "",
    numeric: false,
  },
  {
    name: "difficultPrice",
    title: "Precio de dificultad",
    show: false,
    sortDirection: "",
    numeric: false,
  },
  {
    name: "amount",
    title: "Cantidad",
    show: false,
    sortDirection: "",
    numeric: false,
    style: { maxWidth: "45px", justifyContent: "center" },
  },
  {
    name: "literarySubgenre",
    title: "Género literario",
    show: true,
    sortDirection: "",
    numeric: false,
  },
  {
    name: "publishing",
    title: "Editorial",
    show: true,
    sortDirection: "",
    numeric: false,
  },
];

export const setting_metadata = [
  {
    name: "id",
    title: "ID",
    show: false,
    sortDirection: "descending",
    numeric: false,
  },
  {
    name: "label",
    title: "Clave",
    show: true,
    sortDirection: "",
    numeric: false,
  },
  {
    name: "valueTransform",
    title: "Valor",
    show: true,
    sortDirection: "",
    numeric: false,
  },
];
