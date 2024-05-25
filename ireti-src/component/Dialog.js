import { Portal, Button, Text, Dialog as Dialo } from "react-native-paper";

const Dialog = ({ title, label, visible, onDismiss, buttons }) => (
  <Portal>
    <Dialo
      visible={visible}
      onDismiss={onDismiss}
      style={{ width: "40%", marginLeft: "auto", marginRight: "auto" }}
    >
      {/*<Dialog.Icon icon="alert" />*/}
      <Dialo.Title>{title}</Dialo.Title>
      <Dialo.Content>
        <Text variant="bodyMedium">{label}</Text>
      </Dialo.Content>
      <Dialo.Actions>
        {Object.entries(buttons).map(([key, value]) => (
          <Button key={key} onPress={value.press}>
            {value.label}
          </Button>
        ))}
      </Dialo.Actions>
    </Dialo>
  </Portal>
);

export default Dialog;
