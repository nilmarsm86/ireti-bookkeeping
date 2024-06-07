import { useState } from "react";
import { Pressable, ScrollView } from "react-native";
import {
  Portal,
  RadioButton,
  TextInput,
  Dialog,
  HelperText,
} from "react-native-paper";

const Select = ({
  label,
  data,
  disabled = false,
  error = false,
  reference = null,
  style,
  value,
  onChangeText,
}) => {
  const [selected, onChangeSelected] = useState(value);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const hideDialog = () => setVisibleDialog(false);
  const showDialog = () => setVisibleDialog(true);

  const onSelected = (newValue) => {
    onChangeText(newValue);
    onChangeSelected(newValue);
    hideDialog();
  };

  const inputValue = (value) => {
    if (data.length === 0 || value.length === 0) {
      return value;
    }
    let item = data.find((item) => item.value === value);

    if (item?.label) {
      return item["label"];
    }

    return "";
  };

  const selectValue = (value, selected) => {
    if (value !== selected) {
      onChangeSelected(value);
    }
    return selected;
  };

  return (
    <>
      <Pressable onPress={showDialog}>
        <TextInput
          value={inputValue(value)}
          mode="outlined"
          placeholder={label}
          label={label}
          readOnly={false}
          editable={false}
          right={
            <TextInput.Icon
              icon="chevron-down"
              disabled={disabled}
              onPress={showDialog}
              color={Boolean(error) ? "#b3261e" : ""}
            />
          }
          disabled={disabled}
          error={Boolean(error)}
          ref={reference}
          style={{ ...style, cursor: "pointer" }}
        />
      </Pressable>

      {Boolean(error) && (
        <HelperText type="error" visible={Boolean(error)} padding="none">
          {error}
        </HelperText>
      )}

      <Portal>
        <Dialog
          visible={visibleDialog}
          onDismiss={hideDialog}
          style={{ width: "40%", marginLeft: "auto", marginRight: "auto" }}
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
                    key={item.value}
                  />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
        </Dialog>
      </Portal>
    </>
  );
};

export default Select;
