import { useContext, useState } from 'react';
import Table from '../component/Table/Table';
import { StyleSheet, View } from 'react-native';
import Form from '../component/Form/Form';
import Input from '../component/Form/Input';

import { useNativeFormModel, validateNativeFormModel } from "../hook/form";
import { FAB } from 'react-native-paper';
import { DispatchContext } from '../context/app';
import { onSave } from '../controller/literary_subgenre';
import { useLiterarySubgenre } from '../services/literary_subgenre';
import DismissAlert from '../component/DismissAlert';
import ModalAlert from '../component/ModalAlert';

export default () => {
    const [state, dispatch, worker] = useContext(DispatchContext);
    const [showDismissAlert, setShowDismissAlert] = useState(false);
    const [showModalAlert, setShowModalAlert] = useState(false);
    const [removeItem, setRemoveItem] = useState(null);

    const [data, setData] = useState([]);
    useLiterarySubgenre(worker, data, setData);

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

    const onAdd = () => {
        if (onSave(genreAttr, setError, newGenreData, worker)) {
            setShowDismissAlert(true);
            resetForm();
        }
    };

    const onRemove = (item) => {        
        setShowModalAlert(true);
        setRemoveItem(item);
    };

    const onModalClose = () => setShowModalAlert(false);
    const onModalOk = () => { 
        //TODO: buscar si hay libros que dependen de este genero literario en caso de que si mostrar mensaje diciendo esto
        worker.postMessage({ action: 'removeLiterarySubgenre', args: [{ ':id': removeItem.id }] }); 
        setShowModalAlert(false);
    }

    return (
        <>
            <View style={styles.container}>
                <View style={{ flex: 'auto', width: '59%', minWidth: '300px' }}>
                    <Table metadata={metadata} data={[...data]} buttons={
                        {
                            save: { press: setNewGenreData, icon: 'pencil' },
                            delete: { icon: 'delete', press: onRemove },
                        }
                    } />
                </View>
                <View style={{ flex: 'auto', width: '39%' }}>
                    <Form title='Agregar genrero literaio:' buttons={
                        {
                            save: { label: 'Salvar', press: onAdd, icon: 'content-save' },
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
            <ModalAlert title='Esta seguro que desea borrar el registro?' visible={showModalAlert} onDismiss={onModalClose} buttons={
                {
                    cancel: { label: 'No', press: onModalClose },
                    ok: { label: 'Si', press: onModalOk },
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