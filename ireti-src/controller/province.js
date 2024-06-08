import { onError } from "./error";

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
        //worker.postMessage({ action: "readData", args: [sql] });
        dispatch({
          type: String(e.data.action + "_province").toUpperCase(),
          payload: e.data.result[0],
        });
        screenDispatch({ type: "AFTER_SAVE", payload: "Datos agregados" });
        resetForm();
        break;
      case "update":
        //worker.postMessage({ action: "readData", args: [sql] });
        dispatch({
          type: String(e.data.action + "_province").toUpperCase(),
          payload: e.data.result[0],
        });
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
