import { onError } from "./error";
import { isValid } from "../validator/country";

export const applyManageCountry = (dispatch, screenDispatch, resetForm) => {
  return (e) => {
    if (e.data.action === "error") {
      onError(e);
      return;
    }

    switch (e.data.action) {
      case "select":
        dispatch({
          type: String(e.data.action + "_country").toUpperCase(),
          payload: e.data.result,
        });
        break;
      case "insert":
        dispatch({
          type: String(e.data.action + "_country").toUpperCase(),
          payload: e.data.result[0],
        });
        screenDispatch({ type: "AFTER_SAVE", payload: "Datos agregados" });
        resetForm();
        break;
      case "update":
        dispatch({
          type: String(e.data.action + "_country").toUpperCase(),
          payload: e.data.result[0],
        });
        screenDispatch({ type: "AFTER_SAVE", payload: "Datos modificados" });
        resetForm();
        break;
      case "delete":
        dispatch({
          type: String(e.data.action + "_country").toUpperCase(),
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
      default:
        break;
    }
  };
};

//insert and update
export const onSave = (
  countryAttr,
  setError,
  worker,
  existData,
  screenDispatch
) => {
  if (isValid(existData, countryAttr, setError)) {
    try {
      if (countryAttr.id.value === null) {
        worker.postMessage({
          action: "insert",
          args: ["country", { name: countryAttr.name.value }],
        });
      } else {
        worker.postMessage({
          action: "update",
          args: [
            "country",
            { id: countryAttr.id.value, name: countryAttr.name.value },
            { id: countryAttr.id.value },
          ],
        });
      }
      screenDispatch({ type: "SHOW_LOADER" });
    } catch (e) {
      onError(e);
    }
  }
};
