import { Appbar, Badge, Tooltip } from "react-native-paper";

const AppBarAction = ({ title, icon, amount = null, onPress, active }) => {
  //title = amount > 0 ? title + " " + amount : title;

  return (
    <>
      <Tooltip title={title}>
        <Appbar.Action
          icon={icon}
          onPress={onPress}
          style={active ? { backgroundColor: "#49454f29" } : {}}
        />
      </Tooltip>
      {amount !== null && <Badge style={{ marginLeft: -20 }}>{amount}</Badge>}
    </>
  );
};

export default AppBarAction;
