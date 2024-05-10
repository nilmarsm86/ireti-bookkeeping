import { useEffect } from "react";

export const useConnectDb = (dbPath, worker, connect, setConnect) => {
    useEffect(() => {
        applyConnectDb(worker, setConnect, connect, dbPath);
    }, [worker]);
};

function applyConnectDb(worker, setConnect, connect, dbPath) {
    worker.onmessage = function (e) {
        switch (e.data.action) {
            case 'connect':
                worker.postMessage({ action: 'createDataBase' });
                setConnect(e.data.result);
                break;
            case 'createDataBase':
                console.log('creada DB');
                break;
        }
    };

    if (!connect) {
        worker.postMessage({ action: 'connect', args: [dbPath] });
    }
}
