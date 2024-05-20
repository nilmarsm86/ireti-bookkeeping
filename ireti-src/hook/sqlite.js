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

/**
 * Execute after connect toi DB
 * @param {Event} event 
 * @param {Worker} worker 
 * @param {Function} setConnect 
 */
function applyOnConnect(event, worker, setConnect) {
    setConnect(event.data.result);
}

/**
 * Execute after connect toi DB
 * @param {Worker} worker 
 * @param {Boolean} connect 
 * @param {Function} setConnect 
 * @param {String} dbPath 
 * @param {Function} onConnect 
 */
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
export const useFetchData = (data, apply) => {
    /*if (apply === null) {
        apply = applyManage;
    }*/

    useEffect(() => {
        apply();
    }, [data.length]);
};

/*const applyManage = (worker, dispatch, onError) => {
    worker.onmessage = function (e) {
        if (e.data.action === 'error') {
            onError(e.data.result);
            return;
        }

        let payload = (e.data.action !== 'select') ? e.data.result[0] : e.data.result;
        dispatch({ type: String(e.data.action).toUpperCase(), payload: payload });
    };
}*/