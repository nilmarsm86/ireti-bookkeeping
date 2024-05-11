import { useEffect, useState } from "react";

/**
 * Connect to Sqlite DB
 * @param {*} dbPath 
 * @param {*} workerPath 
 * @returns 
 */
export const useConnectDb = (dbPath, workerPath, onConnect = null, oncreateDataBase = null) => {
    const [worker, setWorker] = useState(new Worker(workerPath));
    const [connect, setConnect] = useState(false);

    useEffect(() => {        
        applyConnectDb(worker, connect, setConnect, dbPath, onConnect, oncreateDataBase);        
    }, [worker]);

    return worker;
};

function applyOnConnect(event, worker, setConnect) {
    worker.postMessage({ action: 'createDataBase' });
    setConnect(event.data.result);
}

function applyOncreateDataBase(event, worker) {}

function applyConnectDb(worker, connect, setConnect, dbPath, onConnect, oncreateDataBase) {       
    worker.onmessage = function (event) {
        switch (event.data.action) {
            case 'connect':                
                (onConnect === null) ? applyOnConnect(event, worker, setConnect) : onConnect(event, worker, setConnect);                
                break;
            case 'createDataBase':
                (oncreateDataBase === null) ? applyOncreateDataBase(event, worker, setConnect) : oncreateDataBase(event, worker, setConnect);
                break;
        }
    };

    if (!connect) {
        worker.postMessage({ action: 'connect', args: [dbPath] });
    }
}

/**
 * Get data from DB
 * 
 * @param {Worker} worker 
 * @param {Function} apply 
 * @returns 
 */
export const useFetchData = (data, dispatch, worker, apply) => {
    useEffect(() => {        
        apply(worker, dispatch);//solo se ejecuta en insert y delete, update no cambia la longitud del arreglo
    }, [data.length]);
};