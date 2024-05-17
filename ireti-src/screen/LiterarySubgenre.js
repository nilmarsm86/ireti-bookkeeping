import { useContext, useReducer, useRef, useState } from 'react';
import Table from '../component/Table/Table';
import { StyleSheet, View } from 'react-native';
import Form from '../component/Form/Form';
import Input from '../component/Form/Input';

import { useNativeFormModel } from "../hook/form";
import { FAB } from 'react-native-paper';
import { DispatchContext } from '../context/app';
import { onAdd, onModalClose, onModalOk, onRowDelete, applyManageSubgenre } from '../controller/literary_subgenre';
import DismissAlert from '../component/DismissAlert';
import ModalAlert from '../component/ModalAlert';
import { useFetchData } from '../hook/sqlite';
import { screenReducer } from '../reducer/literary_subgenre';

export default () => {
    const [state, dispatch, worker] = useContext(DispatchContext);

    //components    
    const [screenState, screenDispatch] = useReducer(screenReducer, {
        showDismissAlert: false,
        showModalAlert: false,
    });

    const nameInputRef = useRef(null);

    //data
    useFetchData(state.literary_subgenre.data, dispatch, worker, applyManageSubgenre);

    const metadata = [
        { name: 'id', title: 'ID', show: false, sortDirection: 'descending', numeric: false },
        { name: 'name', title: 'Name', show: true, sortDirection: '', numeric: false },
        { name: 'num', title: 'Num', show: true, sortDirection: '', numeric: true },
    ];

    const initialData = {
        id: null,
        name: "",
        num: ""
    };
    const [genreAttr, newGenreData, setNewGenreData, error, setError] = useNativeFormModel(initialData);

    const resetForm = () => setNewGenreData(initialData);
    const createNew = () => {
        resetForm();        
        nameInputRef.current.focus();        
    };
    const modalClose = () => onModalClose(resetForm, screenDispatch);

    return (
        <>
            <View style={styles.container}>
                <View style={{ flex: 'auto', width: '59%', minWidth: '300px' }}>                    
                    <Table metadata={metadata} data={[...state.literary_subgenre.data]} buttons={
                        {
                            edit: { icon: 'pencil', press: setNewGenreData },
                            delete: { icon: 'delete', press: (item) => onRowDelete(screenDispatch, setNewGenreData, item) },
                        }
                    } />
                </View>
                <View style={{ flex: 'auto', width: '39%' }}>
                    <Form title='Agregar génrero literario:' buttons={
                        {
                            save: { label: 'Salvar', press: () => onAdd(genreAttr, setError, newGenreData, worker, screenDispatch, resetForm), icon: 'content-save' },
                            //delete: { label: 'Eliminar', icon: 'delete', press: () => console.log('eliminar') },
                        }
                    }>
                        <Input
                            label='Nombre'
                            icon='pencil'
                            errorMsg='Establesca el nombre del género literario!'
                            error={error.name}
                            {...genreAttr.name} 
                            reference={nameInputRef}/>
                        <Input
                            label='Número'
                            icon='music-accidental-sharp'
                            errorMsg='Establesca el número del género literario!'
                            value={genreAttr.num.value}
                            error={error.num}
                            onChangeText={genreAttr.num.onChangeText} />
                    </Form>
                </View>
            </View>

            <FAB icon='plus' style={styles.fab} onPress={createNew} />

            <DismissAlert label='Datos salvados' onClose={() => screenDispatch({ type: 'HIDE_DISMISS_ALERT' })} visible={screenState.showDismissAlert} />

            <ModalAlert title='Está seguro que desea borrar el registro?' visible={screenState.showModalAlert} onDismiss={modalClose} buttons={
                {
                    cancel: { label: 'No', press: modalClose },
                    ok: { label: 'Si', press: () => onModalOk(worker, newGenreData, resetForm, screenDispatch) },
                }
            } />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 10
    },
    fab: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    }
});