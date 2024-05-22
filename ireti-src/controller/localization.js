export const onModalClose = (resetForm, screenDispatch) => {
    resetForm();
    screenDispatch({ type: 'HIDE_MODAL_ALERT' });
};

export const onModalOk = (worker, table, data, resetForm, screenDispatch) => {
    //TODO: buscar si hay autores que dependen de esta localizacion en caso de que si mostrar mensaje diciendo esto
    console.warn('buscar si hay autores que dependen de esta localizacion en caso de que si mostrar mensaje diciendo esto');
    worker.postMessage({ action: 'delete', args: [table, { 'id': data.id }] });
    screenDispatch({ type: 'SHOW_LOADER' });
    onModalClose(resetForm, screenDispatch);
}

export const onCeateNew = (resetForm, nameInputRef) => {
    resetForm();
    nameInputRef.current.focus();

};