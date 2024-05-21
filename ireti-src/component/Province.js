import { useContext, useRef, useState } from 'react';
import { View } from 'react-native';
import { DispatchContext } from '../context/app';
import { useFetchData } from '../hook/sqlite';
import { applyManageCountry, onRowDelete, onSave } from '../controller/country';
import Table from './Table/Table';
import Form from './Form/Form';
import Input from './Form/Input';
import Select from './Select';
import { FAB, Text } from 'react-native-paper';

export default ({ styles, screenDispatch, provinceAttr, setNewProvinceData, error, setError }) => {
    const [state, dispatch, worker] = useContext(DispatchContext);

    const metadata = [
        { name: 'id', title: 'ID', show: false, sortDirection: 'descending', numeric: false },
        { name: 'name', title: 'Nombre', show: true, sortDirection: '', numeric: false },
        { name: 'country', title: 'País', show: true, sortDirection: '', numeric: false },
    ];

    const initialData = {
        id: null,
        name: "",
        country: ""
    };

    const resetForm = () => {
        setNewProvinceData({ ...initialData });
    };

    const nameInputRef = useRef(null);

    useFetchData(state.province.data, applyManageCountry(worker, dispatch, screenDispatch, resetForm));

    //const [provinceAttr, newCountryData, setNewProvinceData, error, setError] = useNativeFormModel({ ...initialData });

    const [selected, onChangeSelected] = useState("");
    const options = [
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
    ];

    return (
        <View style={styles.container}>
            <View style={{ flex: 'auto', width: '59%', minWidth: '300px' }}>
                <Table metadata={metadata} data={[...state.province.data]} buttons={
                    {
                        edit: { icon: 'pencil', press: setNewProvinceData },
                        delete: { icon: 'delete', press: (item) => onRowDelete(screenDispatch, setNewProvinceData, item) },
                    }
                } />
            </View>
            <View style={{ flex: 'auto', width: '39%' }}>
                <Form title='Agregar provincia:' buttons={
                    {
                        save: { label: 'Salvar', press: () => onSave(provinceAttr, setError, worker, state.province.data, screenDispatch), icon: 'content-save' },
                    }
                }>
                    <Input
                        label='Nombre'
                        icon='pencil'
                        error={error.name}
                        {...provinceAttr.name}
                        reference={nameInputRef}
                    />

                    <Select label='País' selected={selected} onChangeSelected={onChangeSelected} data={options} />                    
                </Form>
            </View>
        </View>
    );
};