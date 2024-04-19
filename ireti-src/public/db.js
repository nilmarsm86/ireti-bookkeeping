let db = null;

self.init = async () => {
    let sqlite3Js = 'sqlite3.js';
    const urlParams = new URL(self.location.href).searchParams;
    if(urlParams.has('sqlite3.dir')){
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
        await self.start(sqlite3);
        return true;
    } catch (err) {
        console.error(err);
    }
};

self.start = async function (sqlite3) {
    console.log('Running SQLite3 version', sqlite3.version.libVersion);
    
    if ('opfs' in sqlite3) {
        db = new sqlite3.oo1.OpfsDb('/mydb.sqlite3');
        console.log('OPFS is available, created persisted database at', db.filename);
    } else {
        db = new sqlite3.oo1.DB('/mydb.sqlite3', 'ct');
        console.log('OPFS is not available, created transient database', db.filename);
    }
    // Your SQLite code here.    
    await db.exec("CREATE TABLE IF NOT EXISTS t(a,b)");    
};

self.add = async (data) => {        
    return await db.exec({
        sql: "INSERT INTO t(a,b) VALUES ("+Object.keys(data).join(',')+") RETURNING *",
        // bind by parameter index...
        bind: data,
        rowMode: 'object',
        returnValue: 'resultRows'
    });    
};

self.findAll = async () => {        
    return await db.exec({
        sql: "SELECT * FROM t",        
        rowMode: 'object',
        returnValue: 'resultRows'
    });
};

self.onmessage = async (e) => {    
    let args = e.data.args || [];    
    const result = await self[e.data.action].apply(self, args);    
	if(result){
		self.postMessage({action: e.data.action, result: result});
	}
};