import { Appbar, Tooltip } from "react-native-paper";
import { DispatchContext } from "../context/app";
import { useContext } from "react";

export default ({ title, icon, onPress }) => {
    const [state, dispatch] = useContext(DispatchContext);

    return (
        <Tooltip title={title}>
            <Appbar.Action icon={icon} onPress={onPress} />
        </Tooltip>
    );
}
