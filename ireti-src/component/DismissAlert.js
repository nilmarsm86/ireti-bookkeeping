import { Portal, Snackbar } from "react-native-paper";

export default ({ label, visible, onClose }) => (
    <Portal>
        <Snackbar
            visible={visible}
            onIconPress={onClose} 
            onDismiss={onClose}
        >
            {label + '!!!'}
        </Snackbar>
    </Portal>
);
