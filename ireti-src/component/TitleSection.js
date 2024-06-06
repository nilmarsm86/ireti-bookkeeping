import { Children } from "react";
import { Text } from "react-native-paper";

const TitleSection = ({ children }) => (
  <Text variant="titleLarge" style={{ marginBottom: 20, marginTop: 20 }}>
    {children}
  </Text>
);

export default TitleSection;
