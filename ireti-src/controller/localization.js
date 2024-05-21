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