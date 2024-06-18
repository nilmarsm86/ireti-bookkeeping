import { useCallback, useContext, useMemo } from "react";
import { View } from "react-native";
import { DispatchContext } from "../context/app";
import { useFindAll, useManageData } from "../hook/sqlite";
import { applyManageCountry } from "../controller/country";
import Table from "./Table/Table";
import CountryForm from "../form/CountryForm";
import { country_metadata } from "../config/metadata";
import { onRowDelete, onSave } from "../controller/controller";
import { country_mapping } from "../config/mapping";
import styles from "../style/style";
import { mappingToForm } from "../hook/form";

const Country = ({
  screenDispatch,
  resetForm,
  model,
  setModel,
  nameInputRef,
}) => {
  const [state, dispatch, worker] = useContext(DispatchContext);

  useManageData(
    worker,
    applyManageCountry(dispatch, screenDispatch, resetForm)
  );

  useFindAll(worker, "country", state.country.data.length);

  const onSaveForm = useCallback(
    (m) => {
      onSave(
        worker,
        m,
        setModel,
        state.country.data,
        screenDispatch,
        "country",
        {
          name: m.name.value,
        }
      );
    },
    [screenDispatch, worker, state.country.data, setModel]
  );

  const dbToForm = useCallback(
    (item) => {
      let model = mappingToForm(country_mapping, item);
      setModel(model);
    },
    [setModel]
  );

  const tableButtons = useMemo(() => {
    return {
      edit: { icon: "pencil", press: dbToForm },
      delete: {
        icon: "delete",
        press: (item) => onRowDelete(screenDispatch, dbToForm, item),
      },
    };
  }, [screenDispatch, dbToForm]);

  const onSearch = useCallback(
    (value) => state.country.data.filter((item) => value === item.name),
    [state.country.data]
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: "auto", width: "59%", minWidth: "300px" }}>
        <Table
          metadata={country_metadata}
          data={state.country.data}
          buttons={tableButtons}
          onSearch={onSearch}
        />
      </View>
      <View style={{ flex: "auto", width: "39%" }}>
        <CountryForm
          model={model}
          nameInputRef={nameInputRef}
          onSave={onSaveForm}
        />
      </View>
    </View>
  );
};

export default Country;
