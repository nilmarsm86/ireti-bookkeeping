let db = null;

/**
 * Connect to DB
 * @param {*} path DB path
 * @returns Boolean
 */
self.connect = async (path) => {
    let sqlite3Js = 'sqlite3.js';
    const urlParams = new URL(self.location.href).searchParams;
    if (urlParams.has('sqlite3.dir')) {
        sqlite3Js = urlParams.get('sqlite3.dir') + '/' + sqlite3Js;
    }
    importScripts(sqlite3Js);

    console.log('Loading and initializing SQLite3 module...');
    const sqlite3 = await sqlite3InitModule({
        print: console.log,
        printErr: console.error,
    });

    console.log('Done initializing. Running demo...');
    try {
        console.log('Running SQLite3 version', sqlite3.version.libVersion);
        if ('opfs' in sqlite3) {
            db = new sqlite3.oo1.OpfsDb(path);
            console.log('OPFS is available, created persisted database at', db.filename);
        } else {
            db = new sqlite3.oo1.DB(path, 'ct');
            console.log('OPFS is not available, created transient database', db.filename);
        }
        return true;
    } catch (err) {
        console.error(err);
        return false
    }
};

/**
 * After connect execute
 * @returns 
 */
self.createDataBase = async function () {
    await db.exec(`
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

-- INSERT INTO literary_subgenre (name,num) VALUES ('name1',1);
-- INSERT INTO literary_subgenre (name,num) VALUES ('name2',2);
-- INSERT INTO literary_subgenre (name,num) VALUES ('name3',3);
PRAGMA foreign_keys = on;
    `);
    return true;
};

/**
 * Create SQL statment for insert
 * @param {Object} data 
 * @param {String} table 
 * @returns String
 */
function sqlInsert(data, table) {
    let columns = Object.keys(data);
    let columnsList = columns.join(',');
    let columnsBindName = [];
    for (let i in columns) {
        columnsBindName.push(":" + columns[i]);
    }
    return "INSERT INTO " + table + "(" + columnsList + ") VALUES (" + columnsBindName.join(',') + ") RETURNING *";
}

/**
 * Create SQL statment for update
 * @param {Object} conditionData 
 * @param {Object} data 
 * @param {String} table 
 * @returns Strign
 */
function sqlUpdate(conditionData, data, table) {
    let columnsCondition = Object.keys(conditionData);
    let columnsBindCondition = [];
    for (let i in columnsCondition) {
        columnsBindCondition.push(columnsCondition[i] + " = :" + columnsCondition[i]);
    }
    let condition = columnsBindCondition.join(' AND ');

    let columns = Object.keys(data);
    let columnsBind = [];
    for (let i in columns) {
        columnsBind.push(columns[i] + " = :" + columns[i]);
    }
    let columnsList = columnsBind.join(', ');
    return "UPDATE " + table + " SET " + columnsList + " WHERE " + condition + " RETURNING *";
}

/**
 * Create SQL statment for delete
 * @param {Object} data 
 * @param {String} table 
 * @returns String
 */
function sqlRemove(data, table) {
    let columnsCondition = Object.keys(data);
    let columnsBindCondition = [];
    for (let i in columnsCondition) {
        columnsBindCondition.push(columnsCondition[i] + " = :" + columnsCondition[i]);
    }
    let condition = columnsBindCondition.join(' AND ');
    return "DELETE FROM " + table + " WHERE " + condition + " RETURNING *";
}

/**
 * Bind data wit columns
 * @param {Object} data 
 * @returns Object
 */
function bindData(data) {
    let bind = {};
    for (let i in data) {
        bind[":" + i] = data[i];
    }

    return bind;
}

self.insert = async (table, data) => {
    return await db.exec({
        sql: sqlInsert(data, table),
        // bind by parameter by index
        bind: bindData(data),
        rowMode: 'object',
        returnValue: 'resultRows'
    });
}

self.update = async (table, data, condition) => {
    return await db.exec({
        sql: sqlUpdate(condition, data, table),
        bind: bindData(data),
        rowMode: 'object',
        returnValue: 'resultRows'
    });
};

self.delete = async (table, condition) => {
    return await db.exec({
        sql: sqlRemove(condition, table),
        bind: bindData(condition),
        rowMode: 'object',
        returnValue: 'resultRows'
    });
};

self.selectAll = async (table) => {
    return await db.exec({
        sql: "SELECT * FROM " + table,
        rowMode: 'object',
        returnValue: 'resultRows'
    });
}

self.select = async (sql, bindData={}) => {
    return await db.exec({
        sql: sql,
        bind: bindData(bindData),
        rowMode: 'object',
        returnValue: 'resultRows'
    });
}

self.onmessage = async (e) => {
    let args = e.data.args || [];
    const result = await self[e.data.action].apply(self, args);
    if (result) {
        self.postMessage({ action: e.data.action, result: result });
    }
};