import { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { DispatchContext } from "../context/app";
import { useFetchData } from "../hook/sqlite";
import Table from "./Table/Table";
import Form from "./Form/Form";
import Input from "./Form/Input";
import Select from "./Select";
import {
  applyManageProvince,
  onRowDelete,
  onSave,
} from "../controller/province";

const Province = ({
  styles,
  screenDispatch,
  provinceAttr,
  setNewProvinceData,
  error,
  setError,
  nameInputRef,
}) => {
  const [state, dispatch, worker] = useContext(DispatchContext);

  const metadata = [
    {
      name: "id",
      title: "ID",
      show: false,
      sortDirection: "descending",
      numeric: false,
    },
    {
      name: "name",
      title: "Nombre",
      show: true,
      sortDirection: "",
      numeric: false,
    },
    {
      name: "country",
      title: "País",
      show: true,
      sortDirection: "",
      numeric: false,
    },
  ];

  const initialData = {
    id: null,
    name: "",
    country: "",
  };

  const resetForm = () => {
    setNewProvinceData({ ...initialData });
  };

  const [countries, setCountries] = useState([]);
  useFetchData(
    worker,
    applyManageProvince(
      worker,
      dispatch,
      screenDispatch,
      resetForm,
      setCountries
    )
  );

  useEffect(() => {
    worker.postMessage({
      action: "allCountries",
      args: ["SELECT * FROM country"],
    });
  }, [worker]);

  //transform data for select (country name to id)
  const transformProvinceData = (item) => {
    const country = countries.find((element) => {
      return element.name === item.country;
    });
    setNewProvinceData({ ...item, country: country.id });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: "auto", width: "59%", minWidth: "300px" }}>
        <Table
          metadata={metadata}
          data={[...state.province.data]}
          buttons={{
            edit: { icon: "pencil", press: transformProvinceData },
            delete: {
              icon: "delete",
              press: (item) =>
                onRowDelete(screenDispatch, transformProvinceData, item),
            },
          }}
        />
      </View>
      <View style={{ flex: "auto", width: "39%" }}>
        <Form
          title="Datos de la provincia:"
          buttons={{
            save: {
              label: "Salvar",
              press: () =>
                onSave(
                  provinceAttr,
                  setError,
                  worker,
                  state.province.data,
                  screenDispatch
                ),
              icon: "content-save",
            },
          }}
        >
          <Input
            label="Nombre"
            icon="pencil"
            error={error.name}
            {...provinceAttr.name}
            reference={nameInputRef}
          />

          <Select
            label="Países"
            data={countries.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            error={error.country}
            {...provinceAttr.country}
          />
        </Form>
      </View>
    </View>
  );
};

export default Province;
