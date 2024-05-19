import { Portal, Button, Text, Dialog } from 'react-native-paper';

export default ({ title, label, visible, onDismiss, buttons }) => (
  <Portal>
    <Dialog visible={visible} onDismiss={onDismiss} style={{ width: '40%', marginLeft: 'auto', marginRight: 'auto' }}>
      {/*<Dialog.Icon icon="alert" />*/}
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium">{label}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        {Object.entries(buttons).map(([key, value]) => (
          <Button
            key={key}
            onPress={value.press}
          >
            {value.label}
          </Button>
        ))}
      </Dialog.Actions>
    </Dialog>
  </Portal >
);