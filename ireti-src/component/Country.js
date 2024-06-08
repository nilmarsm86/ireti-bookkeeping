import { useContext } from "react";
import { View } from "react-native";
import { DispatchContext } from "../context/app";
import { useFetchData, useFindAll } from "../hook/sqlite";
import { applyManageCountry } from "../controller/country";
import Table from "./Table/Table";
import CountryForm from "../form/CountryForm";
import { onRowDelete } from "../controller/screen";
import { country_metadata } from "../config/metadata";
import { onSave } from "../controller/controller";
import { isValid } from "../validator/country";

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

  const initialData = {
    id: null,
    name: "",
  };

  const resetForm = () => {
    setNewCountryData({ ...initialData });
  };

  useFetchData(worker, applyManageCountry(dispatch, screenDispatch, resetForm));
  useFindAll(worker, "allCountries", "country", state.country.data.length);

  const onSaveForm = () => {
    //onSave(countryAttr, setError, worker, state.country.data, screenDispatch);
    onSave(
      isValid,
      countryAttr,
      setError,
      worker,
      state.country.data,
      screenDispatch,
      "country",
      { name: countryAttr.name.value }
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: "auto", width: "59%", minWidth: "300px" }}>
        <Table
          metadata={country_metadata}
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
        <CountryForm
          countryAttr={countryAttr}
          error={error}
          nameInputRef={nameInputRef}
          onSaveForm={onSaveForm}
        />
      </View>
    </View>
  );
};

export default Country;
