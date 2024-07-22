import { memo } from "react";
import { HelperText, TextInput } from "react-native-paper";

const PriceInput = memo(
  ({
    label,
    style,
    value,
    onChangeText,
    error,
    reference = null,
    editable = true,
  }) => (
    <>
      <TextInput
        label={label}
        mode="outlined"
        style={style}
        left={<TextInput.Icon icon="currency-usd" />}
        error={Boolean(error)}
        value={value}
        onChangeText={onChangeText}
        ref={reference}
        name={label}
        onBlur={() => {
          let number = Number(value);
          if (isNaN(number)) {
            number = 0;
          }
          onChangeText(number.toFixed(2));
        }}
        editable={editable}
      />
      {Boolean(error) && (
        <HelperText type="error" visible={Boolean(error)} padding="none">
          {error}
        </HelperText>
      )}
    </>
  )
);

export default PriceInput;
