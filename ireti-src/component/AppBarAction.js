import { Appbar, Badge, Tooltip } from "react-native-paper";
import { DispatchContext } from "../context/app";
import { useContext } from "react";

export default ({ title, icon, amount = null, onPress, active }) => {
    //const [state, dispatch, worker] = useContext(DispatchContext);
    title = (amount > 0) ? title + ' ' + amount : title;

    return (
        <>
            <Tooltip title={title}>
                <Appbar.Action icon={icon} onPress={onPress} style={active ? { backgroundColor: '#49454f29' } : {}} />
            </Tooltip>
            {(amount !== null) && <Badge style={{ marginLeft: -20 }}>{amount}</Badge>}
        </>
    );
}
