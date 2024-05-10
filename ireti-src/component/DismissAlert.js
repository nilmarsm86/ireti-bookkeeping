import { Portal, Snackbar } from "react-native-paper";

export default ({ label, visible, onClose }) => (
    <Portal>
        <Snackbar
            visible={visible}
            onIconPress={() => onClose(false)}
        >
            {label + '!!!'}
        </Snackbar>
    </Portal>
);
