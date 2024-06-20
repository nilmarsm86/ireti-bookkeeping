import * as controller from "./controller";

export const applyManageSubgenre = (dispatch, screenDispatch, resetForm) => {
  return (e) => {
    if (e.data.action === "error") {
      controller.onError(e);
      return;
    }

    if (controller[e.data.action]) {
      controller[e.data.action](
        e,
        dispatch,
        "literary_subgenre",
        screenDispatch,
        resetForm
      );
    } else if (e.data.action === "delete") {
      controller.remove(
        e,
        dispatch,
        "literary_subgenre",
        screenDispatch,
        resetForm
      );
    }
  };
};

export const onModalOk = (worker, id, resetForm, screenDispatch) => {
  //TODO: buscar si hay libros que dependen de este genero literario en caso de que si mostrar mensaje diciendo esto
  console.warn(
    "buscar si hay libros que dependen de este genero literario en caso de que si mostrar mensaje diciendo esto"
  );
  worker.postMessage({
    action: "delete",
    args: ["literary_subgenre", { id: id }],
  });
  screenDispatch({ type: "SHOW_LOADER" });
  controller.onModalClose(resetForm, screenDispatch);
};

export const onCeateNew = (resetForm, nameInputRef) => {
  resetForm();
  nameInputRef.current.focus();
};
