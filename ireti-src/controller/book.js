import * as controller from "./controller";

export const applyManageBook = (dispatch, screenDispatch, resetForm) => {
  return (e) => {
    if (e.data.action === "error") {
      controller.onError(e);
      return;
    }

    if (controller[e.data.action]) {
      controller[e.data.action](e, dispatch, "book", screenDispatch, resetForm);

      if (e.data.action === "insert" || e.data.action === "update") {
        //screenDispatch({ type: "HIDE_MODAL_FORM" });
      }
    } else if (e.data.action === "delete") {
      controller.remove(e, dispatch, "book", screenDispatch, resetForm);
    } else {
      switch (e.data.action) {
        /*case "allCountries":
          controller.simpleDispatch(e, dispatch, "select_country");
          break;*/
        /*case "allProvinces":
          controller.simpleDispatch(e, dispatch, "select_province");
          break;*/
        /*case "findProvincesByCountry":
          let data = e.data.result.length > 0 ? e.data.result : [];
          setProvinces(data);
          break;*/
        default:
          break;
      }
    }
  };
};

export const onModalOk = (worker, id, resetForm, screenDispatch) => {
  //TODO: buscar si hay libros que dependen de este genero literario en caso de que si mostrar mensaje diciendo esto
  console.warn("porque es que no se debe borrar un libros del sistema");
  worker.postMessage({
    action: "delete",
    args: ["book", { id: id }],
  });
  screenDispatch({ type: "SHOW_LOADER" });
  controller.onModalClose(resetForm, screenDispatch);
};

export const onCeateNew = (resetForm, titleInputRef, screenDispatch) => {
  screenDispatch({ type: "SHOW_MODAL_FORM" });
  resetForm();
  if (titleInputRef.current) {
    titleInputRef.current.focus();
  }
};
