import { useContext } from "react";
import { Appbar, Tooltip } from "react-native-paper";
import { DispatchContext } from "../context/app";
import AppBarAction from "./AppBarAction";

export default () => {
    const [state, dispatch] = useContext(DispatchContext);

    return (
        <Appbar.Header>
            <Appbar.Content title="Gestor de ventas" />

            <AppBarAction title="Cuentas" icon="calculator" onPress={() => { dispatch({ type: 'GO_ACCOUNTING' }); }}/>            
            <AppBarAction title="Libros" icon="book" onPress={() => { dispatch({ type: 'GO_BOOK' }); }}/>

            <Tooltip title="Autores">
                <Appbar.Action icon="account-edit" onPress={() => { }} />
            </Tooltip>

            <Tooltip title="Generos literarios">
                <Appbar.Action icon="list" onPress={() => { }} />
            </Tooltip>

            <Tooltip title="Localización">
                <Appbar.Action icon="map" onPress={() => { }} />
            </Tooltip>

            <Tooltip title="Ayuda">
                <Appbar.Action icon="help" onPress={() => { }} />
            </Tooltip>
        </Appbar.Header>
    );
};



