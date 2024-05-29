import { onError } from "./error";

//validacion formulario
function isValid(data, provinceAttr, setError) {
  let valid = [true];
  let error = { name: false, country: false };

  if (provinceAttr.name.value.length === 0) {
    error["name"] = "Este campo no debe estar vacio!";
    valid.push(false);
  }

  if (provinceAttr.country.value.length === 0) {
    error["country"] = "Por favor seleciona un país!";
    valid.push(false);
  }

  let v = data.every((item) => {
    let validate = true;

    if (Number(item.id) !== Number(provinceAttr.id.value)) {
      if (provinceAttr.name.value === item.name) {
        error["name"] = "Esta provincia ya existe!";
        validate = false;
      }
    }

    return validate;
  });
  valid.push(v);

  setError({ ...error });
  return valid.every((item) => item);
}

export const applyManageProvince = (
  worker,
  dispatch,
  screenDispatch,
  resetForm
) => {
  const sql =
    "SELECT province.id AS id, province.name AS name, country.name as country FROM province, country WHERE province.country_id = country.id";
  return (e) => {
    if (e.data.action === "error") {
      onError(e);
      return;
    }

    switch (e.data.action) {
      case "select":
        dispatch({
          type: String(e.data.action + "_province").toUpperCase(),
          payload: e.data.result,
        });
        break;
      case "insert":
        worker.postMessage({ action: "readData", args: [sql] });
        screenDispatch({ type: "AFTER_SAVE", payload: "Datos agregados" });
        resetForm();
        break;
      case "update":
        worker.postMessage({ action: "readData", args: [sql] });
        screenDispatch({ type: "AFTER_SAVE", payload: "Datos modificados" });
        resetForm();
        break;
      case "delete":
        dispatch({
          type: String(e.data.action + "_province").toUpperCase(),
          payload: e.data.result[0],
        });
        screenDispatch({ type: "AFTER_SAVE", payload: "Datos eliminados" });
        break;
      case "readData":
        dispatch({
          type: String("select_province").toUpperCase(),
          payload: e.data.result,
        });
        break;
      default:
        break;
    }
  };
};

//insert and update
export const onSave = (
  provinceAttr,
  setError,
  worker,
  existData,
  screenDispatch
) => {
  if (isValid(existData, provinceAttr, setError)) {
    try {
      if (provinceAttr.id.value === null) {
        worker.postMessage({
          action: "insert",
          args: [
            "province",
            {
              name: provinceAttr.name.value,
              country_id: provinceAttr.country.value,
            },
          ],
        });
      } else {
        worker.postMessage({
          action: "update",
          args: [
            "province",
            {
              id: provinceAttr.id.value,
              name: provinceAttr.name.value,
              country_id: provinceAttr.country.value,
            },
            { id: provinceAttr.id.value },
          ],
        });
      }
      screenDispatch({ type: "SHOW_LOADER" });
    } catch (e) {
      onError(e);
    }
  }
};
