import { useEffect } from "react";

export const useConnectDb = (dbPath, worker, connect, setConnect) => {
    useEffect(() => {
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
    }, [worker]);
};