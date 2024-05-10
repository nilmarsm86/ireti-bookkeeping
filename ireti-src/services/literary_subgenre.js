import { useEffect, useState } from "react";

export const useLiterarySubgenre = (worker, data, setData) => {
    const [amount, setAmount] = useState(data.length);

    useEffect(() => {
        applyFindSubgenre(worker, setData, setAmount, amount);
    }, [amount]);
};

function applyFindSubgenre(worker, setData, setAmount, amount) {
    worker.onmessage = function (e) {
        switch (e.data.action) {
            case 'findAllLiterarySubgenre':
                setData(e.data.result);
                break;
            case 'addLiterarySubgenre':
                setAmount(amount + 1);
                break;
            case 'updateLiterarySubgenre':
                worker.postMessage({ action: 'findAllLiterarySubgenre' });
                break;
            case 'removeLiterarySubgenre':                
                worker.postMessage({ action: 'findAllLiterarySubgenre' });
                break;
        }
    };

    worker.postMessage({ action: 'findAllLiterarySubgenre' });
}

