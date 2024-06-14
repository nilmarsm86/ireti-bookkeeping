import { memo } from "react";
import { FAB } from "react-native-paper";

const FabNew = memo(({ onPress }) => (
  <FAB
    icon="plus"
    style={{
      position: "absolute",
      bottom: 10,
      right: 10,
    }}
    onPress={onPress}
  />
));

export default FabNew;
