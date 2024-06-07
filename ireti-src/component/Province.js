import { useContext } from "react";
import { View } from "react-native";
import { DispatchContext } from "../context/app";
import { useFetchData, useFindAll } from "../hook/sqlite";
import Table from "./Table/Table";
import { applyManageProvince, onSave } from "../controller/province";
import { onRowDelete } from "../controller/screen";
import ProvinceForm from "../form/ProvinceForm";
import { province_metadata } from "../config/metadata";

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

  useFindAll(worker, "readData", "province", state.province.data.length);
  useFindAll(worker, "allCountries", "country", state.country.data.length);

  //transform data for select (country name to id)
  const fromIdToNameCountry = (province) => {
    const country = state.country.data.find((country) => {
      return country.name === province.country;
    });
    setNewProvinceData({ ...province, country: country.id });
  };

  //transform province.country_id to name
  const fromIdToNameProvinceCountry = (data, countries) => {
    return data.map((province) => {
      const country = countries.find((country) => {
        return country.id === province.country_id;
      });

      if (country) {
        province.country = country.name;
      }

      return province;
    });
  };

  const onSaveForm = () => {
    onSave(provinceAttr, setError, worker, state.province.data, screenDispatch);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: "auto", width: "59%", minWidth: "300px" }}>
        <Table
          metadata={province_metadata}
          data={fromIdToNameProvinceCountry(
            state.province.data,
            state.country.data
          )}
          buttons={{
            edit: { icon: "pencil", press: fromIdToNameCountry },
            delete: {
              icon: "delete",
              press: (item) =>
                onRowDelete(screenDispatch, fromIdToNameCountry, item),
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
        />
      </View>
    </View>
  );
};

export default Province;
