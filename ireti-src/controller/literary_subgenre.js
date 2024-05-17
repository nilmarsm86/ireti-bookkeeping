import { validateNativeFormModel } from "../hook/form";

//poner en un memo
export const applyManageSubgenre = (worker, dispatch) => {
    worker.onmessage = function (e) {
        if(e.data.action === 'selectAll'){
            dispatch({type:'findAllLiterarySubgenre', payload: e.data.result});
        }

        if(['insert', 'update', 'delete'].indexOf(e.data.action) !== -1){
            dispatch({type:e.data.action, payload: e.data.result[0]});
            worker.postMessage({ action: 'selectAll', args: ["literary_subgenre"] });
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
                worker.postMessage({ action: 'insert', args: ["literary_subgenre", { 'name': newGenreData.name, 'num': Number(newGenreData.num) }] });
            } else {
                worker.postMessage({ action: 'update', args: ["literary_subgenre", { 'id': newGenreData.id, 'name': newGenreData.name, 'num': Number(newGenreData.num) }, { 'id': newGenreData.id }] });
            }

            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    return false;
}

export const onRowDelete = (screenDispatch, setNewGenreData, item) => {    
    screenDispatch({type:'SHOW_MODAL_ALERT'});
    setNewGenreData(item);
};

export const onModalClose = (resetForm, screenDispatch) => {
    resetForm();    
    screenDispatch({type:'HIDE_MODAL_ALERT'});
};

export const onModalOk = (worker, newGenreData, resetForm, screenDispatch) => { 
    //TODO: buscar si hay libros que dependen de este genero literario en caso de que si mostrar mensaje diciendo esto
    worker.postMessage({ action: 'delete', args: ["literary_subgenre", { 'id': newGenreData.id }] }); 
    //onModalClose(resetForm, setShowModalAlert);
    resetForm();    
    screenDispatch({type:'HIDE_MODAL_ALERT'});
}

export const onAdd = (genreAttr, setError, newGenreData, worker, screenDispatch, resetForm) => {
    if (onSave(genreAttr, setError, newGenreData, worker)) {        
        screenDispatch({type:'SHOW_DISMISS_ALERT'});
        resetForm();
    }
};