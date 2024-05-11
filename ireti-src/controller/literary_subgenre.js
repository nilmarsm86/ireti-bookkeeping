import { validateNativeFormModel } from "../hook/form";

//poner en un memo
export const applyManageSubgenre = (worker, dispatch) => {
    worker.onmessage = function (e) {
        if(e.data.action === 'findAllLiterarySubgenre'){
            dispatch({type:'findAllLiterarySubgenre', payload: e.data.result});
        }

        if(['addLiterarySubgenre', 'updateLiterarySubgenre', 'removeLiterarySubgenre'].indexOf(e.data.action) !== -1){
            dispatch({type:'addLiterarySubgenre', payload: e.data.result[0]});
            worker.postMessage({ action: 'findAllLiterarySubgenre' });
        }
        
        /*switch (e.data.action) {
            case 'findAllLiterarySubgenre':                
                dispatch({type:'findAllLiterarySubgenre', payload: e.data.result});
                return ;
                break;
            case 'addLiterarySubgenre':                
                dispatch({type:'addLiterarySubgenre', payload: e.data.result[0]});
                break;
            case 'updateLiterarySubgenre':                
                dispatch({type:'updateLiterarySubgenre', payload: e.data.result[0]});
                break;
            case 'removeLiterarySubgenre':                
                dispatch({type:'removeLiterarySubgenre', payload: e.data.result[0]});                
                break;
        }*/
    };   
}

export const onSave = (genreAttr, setError, newGenreData, worker) => {
    const data = {
        name: "",
        num: ""
    };

    if (validateNativeFormModel(genreAttr, data, setError) === false) {
        try {
            if (newGenreData.id === null) {
                worker.postMessage({ action: 'addLiterarySubgenre', args: [{ ':name': newGenreData.name, ':num': Number(newGenreData.num) }] });
            } else {
                worker.postMessage({ action: 'updateLiterarySubgenre', args: [newGenreData.id, { ':id': newGenreData.id, ':name': newGenreData.name, ':num': Number(newGenreData.num) }] });
            }

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    return false;
}

export const onRowDelete = (setShowModalAlert, setNewGenreData, item) => {
    setShowModalAlert(true);
    setNewGenreData(item);
};

export const onModalClose = (resetForm, setShowModalAlert) => {
    resetForm();
    setShowModalAlert(false);
};

export const onModalOk = (worker, newGenreData, resetForm, setShowModalAlert) => { 
    //TODO: buscar si hay libros que dependen de este genero literario en caso de que si mostrar mensaje diciendo esto
    worker.postMessage({ action: 'removeLiterarySubgenre', args: [{ ':id': newGenreData.id }] }); 
    //onModalClose(resetForm, setShowModalAlert);
    resetForm();
    setShowModalAlert(false);
}

export const onAdd = (genreAttr, setError, newGenreData, worker, setShowDismissAlert, resetForm) => {
    if (onSave(genreAttr, setError, newGenreData, worker)) {
        setShowDismissAlert(true);
        resetForm();
    }
};