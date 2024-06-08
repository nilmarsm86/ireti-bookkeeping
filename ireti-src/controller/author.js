import { onModalClose } from "./controller";
import { onError } from "./error";

export const applyManageAuthor = (
  worker,
  dispatch,
  screenDispatch,
  resetForm,
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
        dispatch({
          type: String("select_country").toUpperCase(),
          payload: e.data.result,
        });
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

export const onCeateNew = (resetForm, nameInputRef, setError) => {
  resetForm();
  nameInputRef.current.focus();
  setError({ name: false, gender: false, country: false, province: false });
};
