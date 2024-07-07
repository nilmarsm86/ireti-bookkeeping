import { memo } from "react";
import { Portal, Button, Text, Dialog as Dialo } from "react-native-paper";

const Alert = memo(({ title, label, visible, button }) => (
  <Portal>
    <Dialo
      visible={visible}
      style={{ width: "40%", marginLeft: "auto", marginRight: "auto" }}
    >
      <Dialo.Icon icon="alert" />
      <Dialo.Title style={{ textAlign: "center" }}>{title}</Dialo.Title>
      <Dialo.Content>
        <Text variant="bodyMedium">{label}</Text>
      </Dialo.Content>
      <Dialo.Actions>
        <Button onPress={button.press}>{button.label}</Button>
      </Dialo.Actions>
    </Dialo>
  </Portal>
));
export default Alert;
