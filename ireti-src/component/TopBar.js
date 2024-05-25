import { useContext } from "react";
import { Appbar } from "react-native-paper";
import { DispatchContext } from "../context/app";
import AppBarAction from "./AppBarAction";
import {
  onGoAccounting,
  onGoBook,
  onGoAuthor,
  onGoSubgenre,
  onGoCountry,
} from "../controller/topbar";

const TopBar = () => {
  const [state, dispatch] = useContext(DispatchContext);

  //usar memo con parametros si no cambian es la misma
  const goAccounting = () => onGoAccounting(dispatch);
  const goBook = () => onGoBook(dispatch);
  const goAuthor = () => onGoAuthor(dispatch);
  const goSubgenre = () => onGoSubgenre(dispatch);
  const goCountry = () => onGoCountry(dispatch);

  return (
    <Appbar.Header>
      <Appbar.Content title="Gestor de ventas" />
      <AppBarAction
        title="Cuentas"
        icon="calculator"
        onPress={goAccounting}
        active={state.navigation.screen === "accounting"}
      />
      <AppBarAction
        title="Libros"
        icon="book"
        onPress={goBook}
        active={state.navigation.screen === "book"}
        amount={state.book.data.length}
      />
      <AppBarAction
        title="Autores"
        icon="account-edit"
        onPress={goAuthor}
        active={state.navigation.screen === "author"}
        amount={state.author.data.length}
      />
      <AppBarAction
        title="Géneros literarios"
        icon="format-list-bulleted"
        onPress={goSubgenre}
        active={state.navigation.screen === "subgenre"}
        amount={state.literary_subgenre.data.length}
      />
      <AppBarAction
        title="Localización"
        icon="earth"
        onPress={goCountry}
        active={state.navigation.screen === "country"}
        amount={state.country.data.length}
      />
      <AppBarAction
        title="Ayuda"
        icon="help"
        onPress={() => {}}
        active={state.navigation.screen === ""}
      />
    </Appbar.Header>
  );
};

export default TopBar;
