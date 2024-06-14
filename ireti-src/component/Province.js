import { useCallback, useContext, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { DispatchContext } from "../context/app";
import { useFetchData, useFindAll } from "../hook/sqlite";
import Table from "./Table/Table";
import { applyManageProvince } from "../controller/province";
import ProvinceForm from "../form/ProvinceForm";
import { province_metadata } from "../config/metadata";
import { onSave, onRowDelete } from "../controller/controller";
import { province_mapping } from "../config/mapping";

const Province = ({
  screenDispatch,
  resetForm,
  model,
  setModel,
  nameInputRef,
}) => {
  const [state, dispatch, worker] = useContext(DispatchContext);

  /*const initialData = {
    id: null,
    name: "",
    country: "",
  };*/

  /*const resetForm = () => {
    setNewProvinceData({ ...initialData });
  };*/

  useFetchData(
    worker,
    applyManageProvince(worker, dispatch, screenDispatch, resetForm)
  );

  useFindAll(worker, "readData", "province", state.province.data.length);
  useFindAll(worker, "allCountries", "country", state.country.data.length);

  //transform data for select (country name to id)
  const fromIdToNameCountry = useCallback(
    (province) => {
      let model = { ...province_mapping };
      for (const [key, value] of Object.entries(province)) {
        model[key] = { ...model[key], value: value };
      }

      const country = state.country.data.find((c) => {
        return c.name === province.country;
      });

      setModel({
        ...model,
        country: { ...model.country, value: country.id },
      });
    },
    [setModel, state.country.data]
  );

  //transform province.country_id to name
  const fromIdToNameProvinceCountry = (provinces, countries) => {
    return provinces.map((province) => {
      const country = countries.find((c) => {
        return c.id === province.country_id;
      });

      if (country) {
        province.country = country.name;
      }

      return province;
    });
  };

  const onSaveForm = () => {
    onSave(
      worker,
      model,
      setModel,
      state.province.data,
      screenDispatch,
      "province",
      {
        name: model.name.value,
        country_id: model.country.value,
      }
    );
  };

  const buttons = useMemo(() => {
    return {
      edit: { icon: "pencil", press: fromIdToNameCountry },
      delete: {
        icon: "delete",
        press: (item) => onRowDelete(screenDispatch, fromIdToNameCountry, item),
      },
    };
  }, [fromIdToNameCountry, screenDispatch]);

  const onSearch = useCallback(
    (value) => {
      return [...state.province.data].filter(
        (item) => value === item.name || value === item.country
      );
    },
    [state.province.data]
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: "auto", width: "59%", minWidth: "300px" }}>
        <Table
          metadata={province_metadata}
          data={[
            ...fromIdToNameProvinceCountry(
              [...state.province.data],
              [...state.country.data]
            ),
          ]}
          buttons={buttons}
          onSearch={onSearch}
        />
      </View>
      <View style={{ flex: "auto", width: "39%" }}>
        <ProvinceForm
          model={model}
          changeModel={setModel}
          nameInputRef={nameInputRef}
          onSave={onSaveForm}
          countries={state.country.data}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 10,
  },
});

export default Province;
