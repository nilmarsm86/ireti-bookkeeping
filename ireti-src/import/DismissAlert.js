import { memo } from "react";
import { Portal, Snackbar } from "react-native-paper";

const DismissAlert = memo(({ label, visible, onClose }) => (
  <Portal>
    <Snackbar
      visible={visible}
      onIconPress={onClose}
      onDismiss={onClose}
      duration={1500}
    >
      {label + "!!!"}
    </Snackbar>
  </Portal>
));
export default DismissAlert;
