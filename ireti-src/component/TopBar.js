import { useContext } from "react";
import { Appbar } from "react-native-paper";
import { DispatchContext } from "../context/app";
import AppBarAction from "./AppBarAction";
import { onGoAccounting, onGoBook, onGoSubgenre } from "../controller/topbar";

export default () => {
    const [state, dispatch, worker] = useContext(DispatchContext);

    //usar memo con parametros si no cambian es la misma
    const goSubgenre = () => onGoSubgenre(dispatch);
    const goAccounting = () => onGoAccounting(dispatch);
    const goBook = () => onGoBook(dispatch);

    return (
        <Appbar.Header>
            <Appbar.Content title="Gestor de ventas" />
            <AppBarAction
                title="Cuentas"
                icon="calculator"
                onPress={goAccounting}
                active={state.navigation.screen === 'accounting'}
            />
            <AppBarAction
                title="Libros"
                icon="book"
                onPress={goBook}
                active={state.navigation.screen === 'book'}
            />
            <AppBarAction
                title="Autores"
                icon="account-edit"
                onPress={() => { }}
            />
            <AppBarAction
                title="Géneros literarios"
                icon="format-list-bulleted"
                onPress={goSubgenre}
                active={state.navigation.screen === 'subgenre'}
            />
            <AppBarAction
                title="Localización"
                icon="earth"
                onPress={() => { }}
                active={state.navigation.screen === ''}
            />
            <AppBarAction
                title="Ayuda"
                icon="help"
                onPress={() => { }}
                active={state.navigation.screen === ''}
            />
        </Appbar.Header>
    );
};



