import "@expo/metro-runtime";
import { StyleSheet, Text, View, Linking, Platform, Pressable } from 'react-native';
import { init, events, os, app, window as neutrawindow } from "@neutralinojs/lib";
import { useReducer, useState } from "react";

import {
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  //...DarkTheme,
};

import { DispatchContext } from "./context/app";
import { navigationReducer } from "./reducer/navigation";
import { useCombinedReducers } from "./services/hook";
import Accounting from "./screen/Accounting";
import Book from "./screen/Book";
import LiterarySubgenre from "./screen/LiterarySubgenre";
import TopBar from "./component/TopBar";

init();

//deberia ir en un controlador
async function onOpenLink(url) {
  (Platform.OS === 'web') ? os.open(url) : await Linking.openURL(url);
}

function setTray() {
  if (NL_MODE != "window") {
    console.log("INFO: Tray menu is only available in the window mode.");
    return;
  }

  let tray = {
    icon: "/ireti-src/public/icons/trayIcon.png",
    menuItems: [
      { id: "VERSION", text: "Get version" },
      { id: "SEP", text: "-" },
      { id: "QUIT", text: "Quit" }
    ]
  };
  os.setTray(tray);
}

function exit(event) {
  events.off("trayMenuItemClicked", onTrayMenuItemClicked);
  app.exit();
}

//deberia ir en un controller
function onTrayMenuItemClicked(event) {
  switch (event.detail.id) {
    case "VERSION":
      os.showMessageBox("Version information", `Neutralinojs server: v${NL_VERSION} | Neutralinojs client: v${NL_CVERSION}`);
      break;
    case "QUIT":
      exit();
      break;
  }
}

events.on("ready", async () => {
  events.on("trayMenuItemClicked", onTrayMenuItemClicked);
  events.on("windowClose", exit);
  if (NL_OS != "Darwin") { // TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
    setTray();
  }

  await neutrawindow.show();


});

export default function App() {
  const store = {
    navigation: useReducer(navigationReducer, {
      showHelp: false,
      screen: 'accounting',
    })
  };

  const [state, dispatch] = useCombinedReducers(store);

  return (
    <DispatchContext.Provider value={[state, dispatch]}>
      <PaperProvider theme={theme}>
        <View>
          <TopBar />
          <View style={{flex:1, padding:10}}>
            {state.navigation.screen === 'accounting' && <Accounting />}
            {state.navigation.screen === 'book' && <Book />}
            {state.navigation.screen === 'subgenre' && <LiterarySubgenre />}
          </View>
        </View>
      </PaperProvider>
    </DispatchContext.Provider>
  );
}