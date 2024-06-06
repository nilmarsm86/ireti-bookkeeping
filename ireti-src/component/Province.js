import { useContext } from "react";
import { View } from "react-native";
import { DispatchContext } from "../context/app";
import { useFetchData, useFindAll } from "../hook/sqlite";
import Table from "./Table/Table";
import { applyManageProvince, onSave } from "../controller/province";
import { onRowDelete } from "../controller/screen";
import ProvinceForm from "../form/ProvinceForm";

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

  useFetchData(
    worker,
    applyManageProvince(worker, dispatch, screenDispatch, resetForm)
  );
  useFindAll(worker, "allCountries", "country", state.country.data.length);

  //transform data for select (country name to id)
  const transformProvinceData = (item) => {
    const country = state.country.data.find((element) => {
      return element.name === item.country;
    });
    setNewProvinceData({ ...item, country: country.id });
  };

  const onSaveForm = () => {
    onSave(provinceAttr, setError, worker, state.province.data, screenDispatch);
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
        <ProvinceForm
          provinceAttr={provinceAttr}
          error={error}
          nameInputRef={nameInputRef}
          onSaveForm={onSaveForm}
          countries={state.country.data}
        ></ProvinceForm>
      </View>
    </View>
  );
};

export default Province;
