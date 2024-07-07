import { useState } from "react";
import { ScrollView } from "react-native";
import { Portal, Dialog, Checkbox, Button } from "react-native-paper";

const DialogCheckGroup = ({
  label,
  data,
  value,
  onChange,
  visible,
  setVisible,
  buttons = {},
}) => {
  const [checked, setChecked] = useState(value);

  const onPress = (item, checked) => {
    let markeds = [];
    if (verifyStatus(item, checked)) {
      markeds = checked.filter((check) => check !== item.value);
    } else {
      markeds = [...checked, item.value];
    }
    setChecked(markeds);
    onChange(markeds);
  };

  const verifyStatus = (item, checked) =>
    checked.find((check) => check === item.value);

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
            {data.map((item) => (
              <Checkbox.Item
                label={item.label}
                status={verifyStatus(item, checked) ? "checked" : "unchecked"}
                key={item.value + item.label}
                onPress={() => onPress(item, checked)}
              />
            ))}
          </ScrollView>
        </Dialog.ScrollArea>
        {Object.entries(buttons).length > 0 && (
          <Dialog.Actions>
            {Object.entries(buttons).map(([key, value]) => (
              <Button
                key={key}
                icon={value.icon}
                onPress={() => {
                  value.press();
                  setChecked([]);
                }}
              >
                {value.label}
              </Button>
            ))}
          </Dialog.Actions>
        )}
      </Dialog>
    </Portal>
  );
};

export default DialogCheckGroup;
