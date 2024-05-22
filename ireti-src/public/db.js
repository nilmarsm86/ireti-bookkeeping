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
 * Prepare bind columns
 * @param {Object} data 
 * @returns Array
 */
function prepareBind(data) {
    let columns = Object.keys(data);
    let columnsBind = [];
    for (let i in columns) {
        columnsBind.push(columns[i] + " = :" + columns[i]);
    }

    return columnsBind;
}

/**
 * Create SQL statment for update
 * @param {Object} conditionData 
 * @param {Object} data 
 * @param {String} table 
 * @returns Strign
 */
function sqlUpdate(conditionData, data, table) {
    let columnsBindCondition = prepareBind(conditionData);
    let condition = columnsBindCondition.join(' AND ');

    let columnsBind = prepareBind(data);
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
    let columnsBindCondition = prepareBind(data);
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

/**
 * Execute a query
 * @param {String} sql 
 * @param {Object} data 
 * @returns Array
 */
self.query = async (sql, data = {}) => {
    return await db.exec({
        sql: sql,
        bind: bindData(data),
        rowMode: 'object',
        returnValue: 'resultRows'
    });
}

/**
 * Insert query
 * @param {String} table 
 * @param {Object} data 
 * @returns Array
 */
self.insert = async (table, data) => {
    return query(sqlInsert(data, table), data);
}

/**
 * Update query
 * @param {String} table 
 * @param {Object} data 
 * @param {Object} condition 
 * @returns Array
 */
self.update = async (table, data, condition) => {
    return query(sqlUpdate(condition, data, table), data);
};

/**
 * Delete query
 * @param {String} table  
 * @param {Object} condition 
 * @returns Array
 */
self.delete = async (table, condition) => {
    return query(sqlRemove(condition, table), condition);
};

/**
 * Select all query
 * @param {String} table 
 * @returns Array
 */
self.select = async (table) => {
    return query("SELECT * FROM " + table);
}

self.onmessage = async (e) => {
    try {
        let args = e.data.args || [];        
        const result = (self[e.data.action]) ? await self[e.data.action].apply(self, args) : await self['query'].apply(self, args);
        self.postMessage({ action: e.data.action, result: result });
    }catch(e){        
        self.postMessage({ action: 'error', result: e });        
    }
};