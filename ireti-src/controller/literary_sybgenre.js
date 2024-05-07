import { validateNativeFormModel } from "../hook/form";

export const onSave = async (genreAttr, setError, newGenreData, worker) => {
    const data = {
        name: "",
        num: ""
    };
    
    if (!validateNativeFormModel(genreAttr, data, setError)) {
        try {
            if (newGenreData.id === null) {
                worker.postMessage({ action: 'addLiterarySubgenre', args: [{ ':name': newGenreData.name, ':num': Number(newGenreData.num) }] });
            } else {
                //TODO: actualizar el registro
                console.log('ACTUALIZAR EL REGISTRO');
            }
            return true;    
            //TODO: mostrar mensaje de que se agrego el nuevo genero
            //console.log('mostrar mensaje de que se agrego el nuevo genero');
            //resetForm();
        } catch (e) {
            console.error(e);
            return false;
        }
    }

}