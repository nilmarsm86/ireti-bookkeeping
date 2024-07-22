import { memo, useCallback } from "react";
import Dialog from "../import/Dialog";
import DismissAlert from "../import/DismissAlert";
import FabNew from "./FabNew";
import Loader from "../import/Loader";

const RestElements = memo(
  ({
    createNew = null,
    screenState,
    screenDispatch,
    dialogTitle,
    dialogLabel,
    onDissmisDialog,
    dialogButtons,
  }) => {
    const onCloseDissmisAlert = useCallback(
      () => screenDispatch({ type: "HIDE_DISMISS_ALERT" }),
      [screenDispatch]
    );
    return (
      <>
        {createNew !== null && <FabNew onPress={createNew} />}

        <DismissAlert
          label={screenState.dismissMsg}
          onClose={onCloseDissmisAlert}
          visible={screenState.showDismissAlert}
        />

        {dialogTitle && dialogLabel && onDissmisDialog && dialogButtons && (
          <Dialog
            title={dialogTitle}
            label={dialogLabel}
            visible={screenState.showModalAlert}
            onDismiss={onDissmisDialog}
            buttons={dialogButtons}
          />
        )}

        <Loader visible={screenState.showLoader} />
      </>
    );
  }
);

export default RestElements;
