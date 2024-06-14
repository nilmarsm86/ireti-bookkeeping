import { onModalClose } from "./controller";

export const onModalOk = (worker, table, id, resetForm, screenDispatch) => {
  //TODO: buscar si hay autores que dependen de esta localizacion en caso de que si mostrar mensaje diciendo esto
  console.warn(
    "buscar si hay autores que dependen de esta country/province en caso de que si mostrar mensaje diciendo esto"
  );
  worker.postMessage({ action: "delete", args: [table, { id: id }] });
  screenDispatch({ type: "SHOW_LOADER" });
  onModalClose(resetForm, screenDispatch);
};

export const onCeateNew = (resetForm, nameInputRef) => {
  resetForm();
  nameInputRef.current.focus();
};
