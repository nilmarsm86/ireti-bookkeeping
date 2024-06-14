import { onError } from "./error";
import { isValid } from "../hook/validator";

//insert and update
export const onSave = (
  worker,
  model,
  setModel,
  existData,
  screenDispatch,
  table,
  data
) => {
  if (isValid(model, setModel, existData)) {
    try {
      if (model.id.value === null) {
        worker.postMessage({
          action: "insert",
          args: [table, data],
        });
      } else {
        worker.postMessage({
          action: "update",
          args: [
            table,
            { ...data, id: model.id.value },
            { id: model.id.value },
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

export const onRowDelete = (screenDispatch, setModel, item) => {
  screenDispatch({ type: "SHOW_MODAL_ALERT" });
  setModel(item);
};
