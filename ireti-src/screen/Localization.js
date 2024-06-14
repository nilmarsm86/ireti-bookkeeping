import { useContext, useReducer, useRef, useState } from "react";
import { FAB } from "react-native-paper";
import { TabsProvider, Tabs, TabScreen } from "react-native-paper-tabs";
import { StyleSheet } from "react-native";
import { DispatchContext } from "../context/app";
import { screenReducer } from "../reducer/loclization";
import { onCeateNew, onModalOk } from "../controller/localization";
import DismissAlert from "../component/DismissAlert";
import Dialog from "../component/Dialog";
import Loader from "../component/Loader";
import Country from "../component/Country";
import Province from "../component/Province";
import TitleSection from "../component/TitleSection";
import { onModalClose } from "../controller/controller";
import { country_mapping, province_mapping } from "../config/mapping";
import { reset } from "../hook/validator";

const Localization = () => {
  const [state, dispatch, worker] = useContext(DispatchContext);

  const [screenState, screenDispatch] = useReducer(screenReducer, {
    tab: 0,
    showDismissAlert: false,
    showModalAlert: false,
    dismissMsg: "",
    showLoader: false,
  });

  const [countryModel, setCountryModel] = useState(country_mapping);
  const countryNameInputRef = useRef(null);

  const [provinceModel, setProvinceModel] = useState(province_mapping);
  const provinceNameInputRef = useRef(null);

  /*const [
    countryAttr,
    newCountryData,
    setNewCountryData,
    errorCountry,
    setErrorCountry,
  ] = useNativeFormModel({
    id: null,
    name: "",
  });

  const [
    provinceAttr,
    newProvinceData,
    setNewProvinceData,
    errorProvince,
    setErrorProvince,
  ] = useNativeFormModel({
    id: null,
    name: "",
    country: "",
  });*/

  const resetForm = () => {
    if (screenState.tab === 0) {
      reset(country_mapping);
      setCountryModel(country_mapping);
    }

    if (screenState.tab === 1) {
      reset(province_mapping);
      setProvinceModel(province_mapping);
    }
  };

  const modalOk = () => {
    if (screenState.tab === 0) {
      onModalOk(
        worker,
        "country",
        countryModel.id.value,
        resetForm,
        screenDispatch
      );
    }

    if (screenState.tab === 1) {
      onModalOk(
        worker,
        "province",
        provinceModel.id.value,
        resetForm,
        screenDispatch
      );
    }
  };

  const createNew = () => {
    if (screenState.tab === 0) {
      onCeateNew(resetForm, countryNameInputRef);
    }

    if (screenState.tab === 1) {
      onCeateNew(resetForm, provinceNameInputRef);
    }
  };

  return (
    <>
      <TabsProvider defaultIndex={screenState.tab} onChangeIndex={() => {}}>
        <Tabs>
          <TabScreen
            label="Paises"
            icon="earth"
            badge={state.country.data.length}
            onPress={() => {
              screenDispatch({ type: "CHNAGE_TAB", payload: 0 });
            }}
          >
            <>
              <TitleSection>Paises</TitleSection>
              {screenState.tab === 0 && (
                <Country
                  screenDispatch={screenDispatch}
                  resetForm={resetForm}
                  model={countryModel}
                  setModel={setCountryModel}
                  nameInputRef={countryNameInputRef}
                />
              )}
            </>
          </TabScreen>

          <TabScreen
            label="Provincias"
            icon="compass"
            badge={state.province.data.length}
            onPress={() => {
              screenDispatch({ type: "CHNAGE_TAB", payload: 1 });
            }}
          >
            <>
              <TitleSection>Provincias</TitleSection>
              {screenState.tab === 1 && (
                <Province
                  screenDispatch={screenDispatch}
                  resetForm={resetForm}
                  model={provinceModel}
                  setModel={setProvinceModel}
                  nameInputRef={provinceNameInputRef}
                />
              )}
            </>
          </TabScreen>
        </Tabs>
      </TabsProvider>

      <FAB icon="plus" style={styles.fab} onPress={createNew} />
      <DismissAlert
        label={screenState.dismissMsg}
        onClose={() => screenDispatch({ type: "HIDE_DISMISS_ALERT" })}
        visible={screenState.showDismissAlert}
      />
      <Dialog
        title="Borrar registro"
        label="Está seguro que desea borrar el registro?"
        visible={screenState.showModalAlert}
        onDismiss={() => onModalClose(resetForm, screenDispatch)}
        buttons={{
          cancel: {
            label: "No",
            press: () => onModalClose(resetForm, screenDispatch),
          },
          ok: { label: "Si", press: modalOk },
        }}
      />
      <Loader visible={screenState.showLoader} />
    </>
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
  fab: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

export default Localization;
