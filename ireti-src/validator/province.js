//validacion formulario
export function isValid(data, provinceAttr, setError) {
  let valid = [true];
  let error = { name: false, country: false };

  if (provinceAttr.name.value.length === 0) {
    error["name"] = "La provincia debe tener un nombre!";
    valid.push(false);
  }

  if (provinceAttr.country.value.length === 0) {
    error["country"] = "Por favor seleciona un país para la provincia!";
    valid.push(false);
  }

  let v = data.every((item) => {
    let validate = true;

    if (Number(item.id) !== Number(provinceAttr.id.value)) {
      if (
        provinceAttr.name.value === item.name &&
        provinceAttr.country.value === item.country
      ) {
        error["name"] =
          "Ya existe una provincia con este nombre en el país seleccinado!";
        validate = false;
      }
    }

    return validate;
  });
  valid.push(v);

  setError({ ...error });
  return valid.every((item) => item);
}
