import { useState } from "react";
import { Pressable } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import DialogRadioGroup from "./DialogRadioGroup";

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
  const [visibleDialog, setVisibleDialog] = useState(false);
  const showDialog = () => setVisibleDialog(true);

  const inputValue = (value) => {
    if (data.length === 0 || value.length === 0) {
      return "";
    }
    let item = data.find((item) => item.value === value);

    if (item?.label) {
      return item["label"];
    }

    return "";
  };

  return (
    <>
      <Pressable onPress={disabled ? () => {} : showDialog}>
        <TextInput
          value={inputValue(value)}
          mode="outlined"
          placeholder={label}
          label={label}
          readOnly={false}
          editable={false}
          right={
            <TextInput.Icon
              icon={visibleDialog ? "chevron-up" : "chevron-down"}
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

      <DialogRadioGroup
        label={label}
        data={data}
        value={value}
        onChange={onChangeText}
        visible={visibleDialog}
        setVisible={setVisibleDialog}
      />
    </>
  );
};

export default Select;
