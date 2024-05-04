import { useContext, useEffect, useState } from 'react';
import Table from '../component/Table/Table';
import { StyleSheet, View } from 'react-native';
import Form from '../component/Form/Form';
import Input from '../component/Form/Input';

import { useNativeFormModel, validateNativeFormModel } from "../hook/form";
import { FAB } from 'react-native-paper';
import { DispatchContext } from '../context/app';

export default () => {
    const [state, dispatch, worker] = useContext(DispatchContext);

    const [data, setData] = useState([]);
    const [c, setC] = useState(data.length);
    worker.onmessage = function (e) {
        switch (e.data.action) {
            case 'findAllLiterarySubgenre':
                setData(e.data.result);
                setC(e.data.result.length);
                break;
            case 'addLiterarySubgenre':
                setC(c + 1);
                break;
        }
    };

    const metadata = [
        { name: 'id', title: 'ID', show: false, sortDirection: 'descending', numeric: false },
        { name: 'name', title: 'Name', show: true, sortDirection: '', numeric: false },
        { name: 'num', title: 'Num', show: true, sortDirection: '', numeric: true },
    ];

    useEffect(() => {
        worker.postMessage({ action: 'findAllLiterarySubgenre' });
    }, [c]);

    const initialData = {
        id: null,
        name: "",
        num: ""
    };
    const [genreAttr, newGenreData, setNewGenreData, error, setError] = useNativeFormModel(initialData);

    const resetForm = () => {
        setNewGenreData(initialData);
    };

    const onSave = async () => {
        if (!validateNativeFormModel(genreAttr, {
            name: "",
            num: ""
        }, setError)) {
            try {
                worker.postMessage({ action: 'addLiterarySubgenre', args: [{ ':name': newGenreData.name, ':num': Number(newGenreData.num) }] });
                //TODO: mostrar mensaje de que se agrego el nuevo genero
                console.log('mostrar mensaje de que se agrego el nuevo genero');
                resetForm();
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <>
            <View style={styles.container}>
                <View style={{ flex: 'auto', width: '59%', minWidth: '300px' }}>
                    <Table metadata={metadata} data={data} buttons={
                        {
                            save: { press: () => { }, icon: 'pencil' },
                            delete: { icon: 'delete', press: () => console.log('eliminar') },
                        }
                    } />
                </View>
                <View style={{ flex: 'auto', width: '39%' }}>
                    <Form title='Agregar genrero literaio:' buttons={
                        {
                            save: { label: 'Salvar', press: onSave, icon: 'content-save' },
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
