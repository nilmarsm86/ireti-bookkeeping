import * as controller from "./controller";

export const applyManageSetting = (dispatch, screenDispatch, resetForm) => {
  return (e) => {
    if (e.data.action === "error") {
      controller.onError(e);
      return;
    }

    if (controller[e.data.action]) {
      controller[e.data.action](
        e,
        dispatch,
        "setting",
        screenDispatch,
        resetForm
      );
    }
  };
};
