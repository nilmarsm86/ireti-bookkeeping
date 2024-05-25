import { Portal, Snackbar } from "react-native-paper";

const DismissAlert = ({ label, visible, onClose }) => (
  <Portal>
    <Snackbar visible={visible} onIconPress={onClose} onDismiss={onClose}>
      {label + "!!!"}
    </Snackbar>
  </Portal>
);

export default DismissAlert;
