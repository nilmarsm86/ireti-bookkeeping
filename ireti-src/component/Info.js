import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const Info = ({ label, content }) => (
  <View style={styles.view}>
    <Text variant="titleMedium" style={styles.label}>
      {label}:
    </Text>

    <Text variant="bodyMedium" style={styles.content}>
      {content}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 10,
    columnGap: 15,
    marginTop: 10,
  },
  label: {
    flex: "auto",
    width: "35%",
    gap: 10,
  },
  content: {
    flex: "auto",
    width: "50%",
    gap: 10,
    textAlign: "left",
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});

export default Info;
