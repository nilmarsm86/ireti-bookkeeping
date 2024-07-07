import { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Card, HelperText, Checkbox } from "react-native-paper";

const CheckGroup = ({
  label,
  data,
  disabled = false,
  error = false,
  reference = null,
  style,
  value,
  onChange,
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
    <>
      <Text
        variant="bodySmall"
        style={
          Boolean(error)
            ? { ...styles.label, color: "#b3261e", style }
            : { ...styles.label, style }
        }
      >
        {label}
      </Text>
      <Card
        mode="outlined"
        style={
          Boolean(error)
            ? { borderRadius: 4, borderColor: "#b3261e" }
            : { borderRadius: 4 }
        }
      >
        <Card.Content>
          {data.map((item) => (
            <Checkbox.Item
              label={item.label}
              status={verifyStatus(item, checked) ? "checked" : "unchecked"}
              key={item.value}
              uncheckedColor={Boolean(error) ? "#b3261e" : ""}
              labelStyle={Boolean(error) ? { color: "#b3261e" } : {}}
              style={Boolean(error) ? { color: "#b3261e" } : {}}
              onPress={() => onPress(item, checked)}
              disabled={disabled}
            />
          ))}
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

export default CheckGroup;
