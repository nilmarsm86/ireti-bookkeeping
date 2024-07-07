import { Button, Card, HelperText, Text } from "react-native-paper";
import ManageableListItem from "./ManageableListItem";
import { StyleSheet } from "react-native";

const ManageableList = ({
  label,
  style,
  values,
  error,
  buttons,
  action,
  icon,
  actionIcon,
}) => {
  return (
    <>
      <Text
        variant="bodySmall"
        style={
          Boolean(error) ? { ...styles.label, color: "#b3261e" } : styles.label
        }
      >
        {label}
      </Text>
      <Card
        mode="outlined"
        style={
          Boolean(error)
            ? { ...style, borderColor: "#b3261e", borderWidth: 1 }
            : { ...style, borderRadius: 4 }
        }
      >
        <Card.Content>
          {values.map((item) => {
            return (
              <ManageableListItem
                label={item.label}
                value={item.value}
                icon={icon}
                actionIcon={actionIcon}
                key={item.label + item.value}
                action={action}
              />
            );
          })}
        </Card.Content>

        <Card.Actions>
          {Object.entries(buttons).map(([key, value]) => (
            <Button
              key={key}
              mode="text"
              icon={value.icon}
              onPress={() => value.press()}
            >
              {value.label}
            </Button>
          ))}
        </Card.Actions>
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
    marginBottom: -8,
    marginLeft: 10,
    backgroundColor: "#f7f3f9",
    width: 70,
    zIndex: 99999,
    paddingLeft: 5,
  },
});

export default ManageableList;
