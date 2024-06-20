import { onError } from "./error";
import * as controller from "./controller";

export const applyManageCountry = (dispatch, screenDispatch, resetForm) => {
  return (e) => {
    if (e.data.action === "error") {
      onError(e);
      return;
    }

    if (controller[e.data.action]) {
      controller[e.data.action](
        e,
        dispatch,
        "country",
        screenDispatch,
        resetForm
      );
    } else if (e.data.action === "delete") {
      controller.remove(e, dispatch, "country", screenDispatch, resetForm);
    }
  };
};
