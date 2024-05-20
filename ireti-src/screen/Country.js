import { useContext, useReducer, useRef, useState } from 'react';
import Select from '../component/Select';
import { FAB, Text } from 'react-native-paper';
import {
    TabsProvider,
    Tabs,
    TabScreen,    
} from 'react-native-paper-tabs';
import { StyleSheet, View } from 'react-native';
import { DispatchContext } from '../context/app';
import { screenReducer } from '../reducer/country';
import Table from '../component/Table/Table';
import Form from '../component/Form/Form';
import Input from '../component/Form/Input';
import { useNativeFormModel } from '../hook/form';
import { applyManageCountry, onCeateNew, onSave } from '../controller/country';
import DismissAlert from '../component/DismissAlert';
import Dialog from '../component/Dialog';
import { useFetchData } from '../hook/sqlite';
import Loader from '../component/Loader';

export default () => {

    /*const [selected, onChangeSelected] = useState("");
    const data = [
        { label: '-Seleccione un pais-', value: '' },
        { label: 'Uno', value: '1' },
        { label: 'Dos', value: '2' },
        { label: 'Tres', value: '3' },
        { label: 'Cuatro', value: '4' },
        { label: 'Cinco', value: '5' },
        { label: 'Seis', value: '6' },
        { label: 'Siete', value: '7' },
        { label: 'Ocho', value: '8' },
        { label: 'Nueve', value: '9' },
        { label: 'Diez', value: '10' },
    ];*/

    const [state, dispatch, worker] = useContext(DispatchContext);
    //const [tab, onChangeTab] = useState(0);
    const [screenState, screenDispatch] = useReducer(screenReducer, {
        tab: 0,
        showDismissAlert: false,
        showModalAlert: false,
        dismissMsg: '',
        showLoader: false
    });

    const initialData = {
        id: null,
        name: "",        
    };

    const resetForm = () => {        
        setNewCountryData({...initialData});
    };

    const nameInputRef = useRef(null);

    useFetchData(state.country.data, applyManageCountry(worker, dispatch, screenDispatch, resetForm));

    const metadata = [
        { name: 'id', title: 'ID', show: false, sortDirection: 'descending', numeric: false },
        { name: 'name', title: 'Nombre', show: true, sortDirection: '', numeric: false },        
    ];
    
    const [countryAttr, newCountryData, setNewCountryData, error, setError] = useNativeFormModel({...initialData});

    return (
        <>
            {/*<Select label='País' selected={selected} onChangeSelected={onChangeSelected} data={data} />
            <Text>Se a seleccionado la opcion: {selected}</Text>*/}

            <TabsProvider defaultIndex={screenState.tab} onChangeIndex={() => { }}>
                <Tabs>
                    <TabScreen label="Pais" icon="compass" badge={state.country.data.length} onPress={() => { console.log('cargar datos de los paises'); }}>
                        <View style={styles.container}>
                            <View style={{ flex: 'auto', width: '59%', minWidth: '300px' }}>
                                <Table metadata={metadata} data={[...state.country.data]} buttons={
                                    {
                                        edit: { icon: 'pencil', press: () => setNewCountryData },
                                        delete: { icon: 'delete', press: (item) => onRowDelete(screenDispatch, setNewCountryData, item) },
                                    }
                                } />
                            </View>
                            <View style={{ flex: 'auto', width: '39%' }}>
                                <Form title='Agregar país:' buttons={
                                    {
                                        save: { label: 'Salvar', press: () => onSave(countryAttr, setError, worker, state.country.data, screenDispatch), icon: 'content-save' },                                        
                                    }
                                }>
                                    <Input
                                        label='Nombre'
                                        icon='pencil'
                                        error={error.name}
                                        {...countryAttr.name}
                                        reference={nameInputRef}
                                    />                                    
                                </Form>
                            </View>
                        </View>
                    </TabScreen>

                    <TabScreen label="Localidad" icon="bag-suitcase" badge={state.province.data.length} onPress={() => { console.log('cargar datos de las provincias'); }}>
                        <View style={{ backgroundColor: 'red', flex: 1 }} />
                    </TabScreen>
                </Tabs>
            </TabsProvider>

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