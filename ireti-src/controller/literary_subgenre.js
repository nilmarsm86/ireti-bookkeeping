import { validateNativeFormModel } from "../hook/form";

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
                worker.postMessage({ action: 'updateLiterarySubgenre', args: [newGenreData.id, { ':id':newGenreData.id, ':name': newGenreData.name, ':num': Number(newGenreData.num) }] });
            }

            return true;
        } catch (e) {
            console.error(e);            
            return false;            
        }
    }
    
    return false;
}