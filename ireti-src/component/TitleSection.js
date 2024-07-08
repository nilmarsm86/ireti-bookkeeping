import { memo } from "react";
import { Text } from "react-native-paper";

const TitleSection = memo(({ children }) => (
  <Text variant="titleLarge" style={{ marginBottom: 20, marginTop: 20 }}>
    {children}
  </Text>
));

export default TitleSection;
