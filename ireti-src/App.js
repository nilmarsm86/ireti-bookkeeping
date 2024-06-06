import "@expo/metro-runtime";
import { View, Linking, Platform } from "react-native";
import {
  init,
  events,
  os,
  app,
  window as neutrawindow,
} from "@neutralinojs/lib";
import { useCallback, useReducer } from "react";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import { DispatchContext } from "./context/app";
import { navigationReducer } from "./reducer/navigation";

//hooks
import { useCombinedReducers } from "./hook/reducer";
import { useConnectDb } from "./hook/sqlite";

//reducers
import { sqlReducer } from "./reducer/sqlite";

//components
import TopBar from "./component/TopBar";

//screens
import Accounting from "./screen/Accounting";
import Book from "./screen/Book";
import LiterarySubgenre from "./screen/LiterarySubgenre";
import Author from "./screen/Author";
import { sqlReducerLiterarySubgenre } from "./reducer/literary_subgenre";
import { sqlReducerCountry } from "./reducer/country";
import Localization from "./screen/Localization";
import { sqlReducerProvince } from "./reducer/province";
import { sqlReducerAuthor } from "./reducer/author";

const theme = {
  ...DefaultTheme,
  //...DarkTheme,
};

const SCHEMA = `
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Tabla: author
DROP TABLE IF EXISTS author;

CREATE TABLE IF NOT EXISTS author (
id          INTEGER PRIMARY KEY AUTOINCREMENT
                UNIQUE
                NOT NULL,
name        TEXT    NOT NULL,
gender      TEXT    NOT NULL,
country_id  INTEGER REFERENCES country (id) 
                NOT NULL,
province_id INTEGER REFERENCES province (id) 
                DEFAULT NULL
);

-- Tabla: book
DROP TABLE IF EXISTS book;

CREATE TABLE IF NOT EXISTS book (
id                   INTEGER PRIMARY KEY AUTOINCREMENT
                         UNIQUE
                         NOT NULL,
title                TEXT    NOT NULL,
edition_year         INTEGER,
edition_number       INTEGER,
acquisition_price    INTEGER NOT NULL,
transport_price      INTEGER NOT NULL,
marketing_megas      REAL    NOT NULL,
difficult_price      INTEGER NOT NULL,
literary_subgenre_id INTEGER REFERENCES literary_subgenre (id) 
                         NOT NULL
);

-- Tabla: book_author
DROP TABLE IF EXISTS book_author;

CREATE TABLE IF NOT EXISTS book_author (
book_id   INTEGER REFERENCES book (id) 
              NOT NULL,
author_id INTEGER REFERENCES author (id) 
              NOT NULL
);

-- Tabla: country
DROP TABLE IF EXISTS country;

CREATE TABLE IF NOT EXISTS country (
id   INTEGER PRIMARY KEY AUTOINCREMENT
         UNIQUE
         NOT NULL,
name TEXT    NOT NULL
         UNIQUE
);

-- Tabla: literary_subgenre
DROP TABLE IF EXISTS literary_subgenre;

CREATE TABLE IF NOT EXISTS literary_subgenre (
id   INTEGER PRIMARY KEY AUTOINCREMENT
         UNIQUE
         NOT NULL,
name TEXT    UNIQUE
         NOT NULL,
num  INTEGER UNIQUE
         NOT NULL
);

-- Tabla: province
DROP TABLE IF EXISTS province;

CREATE TABLE IF NOT EXISTS province (
id         INTEGER PRIMARY KEY AUTOINCREMENT
               UNIQUE
               NOT NULL,
name       TEXT    UNIQUE
               NOT NULL,
country_id INTEGER REFERENCES country (id) 
               NOT NULL
);

-- Tabla: sale
DROP TABLE IF EXISTS sale;

CREATE TABLE IF NOT EXISTS sale (
id      INTEGER PRIMARY KEY AUTOINCREMENT
            UNIQUE
            NOT NULL,
moment  TEXT    NOT NULL,
book_id INTEGER REFERENCES book (id) 
            NOT NULL
);

COMMIT TRANSACTION;

INSERT INTO literary_subgenre (name,num) VALUES ('name1',1);
INSERT INTO literary_subgenre (name,num) VALUES ('name2',2);
INSERT INTO literary_subgenre (name,num) VALUES ('name3',3);

INSERT INTO country (name) VALUES ('q1');
INSERT INTO country (name) VALUES ('w2');
INSERT INTO country (name) VALUES ('e3');
PRAGMA foreign_keys = on;
`;

init();

//deberia ir en un controlador
async function onOpenLink(url) {
  Platform.OS === "web" ? os.open(url) : await Linking.openURL(url);
}

function setTray() {
  if (NL_MODE !== "window") {
    console.log("INFO: Tray menu is only available in the window mode.");
    return;
  }

  let tray = {
    icon: "/ireti-src/public/icons/trayIcon.png",
    menuItems: [
      { id: "VERSION", text: "Get version" },
      { id: "SEP", text: "-" },
      { id: "QUIT", text: "Quit" },
    ],
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
      os.showMessageBox(
        "Version information",
        `Neutralinojs server: v${NL_VERSION} | Neutralinojs client: v${NL_CVERSION}`
      );
      break;
    case "QUIT":
      exit();
      break;
    default:
      break;
  }
}

events.on("ready", async () => {
  events.on("trayMenuItemClicked", onTrayMenuItemClicked);
  events.on("windowClose", exit);
  if (NL_OS !== "Darwin") {
    // TODO: Fix https://github.com/neutralinojs/neutralinojs/issues/615
    setTray();
  }

  await neutrawindow.show();
});

const App = () => {
  const store = {
    navigation: useReducer(navigationReducer, {
      showHelp: false,
      screen: "accounting",
    }),
    book: useReducer(sqlReducer, { data: [] }),
    author: useReducer(sqlReducerAuthor, { data: [] }),
    literary_subgenre: useReducer(sqlReducerLiterarySubgenre, { data: [] }),
    country: useReducer(sqlReducerCountry, { data: [] }),
    province: useReducer(sqlReducerProvince, { data: [] }),
  };

  const [state, dispatch] = useCombinedReducers(store);

  const onConnect = useCallback((event, worker, setConnect) => {
    worker.postMessage({ action: "query", args: [SCHEMA] });
    setConnect(event.data.result);
  }, []);
  const worker = useConnectDb("/mydb.sqlite3", "db.js", onConnect);

  return (
    <DispatchContext.Provider value={[state, dispatch, worker]}>
      <PaperProvider theme={theme}>
        <View style={{ flex: 1 }}>
          <TopBar />
          <View style={{ flex: 1, padding: 10 }}>
            {state.navigation.screen === "accounting" && <Accounting />}
            {state.navigation.screen === "book" && <Book />}
            {state.navigation.screen === "author" && <Author />}
            {state.navigation.screen === "subgenre" && <LiterarySubgenre />}
            {state.navigation.screen === "country" && <Localization />}
          </View>
        </View>
      </PaperProvider>
    </DispatchContext.Provider>
  );
};

export default App;
