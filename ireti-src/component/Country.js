import { useContext } from "react";
import { View } from "react-native";
import { DispatchContext } from "../context/app";
import { useFetchData, useFindAll } from "../hook/sqlite";
import { applyManageCountry, onSave } from "../controller/country";
import Table from "./Table/Table";
import Form from "./Form/Form";
import Input from "./Form/Input";
import { onRowDelete } from "../controller/screen";

const Country = ({
  styles,
  screenDispatch,
  countryAttr,
  setNewCountryData,
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
  ];

  const initialData = {
    id: null,
    name: "",
  };

  const resetForm = () => {
    setNewCountryData({ ...initialData });
  };

  useFetchData(worker, applyManageCountry(dispatch, screenDispatch, resetForm));
  useFindAll(worker, "allCountries", "country", state.country.data.length);

  return (
    <View style={styles.container}>
      <View style={{ flex: "auto", width: "59%", minWidth: "300px" }}>
        <Table
          metadata={metadata}
          data={[...state.country.data]}
          buttons={{
            edit: { icon: "pencil", press: setNewCountryData },
            delete: {
              icon: "delete",
              press: (item) =>
                onRowDelete(screenDispatch, setNewCountryData, item),
            },
          }}
        />
      </View>
      <View style={{ flex: "auto", width: "39%" }}>
        <Form
          title="Datos del país:"
          buttons={{
            save: {
              label: "Salvar",
              press: () =>
                onSave(
                  countryAttr,
                  setError,
                  worker,
                  state.country.data,
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
            {...countryAttr.name}
            reference={nameInputRef}
          />
        </Form>
      </View>
    </View>
  );
};

export default Country;
