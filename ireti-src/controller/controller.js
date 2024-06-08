import { onError } from "./error";

//insert and update
export const onSave = (
  isValid,
  attr,
  setError,
  worker,
  existData,
  screenDispatch,
  table,
  data
) => {
  if (isValid(existData, attr, setError)) {
    try {
      if (attr.id.value === null) {
        worker.postMessage({
          action: "insert",
          args: [table, data],
        });
      } else {
        worker.postMessage({
          action: "update",
          args: [table, { ...data, id: attr.id.value }, { id: attr.id.value }],
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
