import { useState } from "react";
import { ScrollView } from "react-native";
import { Portal, RadioButton, Dialog, Button } from "react-native-paper";

const DialogRadioGroup = ({
  label,
  data,
  value,
  onChange,
  visible,
  setVisible,
  buttons = {},
}) => {
  const [selected, onChangeSelected] = useState(value);

  const onSelected = (newValue) => {
    onChange(newValue);
    onChangeSelected(newValue);
    if (Object.entries(buttons).length === 0) {
      setVisible(false);
    }
  };

  const selectValue = (value, selected) => {
    if (value !== selected) {
      onChangeSelected(value);
    }
    return selected;
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={setVisible}
        style={{
          width: "auto",
          marginLeft: "auto",
          marginRight: "auto",
          minWidth: "40%",
          maxWidth: "90%",
        }}
      >
        <Dialog.Title>{label}</Dialog.Title>
        <Dialog.ScrollArea style={data.length > 0 ? { height: 200 } : {}}>
          <ScrollView>
            <RadioButton.Group
              onValueChange={onSelected}
              value={selectValue(value, selected)}
            >
              {data.map((item) => (
                <RadioButton.Item
                  label={item.label}
                  value={item.value}
                  key={item.label + item.value}
                />
              ))}
            </RadioButton.Group>
          </ScrollView>
        </Dialog.ScrollArea>
        {Object.entries(buttons).length > 0 && (
          <Dialog.Actions>
            {Object.entries(buttons).map(([key, value]) => (
              <Button key={key} icon={value.icon} onPress={value.press}>
                {value.label}
              </Button>
            ))}
          </Dialog.Actions>
        )}
      </Dialog>
    </Portal>
  );
};

export default DialogRadioGroup;
