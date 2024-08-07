import "@expo/metro-runtime";
import { View, Linking, Platform } from "react-native";
import {
  init,
  events,
  os,
  app,
  window as neutrawindow,
} from "@neutralinojs/lib";
import { StrictMode, useCallback, useReducer, useState } from "react";

import {
  DefaultTheme,
  Provider as PaperProvider,
  ProgressBar,
} from "react-native-paper";

import { DispatchContext } from "./context/app";
import { navigationReducer } from "./reducer/navigation";

//hooks
import { useCombinedReducers } from "./hook/reducer";
import { useConnectDb, useQuery } from "./hook/sqlite";

//reducers

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
import { sqlReducerPublishing } from "./reducer/publishing";
import Publishing from "./screen/Publishing";
import { sqlReducerBook } from "./reducer/book";
import { sqlReducerSetting } from "./reducer/setting";

import * as controller from "./controller/controller";
import Setting from "./screen/Setting";

const theme = {
  ...DefaultTheme,
  //...DarkTheme,
};

const SCHEMA = `
--
-- Archivo generado con SQLiteStudio v3.4.4 el sáb. jun. 22 10:53:01 2024
--
-- Codificación de texto usada: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Tabla: author
DROP TABLE IF EXISTS author;

CREATE TABLE IF NOT EXISTS author (
    id          INTEGER PRIMARY KEY AUTOINCREMENT
                        UNIQUE
                        NOT NULL,
    name        TEXT    NOT NULL
                        UNIQUE,
    gender      TEXT    NOT NULL,
    country_id  INTEGER REFERENCES country (id) 
                        NOT NULL,
    province_id INTEGER REFERENCES province (id) 
                        DEFAULT NULL
);

-- Tabla: book
DROP TABLE IF EXISTS book;

CREATE TABLE book (
    id                   INTEGER PRIMARY KEY AUTOINCREMENT
                                 UNIQUE
                                 NOT NULL,
    title                TEXT    NOT NULL,
    tag                  TEXT    NOT NULL,
    edition_year         INTEGER,
    edition_number       INTEGER,
    acquisition_price    INTEGER NOT NULL,
    transport_price      INTEGER NOT NULL,
    marketing_megas      REAL    NOT NULL,
    marketing_price      INTEGER NOT NULL,
    difficult_price      INTEGER NOT NULL,
    amount                       NOT NULL
                                 DEFAULT (1),
    literary_subgenre_id INTEGER REFERENCES literary_subgenre (id) 
                                 NOT NULL,
    publishing_id        INTEGER REFERENCES publishing (id) 
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

-- Tabla: publishing
DROP TABLE IF EXISTS publishing;

CREATE TABLE IF NOT EXISTS publishing (
    id   INTEGER PRIMARY KEY
                 UNIQUE
                 NOT NULL,
    name TEXT    UNIQUE
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

CREATE TABLE setting (
    id    INTEGER PRIMARY KEY AUTOINCREMENT
                  UNIQUE
                  NOT NULL,
    key   TEXT    UNIQUE
                  NOT NULL,
    value TEXT
);

-- Example data

INSERT INTO setting (key, value) VALUES ('number_books_purchased', 0);
INSERT INTO setting (key, value) VALUES ('number_books_sold', 0);
INSERT INTO setting (key, value) VALUES ('transport_price', 100);
INSERT INTO setting (key, value) VALUES ('megas_to_money', 200);

INSERT INTO publishing (name) VALUES ('editorial1');
INSERT INTO publishing (name) VALUES ('editorial2');
INSERT INTO publishing (name) VALUES ('editorial3');

INSERT INTO literary_subgenre (name, num) VALUES ('literary_subgenre1',1);
INSERT INTO literary_subgenre (name, num) VALUES ('literary_subgenre2',2);
INSERT INTO literary_subgenre (name, num) VALUES ('literary_subgenre3',3);

INSERT INTO country (name) VALUES ('country1');
INSERT INTO country (name) VALUES ('country2');
INSERT INTO country (name) VALUES ('country3');

INSERT INTO province (name, country_id) VALUES ('province1 del pais actual', 1);
INSERT INTO province (name, country_id) VALUES ('province2', 1);
INSERT INTO province (name, country_id) VALUES ('province3', 2);

INSERT INTO author (name, gender, country_id,  province_id) VALUES ('Author1 SecondName Lastname SecondLastName', 'm', 1, 1);
INSERT INTO author (name, gender, country_id,  province_id) VALUES ('Author2', 'f', 1, 2);
INSERT INTO author (name, gender, country_id,  province_id) VALUES ('Author3', 'm', 2, 3);

INSERT INTO book (title, tag, edition_year, edition_number, acquisition_price, transport_price, marketing_megas, marketing_price, difficult_price, amount, literary_subgenre_id, publishing_id) VALUES ('Titulo del libro', 'titulo-del-libro', 2024, 1, 500, 100, 1, 2, 200, 1, 1, 1);

INSERT INTO book_author (book_id, author_id) VALUES (1, 1);
INSERT INTO book_author (book_id, author_id) VALUES (1, 2);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
`;

