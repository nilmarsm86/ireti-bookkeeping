import { useContext, useState } from 'react';
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

export default () => {
    const [state, dispatch, worker] = useContext(DispatchContext);
        
    //components
    //TODO: useReducer
    const [showDismissAlert, setShowDismissAlert] = useState(false);
    const [showModalAlert, setShowModalAlert] = useState(false);    
    
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
    const modalClose = () => onModalClose(resetForm, setShowModalAlert);

    return (
        <>
            <View style={styles.container}>
                <View style={{ flex: 'auto', width: '59%', minWidth: '300px' }}>
                    {/*<Table metadata={metadata} data={[...data]} buttons={*/}
                    <Table metadata={metadata} data={[...state.literary_subgenre.data]} buttons={    
                        {
                            edit: { press: setNewGenreData, icon: 'pencil' },
                            delete: { icon: 'delete', press: (item) => onRowDelete(setShowModalAlert, setNewGenreData, item) },
                        }
                    } />
                </View>
                <View style={{ flex: 'auto', width: '39%' }}>
                    <Form title='Agregar genrero literaio:' buttons={
                        {
                            save: { label: 'Salvar', press: () => onAdd(genreAttr, setError, newGenreData, worker, setShowDismissAlert, resetForm), icon: 'content-save' },
                            //delete: { label: 'Eliminar', icon: 'delete', press: () => console.log('eliminar') },
                        }
                    }>
                        <Input
                            label='Nombre'
                            icon='pencil'
                            errorMsg='Establesca el nombre del género!'
                            error={error.name}
                            {...genreAttr.name} />
                        <Input
                            label='Número'
                            icon='music-accidental-sharp'
                            errorMsg='Establesca el número del género!'
                            value={genreAttr.num.value}
                            error={error.num}
                            onChangeText={genreAttr.num.onChangeText} />
                    </Form>
                </View>
            </View>

            <FAB icon='plus' style={styles.fab} onPress={resetForm} />
            
            <DismissAlert label='Registro salvado' onClose={setShowDismissAlert} visible={showDismissAlert} />
            
            <ModalAlert title='Esta seguro que desea borrar el registro?' visible={showModalAlert} onDismiss={modalClose} buttons={
                {
                    cancel: { label: 'No', press: modalClose },
                    ok: { label: 'Si', press: () => onModalOk(worker, newGenreData, resetForm, setShowModalAlert) },
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