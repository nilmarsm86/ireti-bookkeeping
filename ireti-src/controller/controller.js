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

export const select = (e, dispatch, table, screenDispatch, resetForm) => {
  dispatch({
    type: String(e.data.action + "_" + table).toUpperCase(),
    payload: e.data.result,
  });
};

function persist(e, dispatch, table, screenDispatch, resetForm, msg) {
  //worker.postMessage({ action: "readData", args: [sql] });
  dispatch({
    type: String(e.data.action + "_" + table).toUpperCase(),
    payload: e.data.result[0],
  });
  screenDispatch({ type: "AFTER_SAVE", payload: msg });
  resetForm();
}

export const insert = (e, dispatch, table, screenDispatch, resetForm) => {
  persist(e, dispatch, table, screenDispatch, resetForm, "Datos agregados");
};

export const update = (e, dispatch, table, screenDispatch, resetForm) => {
  persist(e, dispatch, table, screenDispatch, resetForm, "Datos modificados");
};

export const remove = (e, dispatch, table, screenDispatch, resetForm) => {
  dispatch({
    type: String(e.data.action + "_" + table).toUpperCase(),
    payload: e.data.result[0],
  });
  screenDispatch({ type: "AFTER_SAVE", payload: "Datos eliminados" });
};

export const simpleDispatch = (e, dispatch, type) => {
  dispatch({
    type: String(type).toUpperCase(),
    payload: e.data.result,
  });
};
