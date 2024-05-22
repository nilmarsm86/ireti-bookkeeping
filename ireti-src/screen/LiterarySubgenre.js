import { useContext, useEffect, useReducer, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
//components
import Table from '../component/Table/Table';
import Form from '../component/Form/Form';
import Input from '../component/Form/Input';
import DismissAlert from '../component/DismissAlert';
import Dialog from '../component/Dialog';

import { useNativeFormModel } from "../hook/form";
import { useFetchData } from '../hook/sqlite';

import { DispatchContext } from '../context/app';

import { onSave, onModalClose, onModalOk, onRowDelete, applyManageSubgenre, onCeateNew } from '../controller/literary_subgenre';

import { screenReducer } from '../reducer/literary_subgenre';
import Loader from '../component/Loader';
import { FAB } from 'react-native-paper';

export default () => {
    //reducers
    const [state, dispatch, worker] = useContext(DispatchContext);
    const [screenState, screenDispatch] = useReducer(screenReducer, {
        showDismissAlert: false,
        showModalAlert: false,
        dismissMsg: '',
        showLoader: false
    });

    const initialData = {
        id: null,
        name: "",
        num: ""
    };

    const resetForm = () => {
        setNewGenreData({ ...initialData });
    };

    const nameInputRef = useRef(null);

    useFetchData(worker, applyManageSubgenre(dispatch, screenDispatch, resetForm));

    const metadata = [
        { name: 'id', title: 'ID', show: false, sortDirection: 'descending', numeric: false },
        { name: 'name', title: 'Nombre', show: true, sortDirection: '', numeric: false },
        { name: 'num', title: 'Número', show: true, sortDirection: '', numeric: true },
    ];

    const [genreAttr, newGenreData, setNewGenreData, error, setError] = useNativeFormModel({ ...initialData });

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
                            save: { label: 'Salvar', press: () => onSave(genreAttr, setError, worker, state.literary_subgenre.data, screenDispatch), icon: 'content-save' },
                            //delete: { label: 'Eliminar', icon: 'delete', press: () => console.log('eliminar') },
                        }
                    }>
                        <Input
                            label='Nombre'
                            icon='pencil'
                            error={error.name}
                            {...genreAttr.name}
                            reference={nameInputRef}
                        />
                        <Input
                            label='Número'
                            icon='music-accidental-sharp'
                            value={genreAttr.num.value}
                            error={error.num}
                            onChangeText={genreAttr.num.onChangeText} />
                    </Form>
                </View>
            </View>

            <FAB icon='plus' style={styles.fab} onPress={() => onCeateNew(resetForm, nameInputRef)} />

            <DismissAlert label={screenState.dismissMsg} onClose={() => screenDispatch({ type: 'HIDE_DISMISS_ALERT' })} visible={screenState.showDismissAlert} />

            <Dialog title='Borrar registro' label='Está seguro que desea borrar el registro?' visible={screenState.showModalAlert} onDismiss={() => onModalClose(resetForm, screenDispatch)} buttons={
                {
                    cancel: { label: 'No', press: () => onModalClose(resetForm, screenDispatch) },
                    ok: { label: 'Si', press: () => onModalOk(worker, newGenreData, resetForm, screenDispatch) },
                }
            } />

            <Loader visible={screenState.showLoader} />
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