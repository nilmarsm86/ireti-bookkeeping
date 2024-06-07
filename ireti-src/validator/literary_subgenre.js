//validacion formulario literary subgenre
export function isValid(data, genreAttr, setError) {
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
}
