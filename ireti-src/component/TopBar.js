import { useContext } from "react";
import { Appbar } from "react-native-paper";
import { DispatchContext } from "../context/app";
import AppBarAction from "./AppBarAction";

export default () => {
    const [state, dispatch] = useContext(DispatchContext);

    return (
        <Appbar.Header>
            <Appbar.Content title="Gestor de ventas" />
            <AppBarAction title="Cuentas" icon="calculator" onPress={() => { dispatch({ type: 'GO_ACCOUNTING' }); }} />
            <AppBarAction title="Libros" icon="book" onPress={() => { dispatch({ type: 'GO_BOOK' }); }} />
            <AppBarAction title="Autores" icon="account-edit" onPress={() => { }} />
            <AppBarAction title="Géneros literarios" icon="format-list-bulleted" onPress={() => { }} />
            <AppBarAction title="Localización" icon="earth" onPress={() => { }} />
            <AppBarAction title="Ayuda" icon="help" onPress={() => { }} />
        </Appbar.Header>
    );
};



