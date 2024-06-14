//validacion formulario literary subgenre
/*export function isValid(data, genreAttr, setError) {
  let valid = [true];
  let error = { name: false, num: false };

  if (genreAttr.name.value.length === 0) {
    error["name"] = "El género literario debe tener un nombre!";
    valid.push(false);
  }

  if (genreAttr.num.value.length === 0) {
    error["num"] = "El género literario debe tener un número identificador!";
    valid.push(false);
  }

  if (!/^([A-Za-z])*$/.test(genreAttr.name.value)) {
    error["name"] = "El nombre del género literario debe contener solo letras!";
    valid.push(false);
  }

  if (!/^([0-9])*$/.test(genreAttr.num.value)) {
    error["num"] =
      "El número identificador del género literario debe contener solo números!";
    valid.push(false);
  }

  //recorrer cada dato y compararlo con el que se desea insertar/actualizar
  let v = data.every((item) => {
    let validate = true;

    if (Number(item.id) !== Number(genreAttr.id.value)) {
      if (genreAttr.name.value === item.name) {
        error["name"] = "Ya existe un género literario con este nombre!";
        validate = false;
      }

      if (Number(genreAttr.num.value) === Number(item.num)) {
        error["num"] = "Ya existe un género literario con este número!";
        validate = false;
      }
    }

    return validate;
  });
  valid.push(v);

  setError({ ...error });
  return valid.every((item) => item);
}*/
