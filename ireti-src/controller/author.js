import * as controller from "./controller";

export const applyManageAuthor = (
  dispatch,
  screenDispatch,
  resetForm,
  setProvinces
) => {
  return (e) => {
    if (e.data.action === "error") {
      controller.onError(e);
      return;
    }

    /*switch (e.data.action) {
      case "select":
        dispatch({
          type: String(e.data.action + "_author").toUpperCase(),
          payload: e.data.result,
        });
        break;
      case "insert":
        dispatch({
          type: String(e.data.action + "_author").toUpperCase(),
          payload: e.data.result[0],
        });
        screenDispatch({ type: "AFTER_SAVE", payload: "Datos agregados" });
        resetForm();
        screenDispatch({ type: "HIDE_MODAL_FORM" });
        break;
      case "update":
        dispatch({
          type: String(e.data.action + "_author").toUpperCase(),
          payload: e.data.result[0],
        });
        screenDispatch({ type: "AFTER_SAVE", payload: "Datos modificados" });
        resetForm();
        screenDispatch({ type: "HIDE_MODAL_FORM" });
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
      case "allProvinces":
        dispatch({
          type: String("select_province").toUpperCase(),
          payload: e.data.result,
        });
        break;
      case "findProvincesByCountry":
        if (e.data.result.length > 0) {
          setProvinces(e.data.result);
        } else {
          setProvinces([]);
        }
        break;
      default:
        break;
    }*/

    if (controller[e.data.action]) {
      controller[e.data.action](
        e,
        dispatch,
        "author",
        screenDispatch,
        resetForm
      );

      if (e.data.action === "insert" || e.data.action === "update") {
        screenDispatch({ type: "HIDE_MODAL_FORM" });
      }
    } else if (e.data.action === "delete") {
      controller.remove(e, dispatch, "author", screenDispatch, resetForm);
    } else {
      //
      switch (e.data.action) {
        case "allCountries":
          controller.simpleDispatch(e, dispatch, "select_country");
          break;
        case "allProvinces":
          controller.simpleDispatch(e, dispatch, "select_province");
          break;
        case "findProvincesByCountry":
          if (e.data.result.length > 0) {
            setProvinces(e.data.result);
          } else {
            setProvinces([]);
          }
          break;
        default:
          break;
      }
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
  controller.onModalClose(resetForm, screenDispatch);
};

export const onCeateNew = (resetForm, nameInputRef, screenDispatch) => {
  screenDispatch({ type: "SHOW_MODAL_FORM" });
  resetForm();
  if (nameInputRef.current) {
    nameInputRef.current.focus();
  }
};
