//import { validateNativeFormModel } from "../hook/form";

function onError(e) {
    alert('A ocurrido un error al salvar la informacion');
    console.log('A ocurrido un error al salvar la informacion');
}

export const applyManageCountry = (worker, dispatch, screenDispatch, resetForm) => {
    return () => {
        worker.onmessage = function (e) {
            if (e.data.action === 'error') {
                onError(e);
                return;
            }

            switch (e.data.action) {
                case 'select':
                    dispatch({ type: String(e.data.action+'_country').toUpperCase(), payload: e.data.result });                    
                    break;
                case 'insert':
                    dispatch({ type: String(e.data.action+'_country').toUpperCase(), payload: e.data.result[0] });
                    screenDispatch({ type: 'AFTER_SAVE', payload: 'Datos agregados' });
                    resetForm();
                    break;
                case 'update':
                    dispatch({ type: String(e.data.action+'_country').toUpperCase(), payload: e.data.result[0] });
                    screenDispatch({ type: 'AFTER_SAVE', payload: 'Datos modificados' });
                    resetForm();
                    break;
                case 'delete':
                    dispatch({ type: String(e.data.action+'_country').toUpperCase(), payload: e.data.result[0] });
                    screenDispatch({ type: 'AFTER_SAVE', payload: 'Datos eliminados' });
                    break;
            }
        };
    };
};

//validacion formulario
function isValid(data, countryAttr, setError) {
    let valid = [true];
    let error = { name: false };

    if (countryAttr.name.value.length === 0) {
        error['name'] = 'Este campo no debe estar vacio!';
        valid.push(false);
    }

    let v = data.every((item) => {
        let validate = true;

        if (Number(item.id) !== Number(countryAttr.id.value)) {
            if (countryAttr.name.value === item.name) {
                error['name'] = 'Este pais ya existe!';
                validate = false;
            }
        }

        return validate;
    });
    valid.push(v);

    setError({ ...error });
    return valid.every((item) => item);
}

//insert and update
export const onSave = (countryAttr, setError, worker, existData, screenDispatch) => {
    if (isValid(existData, countryAttr, setError)) {
        try {
            if (countryAttr.id.value === null) {
                worker.postMessage({ action: 'insert', args: ["country", { 'name': countryAttr.name.value }] });
            } else {
                worker.postMessage({ action: 'update', args: ["country", { 'id': countryAttr.id.value, 'name': countryAttr.name.value }, { 'id': countryAttr.id.value }] });
            }
            screenDispatch({ type: 'SHOW_LOADER' });
        } catch (e) {
            onError(e);
        }
    }
}

export const onRowDelete = (screenDispatch, setNewCountryData, item) => {
    screenDispatch({ type: 'SHOW_MODAL_ALERT' });
    setNewCountryData(item);
};

export const onModalClose = (resetForm, screenDispatch) => {
    resetForm();
    screenDispatch({ type: 'HIDE_MODAL_ALERT' });
};

export const onModalOk = (worker, newCountryData, resetForm, screenDispatch) => {
    //TODO: buscar si hay libros que dependen de este genero literario en caso de que si mostrar mensaje diciendo esto
    worker.postMessage({ action: 'delete', args: ["country", { 'id': newCountryData.id }] });
    screenDispatch({ type: 'SHOW_LOADER' });
    onModalClose(resetForm, screenDispatch);
}

export const onCeateNew = (resetForm, nameInputRef) => {
    resetForm();
    nameInputRef.current.focus();

};