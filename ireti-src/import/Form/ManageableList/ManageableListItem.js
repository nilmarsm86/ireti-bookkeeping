import { Pressable } from "react-native";
import { List } from "react-native-paper";

const ManageableListItem = ({
  label,
  icon = null,
  actionIcon = null,
  value,
  action,
}) => (
  <List.Item
    style={{
      marginLeft: -5,
      marginBottom: -5,
      marginTop: -5,
      paddingBottom: 0,
      paddingTop: 0,
      paddingLeft: 0,
    }}
    description={label}
    left={(props) => icon}
    right={(props) => (
      <Pressable
        onPress={() => {
          action(value);
        }}
      >
        {actionIcon}
      </Pressable>
    )}
  />
);

export default ManageableListItem;
