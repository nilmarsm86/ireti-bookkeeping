import { isValid } from "../hook/validator";
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
        screenDispatch({ type: "HIDE_MODAL_FORM" });
      }
    } else if (e.data.action === "delete") {
      controller.remove(e, dispatch, "book", screenDispatch, resetForm);
    } else {
      switch (e.data.action) {
        case "allLiterarySubgenre":
          controller.simpleDispatch(e, dispatch, "select_literary_subgenre");
          break;
        case "allPublishings":
          controller.simpleDispatch(e, dispatch, "select_publishing");
          break;
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

export const formatPriceFromCents = (price) => {
  return "$ " + Number(price / 100).toFixed(2);
};

export const formatPriceToCents = (price) => {
  return Number(price) * 100;
};

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
      let hasId = model.id.value;

      if (model.id.value === null) {
        const existence = existData.find((item) => {
          return (
            data.tag === item.tag &&
            data.edition_year === item.edition_year &&
            data.edition_number === item.edition_number &&
            data.literary_subgenre_id === item.literary_subgenre_id &&
            data.publishing_id === item.publishing_id
          );
        });

        if (existence) {
          data.amount = Number(data.amount) + Number(existence.amount);
          data.acquisition_price =
            Number(data.acquisition_price) +
            Number(existence.acquisition_price);
          data.difficult_price =
            Number(data.difficult_price) + Number(existence.difficult_price);
          data.transport_price =
            Number(data.transport_price) + Number(existence.transport_price);
          data.marketing_megas =
            Number(data.marketing_megas) + Number(existence.marketing_megas);
          hasId = existence.id;

          alert(
            "Ya existe en el sistema un libro con estas catacterísticas, se incrementará su cantidad."
          );
        }
      }

      if (hasId === null) {
        worker.postMessage({
          action: "insert",
          args: [table, data],
        });
      } else {
        worker.postMessage({
          action: "update",
          args: [table, { ...data, id: hasId }, { id: hasId }],
        });
      }
      screenDispatch({ type: "SHOW_LOADER" });
    } catch (e) {
      controller.onError(e);
    }
  }
};
