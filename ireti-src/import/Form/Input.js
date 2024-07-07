import { memo } from "react";
import { HelperText, TextInput } from "react-native-paper";

const Input = memo(
  ({
    label,
    style,
    icon,
    value,
    onChangeText,
    error,
    right = null,
    reference = null,
  }) => (
    <>
      <TextInput
        label={label}
        mode="outlined"
        style={style}
        left={<TextInput.Icon icon={icon} />}
        error={Boolean(error)}
        value={value}
        onChangeText={onChangeText}
        ref={reference}
        name={label}
        right={right}
      />
      {Boolean(error) && (
        <HelperText type="error" visible={Boolean(error)} padding="none">
          {error}
        </HelperText>
      )}
    </>
  )
);

export default Input;
