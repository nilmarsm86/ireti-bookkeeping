import { useState } from "react";

/**
 * Connect to Sqlite DB
 * @param {*} dbPath
 * @param {*} workerPath
 * @returns
 */
export const useConnectDb = (dbPath, workerPath, onConnect = null) => {
  const [worker, setWorker] = useState(new Worker(workerPath));
  const [connect, setConnect] = useState(false);
  applyConnectDb(worker, connect, setConnect, dbPath, onConnect, worker);
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
  if (!connect) {
    worker.onmessage = function (event) {
      switch (event.data.action) {
        case "connect":
          onConnect === null
            ? applyOnConnect(event, worker, setConnect)
            : onConnect(event, worker, setConnect);
          break;
        default:
          break;
      }
    };

    worker.postMessage({ action: "connect", args: [dbPath] });
  }
}

/**
 * Prepare for interact with DB
 *
 * @param {Worker} worker
 * @param {Function} apply
 * @returns
 */
export const useFetchData = (worker, apply) => {
  worker.onmessage = apply;
};
