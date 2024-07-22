import { useContext, useState } from "react";
import { Appbar, Divider, Menu } from "react-native-paper";
import { DispatchContext } from "../context/app";
import AppBarAction from "./AppBarAction";
import {
  onGoAccounting,
  onGoBook,
  onGoAuthor,
  onGoSubgenre,
  onGoPublishing,
  onGoCountry,
  onGoSetting,
} from "../controller/topbar";

const TopBar = () => {
  const [state, dispatch] = useContext(DispatchContext);

  //usar memo con parametros si no cambian es la misma
  const goAccounting = () => onGoAccounting(dispatch);
  const goBook = () => onGoBook(dispatch);
  const goAuthor = () => onGoAuthor(dispatch);
  const goSubgenre = () => onGoSubgenre(dispatch);
  const goPublishing = () => onGoPublishing(dispatch);
  const goCountry = () => onGoCountry(dispatch);
  const goSetting = () => onGoSetting(dispatch);

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <>
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
          title="Editoriales"
          icon="office-building"
          onPress={goPublishing}
          active={state.navigation.screen === "publishing"}
          amount={state.publishing.data.length}
        />
        <AppBarAction
          title="Localización"
          icon="earth"
          onPress={goCountry}
          active={state.navigation.screen === "country"}
          amount={state.country.data.length}
        />

        <Appbar.Action
          icon="cog"
          onPress={openMenu}
          style={
            state.navigation.screen === "setting"
              ? { backgroundColor: "#49454f29" }
              : {}
          }
        />
      </Appbar.Header>

      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={{ x: window.innerWidth - 5, y: 65 }}
      >
        <Menu.Item
          onPress={() => {
            goSetting();
            closeMenu();
          }}
          title="Configuración"
        />
        <Divider />
        <Menu.Item onPress={() => {}} title="Ayuda" />
      </Menu>
    </>
  );
};

export default TopBar;
