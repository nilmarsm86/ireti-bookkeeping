import { useCallback, useContext, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { DispatchContext } from "../context/app";
import { useFetchData, useFindAll } from "../hook/sqlite";
import { applyManageCountry } from "../controller/country";
import Table from "./Table/Table";
import CountryForm from "../form/CountryForm";
import { country_metadata } from "../config/metadata";
import { onRowDelete, onSave } from "../controller/controller";
import { country_mapping } from "../config/mapping";

const Country = ({
  screenDispatch,
  resetForm,
  model,
  setModel,
  nameInputRef,
}) => {
  const [state, dispatch, worker] = useContext(DispatchContext);

  useFetchData(worker, applyManageCountry(dispatch, screenDispatch, resetForm));
  useFindAll(worker, "allCountries", "country", state.country.data.length);

  const onSaveForm = () => {
    onSave(
      worker,
      model,
      setModel,
      state.country.data,
      screenDispatch,
      "country",
      { name: model.name.value }
    );
  };

  const dbToForm = useCallback(
    (item) => {
      let model = { ...country_mapping };
      for (const [key, value] of Object.entries(item)) {
        model[key] = { ...model[key], value: value };
      }
      setModel(model);
    },
    [setModel]
  );

  const buttons = useMemo(() => {
    return {
      edit: { icon: "pencil", press: dbToForm },
      delete: {
        icon: "delete",
        press: (item) => onRowDelete(screenDispatch, dbToForm, item),
      },
    };
  }, [screenDispatch, dbToForm]);

  const onSearch = useCallback(
    (value) => {
      return state.country.data.filter((item) => value === item.name);
    },
    [state.country.data]
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: "auto", width: "59%", minWidth: "300px" }}>
        <Table
          metadata={country_metadata}
          data={[...state.country.data]}
          buttons={buttons}
          onSearch={onSearch}
        />
      </View>
      <View style={{ flex: "auto", width: "39%" }}>
        <CountryForm
          model={model}
          changeModel={setModel}
          nameInputRef={nameInputRef}
          onSave={onSaveForm}
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

export default Country;
