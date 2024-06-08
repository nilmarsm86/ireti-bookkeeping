export function isValid(data, authorAttr, setError) {
  let valid = [true];
  let error = { name: false, gender: false, country: false, province: false };

  if (authorAttr.name.value.length === 0) {
    error["name"] = "El autor debe tener un nombre!";
    valid.push(false);
  }

  if (!/^([A-Za-z])*$/.test(authorAttr.name.value)) {
    error["name"] = "El nombre del autor debe contener solo letras!";
    valid.push(false);
  }

  if (authorAttr.gender.value.length === 0) {
    error["gender"] = "Debe seleccionar el sexo del autor!";
    valid.push(false);
  }

  if (authorAttr.country.value.length === 0) {
    error["country"] = "Por favor selecciona el país del autor!";
    valid.push(false);
  }

  /*if (authorAttr.province.value.length === 0) {
    error["province"] = "Por favor selecciona la provincia del autor!";
    valid.push(false);
  }*/

  let v = data.every((item) => {
    let validate = true;

    if (Number(item.id) !== Number(authorAttr.id.value)) {
      if (authorAttr.name.value === item.name) {
        error["name"] = "Ya existe un autor con este nombre!";
        validate = false;
      }
    }

    return validate;
  });
  valid.push(v);

  setError({ ...error });
  return valid.every((item) => item);
}
