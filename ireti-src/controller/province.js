import * as controller from "./controller";

export const applyManageProvince = (dispatch, screenDispatch, resetForm) => {
  return (e) => {
    if (e.data.action === "error") {
      controller.onError(e);
      return;
    }

    if (controller[e.data.action]) {
      controller[e.data.action](
        e,
        dispatch,
        "province",
        screenDispatch,
        resetForm
      );
    } else if (e.data.action === "delete") {
      controller.remove(e, dispatch, "province", screenDispatch, resetForm);
    } else {
      controller.simpleDispatch(e, dispatch, "select_country");
    }
  };
};
