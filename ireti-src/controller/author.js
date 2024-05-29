function onError(e) {
  alert("A ocurrido un error al salvar la informacion");
  console.log(e);
}

export const applyManageAuthor = (
  worker,
  dispatch,
  screenDispatch,
  resetForm,
  setCountries,
  setProvinces,
  setDisabledProvinces
) => {
  return (e) => {
    if (e.data.action === "error") {
      onError(e);
      return;
    }

    switch (e.data.action) {
      case "select":
        dispatch({
          type: String(e.data.action + "_author").toUpperCase(),
          payload: e.data.result,
        });
        break;
      case "insert":
        /*dispatch({
          type: String(e.data.action + "_author").toUpperCase(),
          payload: e.data.result[0],
        });*/
        const sql =
          "SELECT author.id AS id, author.name AS name, author.gender as gender, country.name as country, province.name as province FROM author, province, country WHERE author.country_id = country.id AND author.province_id = province.id";
        worker.postMessage({ action: "readData", args: [sql] });
        screenDispatch({ type: "AFTER_SAVE", payload: "Datos agregados" });
        resetForm();
        break;
      case "update":
        dispatch({
          type: String(e.data.action + "_author").toUpperCase(),
          payload: e.data.result[0],
        });
        screenDispatch({ type: "AFTER_SAVE", payload: "Datos modificados" });
        resetForm();
        break;
      case "delete":
        dispatch({
          type: String(e.data.action + "_author").toUpperCase(),
          payload: e.data.result[0],
        });
        screenDispatch({ type: "AFTER_SAVE", payload: "Datos eliminados" });
        break;
      case "allCountries":
        setCountries(e.data.result);
        break;
      case "findProvincesByCountry":
        if (e.data.result.length > 0) {
          setDisabledProvinces(false);
          setProvinces(e.data.result);
        } else {
          setDisabledProvinces(true);
          setProvinces([]);
        }
        break;
      case "readData":
        dispatch({
          type: String("select_author").toUpperCase(),
          payload: e.data.result,
        });
        break;
      default:
        break;
    }
  };
};

//validacion formulario
function isValid(data, authorAttr, setError) {
  let valid = [true];
  let error = { name: false, gender: false, country: false, province: false };

  if (authorAttr.name.value.length === 0) {
    error["name"] = "Este campo no debe estar vacio!";
    valid.push(false);
  }

  if (authorAttr.gender.value.length === 0) {
    error["gender"] = "Debe seleccionar el sexo del autor!";
    valid.push(false);
  }

  if (authorAttr.country.value.length === 0) {
    error["country"] = "Por favor selecciona un país!";
    valid.push(false);
  }

  if (authorAttr.province.value.length === 0) {
    error["province"] = "Por favor selecciona una provincia!";
    valid.push(false);
  }

  let v = data.every((item) => {
    let validate = true;

    if (Number(item.id) !== Number(authorAttr.id.value)) {
      if (authorAttr.name.value === item.name) {
        error["name"] = "Este autor ya existe!";
        validate = false;
      }
    }

    return validate;
  });
  valid.push(v);

  setError({ ...error });
  return valid.every((item) => item);
}

//insert and update
export const onSave = (
  authorAttr,
  setError,
  worker,
  existData,
  screenDispatch
) => {
  if (isValid(existData, authorAttr, setError)) {
    try {
      let data = {
        name: authorAttr.name.value,
        gender: authorAttr.gender.value,
        country_id: authorAttr.country.value,
        province_id: authorAttr.province.value,
      };
      if (authorAttr.id.value === null) {
        worker.postMessage({ action: "insert", args: ["author", data] });
      } else {
        worker.postMessage({
          action: "update",
          args: [
            "author",
            { id: authorAttr.id.value, ...data },
            { id: authorAttr.id.value },
          ],
        });
      }
      screenDispatch({ type: "SHOW_LOADER" });
    } catch (e) {
      onError(e);
    }
  }
};

export const onRowDelete = (screenDispatch, setNewAuthorData, item) => {
  screenDispatch({ type: "SHOW_MODAL_ALERT" });
  setNewAuthorData(item);
};

export const onModalClose = (resetForm, screenDispatch) => {
  resetForm();
  screenDispatch({ type: "HIDE_MODAL_ALERT" });
};

export const onModalOk = (worker, newAuthorData, resetForm, screenDispatch) => {
  //TODO: buscar si hay libros que dependen de este genero literario en caso de que si mostrar mensaje diciendo esto
  console.warn(
    "buscar si hay libros que dependen de este author en caso de que si mostrar mensaje diciendo esto"
  );
  worker.postMessage({
    action: "delete",
    args: ["author", { id: newAuthorData.id }],
  });
  screenDispatch({ type: "SHOW_LOADER" });
  onModalClose(resetForm, screenDispatch);
};

export const onCeateNew = (resetForm, nameInputRef) => {
  resetForm();
  nameInputRef.current.focus();
};