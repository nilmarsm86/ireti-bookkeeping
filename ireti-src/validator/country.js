//validacion formulario
export function isValid(data, countryAttr, setError) {
  let valid = [true];
  let error = { name: false };

  if (countryAttr.name.value.length === 0) {
    error["name"] = "El país debe tener un nombre!";
    valid.push(false);
  }

  if (!/^([A-Za-z])*$/.test(countryAttr.name.value)) {
    error["name"] = "El nombre del país debe contener solo letras!";
    valid.push(false);
  }

  let v = data.every((item) => {
    let validate = true;

    if (Number(item.id) !== Number(countryAttr.id.value)) {
      if (countryAttr.name.value === item.name) {
        error["name"] = "Ya existe un país con este nombre!";
        validate = false;
      }
    }

    return validate;
  });
  valid.push(v);

  setError({ ...error });
  return valid.every((item) => item);
}
