import { useEffect, useState } from "react";

/**
 * Connect to Sqlite DB
 * @param {*} dbPath 
 * @param {*} workerPath 
 * @returns 
 */
export const useConnectDb = (dbPath, workerPath, onConnect = null) => {
    const [worker, setWorker] = useState(new Worker(workerPath));
    const [connect, setConnect] = useState(false);

    useEffect(() => {        
        applyConnectDb(worker, connect, setConnect, dbPath, onConnect);        
    }, [worker]);

    return worker;
};

function applyOnConnect(event, worker, setConnect) {    
    setConnect(event.data.result);
}

function applyConnectDb(worker, connect, setConnect, dbPath, onConnect) {       
    worker.onmessage = function (event) {
        switch (event.data.action) {
            case 'connect':                
                (onConnect === null) ? applyOnConnect(event, worker, setConnect) : onConnect(event, worker, setConnect);                
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
        apply(worker, dispatch);
    }, [data.length]);
};