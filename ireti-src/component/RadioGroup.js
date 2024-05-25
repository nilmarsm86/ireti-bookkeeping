import { StyleSheet } from "react-native";
import { Text, RadioButton, Card, HelperText } from "react-native-paper";

const RadioGroup = ({
  label,
  data,
  disabled = false,
  error = false,
  reference = null,
  style,
  value,
  onChangeText,
}) => {
  return (
    <>
      <Text variant="bodySmall" style={{ ...styles.label, style }}>
        {label}
      </Text>
      <Card mode="outlined" style={{ borderRadius: 4 }}>
        <Card.Content>
          <RadioButton.Group onValueChange={onChangeText} value={value}>
            {data.map((item) => (
              <RadioButton.Item
                label={item.label}
                value={item.value}
                key={item.value}
              />
            ))}
          </RadioButton.Group>
        </Card.Content>
      </Card>

      {Boolean(error) && (
        <HelperText type="error" visible={Boolean(error)} padding="none">
          {error}
        </HelperText>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: -19,
    zIndex: 9999,
    backgroundColor: "#fffbfe",
    paddingLeft: 5,
    paddingRight: 5,
    width: 45,
    marginLeft: 10,
  },
});

export default RadioGroup;
