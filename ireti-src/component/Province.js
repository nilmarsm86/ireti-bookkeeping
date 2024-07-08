import { useCallback, useContext, useMemo } from "react";
import { View } from "react-native";
import { DispatchContext } from "../context/app";
import { useManageData, useFindAll, useQuery } from "../hook/sqlite";
import Table from "../import/Table/Table";
import { applyManageProvince } from "../controller/province";
import ProvinceForm from "../form/ProvinceForm";
import { province_metadata } from "../config/metadata";
import { onSave, onRowDelete } from "../controller/controller";
import { province_mapping } from "../config/mapping";
import styles from "../style/style";
import { mappingToForm } from "../hook/form";

const Province = ({
  screenDispatch,
  resetForm,
  model,
  setModel,
  nameInputRef,
}) => {
  const [state, dispatch, worker] = useContext(DispatchContext);

  useManageData(
    worker,
    applyManageProvince(dispatch, screenDispatch, resetForm)
  );

  useFindAll(worker, "province", state.province.data.length);
  useQuery(
    worker,
    "allCountries",
    "SELECT * FROM country",
    {},
    state.country.data.length
  );

  //transform data for select (country name to id)
  const fromIdToNameCountry = useCallback(
    (province) => {
      let model = mappingToForm(province_mapping, province);

      const country = state.country.data.find(
        (c) => c.name === province.country
      );

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
      const country = countries.find((c) => c.id === province.country_id);

      if (country) {
        province.country = country.name;
      }

      return province;
    });
  };

  const onSaveForm = (m) => {
    onSave(
      worker,
      m,
      setModel,
      state.province.data,
      screenDispatch,
      "province",
      {
        name: m.name.value.trim(),
        country_id: m.country.value,
      }
    );
  };

  const tableButtons = useMemo(() => {
    return {
      edit: { icon: "pencil", press: fromIdToNameCountry },
      delete: {
        icon: "delete",
        press: (item) => onRowDelete(screenDispatch, fromIdToNameCountry, item),
      },
    };
  }, [fromIdToNameCountry, screenDispatch]);

  const onSearch = useCallback(
    (value) =>
      state.province.data.filter(
        (item) => value === item.name || value === item.country
      ),
    [state.province.data]
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: "auto", width: "59%", minWidth: "300px" }}>
        <Table
          metadata={province_metadata}
          data={fromIdToNameProvinceCountry(
            state.province.data,
            state.country.data
          )}
          buttons={tableButtons}
          onSearch={onSearch}
        />
      </View>
      <View style={{ flex: "auto", width: "39%" }}>
        <ProvinceForm
          model={model}
          nameInputRef={nameInputRef}
          onSave={onSaveForm}
          countries={state.country.data}
        />
      </View>
    </View>
  );
};

export default Province;