init();

//deberia ir en un controlador
async function onOpenLink(url) {
  Platform.OS === "web" ? os.open(url) : await Linking.openURL(url);
}

function setTray() {
  // eslint-disable-next-line no-undef
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
        // eslint-disable-next-line no-undef
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
  // eslint-disable-next-line no-undef
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
    book: useReducer(sqlReducerBook, { data: [] }),
    author: useReducer(sqlReducerAuthor, { data: [] }),
    literary_subgenre: useReducer(sqlReducerLiterarySubgenre, { data: [] }),
    country: useReducer(sqlReducerCountry, { data: [] }),
    province: useReducer(sqlReducerProvince, { data: [] }),
    publishing: useReducer(sqlReducerPublishing, { data: [] }),
    setting: useReducer(sqlReducerSetting, { data: [] }),
  };

  const [state, dispatch] = useCombinedReducers(store);
  const [loading, setLoading] = useState(true);

  const onConnect = useCallback(
    (event, worker, setConnect) => {
      worker.onmessage = (event) => {
        if (event.data.action === "query") {
          setLoading(false);
        }

        if (event.data.action === "allSettings") {
          controller.simpleDispatch(event, dispatch, "select_setting");
        }
      };
      worker.postMessage({ action: "query", args: [SCHEMA] });
      setConnect(event.data.result);
    },
    [dispatch]
  );
  const worker = useConnectDb("/mydb.sqlite3", "db.js", onConnect);

  useQuery(
    worker,
    "allSettings",
    "SELECT * FROM setting",
    {},
    state.setting.data.length
  );

  return (
    <StrictMode>
      <DispatchContext.Provider value={[state, dispatch, worker]}>
        <PaperProvider theme={theme}>
          <View style={{ flex: 1 }}>
            {loading === true && (
              <ProgressBar
                indeterminate={true}
                style={{
                  width: "90%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "40%",
                }}
              />
            )}
            {loading === false && (
              <>
                <TopBar />

                <View style={{ flex: 1, padding: 10 }}>
                  {state.navigation.screen === "accounting" && <Accounting />}
                  {state.navigation.screen === "book" && <Book />}
                  {state.navigation.screen === "author" && <Author />}
                  {state.navigation.screen === "subgenre" && (
                    <LiterarySubgenre />
                  )}
                  {state.navigation.screen === "publishing" && <Publishing />}
                  {state.navigation.screen === "country" && <Localization />}
                  {state.navigation.screen === "setting" && <Setting />}
                </View>
              </>
            )}
          </View>
        </PaperProvider>
      </DispatchContext.Provider>
    </StrictMode>
  );
};

export default App;
