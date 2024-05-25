import { useContext, useReducer, useRef } from "react";
import { FAB, Text } from "react-native-paper";
import { TabsProvider, Tabs, TabScreen } from "react-native-paper-tabs";
import { StyleSheet } from "react-native";
import { DispatchContext } from "../context/app";
import { screenReducer } from "../reducer/loclization";
import { useNativeFormModel } from "../hook/form";
import {
  onCeateNew,
  onModalClose,
  onModalOk,
} from "../controller/localization";
import DismissAlert from "../component/DismissAlert";
import Dialog from "../component/Dialog";
import Loader from "../component/Loader";
import Country from "../component/Country";
import Province from "../component/Province";

const Localization = () => {
  const [state, dispatch, worker] = useContext(DispatchContext);

  const [screenState, screenDispatch] = useReducer(screenReducer, {
    tab: 0,
    showDismissAlert: false,
    showModalAlert: false,
    dismissMsg: "",
    showLoader: false,
  });

  const [
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
  });

  const resetForm = () => {
    if (screenState.tab === 0) {
      setNewCountryData({
        id: null,
        name: "",
      });
    }

    if (screenState.tab === 1) {
      setNewProvinceData({
        id: null,
        name: "",
        country: "",
      });
    }
  };

  const modalOk = () => {
    if (screenState.tab === 0) {
      onModalOk(worker, "country", newCountryData, resetForm, screenDispatch);
    }

    if (screenState.tab === 1) {
      onModalOk(worker, "province", newProvinceData, resetForm, screenDispatch);
    }
  };

  const countryNameInputRef = useRef(null);
  const provinceNameInputRef = useRef(null);

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
              <Text>Paises</Text>
              {screenState.tab === 0 && (
                <Country
                  styles={styles}
                  screenDispatch={screenDispatch}
                  countryAttr={countryAttr}
                  setNewCountryData={setNewCountryData}
                  error={errorCountry}
                  setError={setErrorCountry}
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
              <Text>Provincias</Text>
              {screenState.tab === 1 && (
                <Province
                  styles={styles}
                  screenDispatch={screenDispatch}
                  provinceAttr={provinceAttr}
                  setNewProvinceData={setNewProvinceData}
                  error={errorProvince}
                  setError={setErrorProvince}
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
