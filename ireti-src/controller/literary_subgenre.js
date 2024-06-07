import { isValid } from "../validator/literary_subgenre";
import { onError } from "./error";

export const applyManageSubgenre = (dispatch, screenDispatch, resetForm) => {
  return (e) => {
    if (e.data.action === "error") {
      onError(e);
      return;
    }

    switch (e.data.action) {
      case "select":
        dispatch({
          type: String(e.data.action + "_literary_subgenre").toUpperCase(),
          payload: e.data.result,
        });
        break;
      case "insert":
        dispatch({
          type: String(e.data.action + "_literary_subgenre").toUpperCase(),
          payload: e.data.result[0],
        });
        screenDispatch({ type: "AFTER_SAVE", payload: "Datos agregados" });
        resetForm();
        break;
      case "update":
        dispatch({
          type: String(e.data.action + "_literary_subgenre").toUpperCase(),
          payload: e.data.result[0],
        });
        screenDispatch({ type: "AFTER_SAVE", payload: "Datos modificados" });
        resetForm();
        break;
      case "delete":
        dispatch({
          type: String(e.data.action + "_literary_subgenre").toUpperCase(),
          payload: e.data.result[0],
        });
        screenDispatch({ type: "AFTER_SAVE", payload: "Datos eliminados" });
        break;
      case "allSubgenre":
        dispatch({
          type: String("select_literary_subgenre").toUpperCase(),
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
  genreAttr,
  setError,
  worker,
  existData,
  screenDispatch
) => {
  if (isValid(existData, genreAttr, setError)) {
    try {
      if (genreAttr.id.value === null) {
        worker.postMessage({
          action: "insert",
          args: [
            "literary_subgenre",
            { name: genreAttr.name.value, num: Number(genreAttr.num.value) },
          ],
        });
      } else {
        worker.postMessage({
          action: "update",
          args: [
            "literary_subgenre",
            {
              id: genreAttr.id.value,
              name: genreAttr.name.value,
              num: Number(genreAttr.num.value),
            },
            { id: genreAttr.id.value },
          ],
        });
      }
      screenDispatch({ type: "SHOW_LOADER" });
    } catch (e) {
      onError(e);
    }
  }
};

export const onModalClose = (resetForm, screenDispatch) => {
  resetForm();
  screenDispatch({ type: "HIDE_MODAL_ALERT" });
};

export const onModalOk = (worker, newGenreData, resetForm, screenDispatch) => {
  //TODO: buscar si hay libros que dependen de este genero literario en caso de que si mostrar mensaje diciendo esto
  console.warn(
    "buscar si hay libros que dependen de este genero literario en caso de que si mostrar mensaje diciendo esto"
  );
  worker.postMessage({
    action: "delete",
    args: ["literary_subgenre", { id: newGenreData.id }],
  });
  screenDispatch({ type: "SHOW_LOADER" });
  onModalClose(resetForm, screenDispatch);
};

export const onCeateNew = (resetForm, nameInputRef, setError) => {
  resetForm();
  nameInputRef.current.focus();
  setError({ name: false, num: false });
};
