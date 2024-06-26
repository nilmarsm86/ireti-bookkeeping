import { memo } from "react";
import { Portal, Dialog, ActivityIndicator } from "react-native-paper";

const Loader = memo(({ visible }) => (
  <Portal>
    <Dialog
      visible={visible}
      style={{ width: "15%", marginLeft: "auto", marginRight: "auto" }}
    >
      <Dialog.Content>
        <ActivityIndicator animating={true} size="large" />
      </Dialog.Content>
    </Dialog>
  </Portal>
));

export default Loader;
