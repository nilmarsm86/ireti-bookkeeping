import { Appbar, Tooltip } from "react-native-paper";
import { DispatchContext } from "../context/app";
import { useContext } from "react";

export default ({ title, icon, onPress, active }) => {
    const [state, dispatch] = useContext(DispatchContext);

    return (
        <Tooltip title={title}>
            <Appbar.Action icon={icon} onPress={onPress} style={active ? {backgroundColor:'#49454f29'} : {}}/>
        </Tooltip>
    );
}
