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
export const useManageData = (worker, apply) => {
  worker.onmessage = apply;
};

/**
 * Find all data from table
 * @param {*} worker
 * @param {*} action
 * @param {*} table
 * @param {*} dataLength
 */
export const useFindAll = (worker, table, dataLength) => {
  useEffect(() => {
    if (dataLength === 0) {
      worker.postMessage({
        action: "select",
        args: [table],
      });
    }
  }, [worker, table, dataLength]);
};

/**
 * Find data from query
 * @param {*} worker
 * @param {*} action
 * @param {*} sql
 * @param {*} dataBind
 * @param {*} dataLength
 */
export const useQuery = (worker, action, sql, dataBind, dataLength) => {
  useEffect(() => {
    if (dataLength === 0) {
      worker.postMessage({
        action: action,
        args: [sql, dataBind],
      });
    }
  }, [worker, action, sql, dataBind, dataLength]);
};
