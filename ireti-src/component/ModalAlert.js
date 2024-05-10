import { Portal, Button, Modal, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export default ({ title, visible, onDismiss, buttons, children }) => (
  <Portal>
    <Modal
      visible={visible}
      contentContainerStyle={styles.modalContent}
      style={styles.modal}
      onDismiss={onDismiss}
    >
      <Text variant='bodyLarge'>{title}</Text>
      {children}
      <View style={styles.buttonsContainer}>
        {Object.entries(buttons).map(([key, value]) => (
          <Button
            key={key}
            icon={value.icon ? value.icon : null}
            onPress={value.press}
          >
            {value.label}
          </Button>
        ))}
      </View>
    </Modal>
  </Portal>
);


const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
  },
  modal: {
    width: '40%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
    flex: 'auto',
    alignItems: 'stretch',
    flexWrap: 'wrap',
    marginTop: 10
  }
});
