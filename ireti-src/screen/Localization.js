import {
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { TabsProvider, Tabs, TabScreen } from "react-native-paper-tabs";
import { DispatchContext } from "../context/app";
import { screenReducer } from "../reducer/loclization";
import { onCeateNew, onModalOk } from "../controller/localization";
import Country from "../component/Country";
import Province from "../component/Province";
import TitleSection from "../component/TitleSection";
import { onModalClose } from "../controller/controller";
import { country_mapping, province_mapping } from "../config/mapping";
import { reset } from "../hook/validator";
import RestElements from "../component/RestElements";

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

  const resetForm = useCallback(() => {
    let mapping = country_mapping;
    if (screenState.tab === 1) {
      mapping = province_mapping;
    }

    reset(mapping);

    screenState.tab === 0
      ? setCountryModel({ ...mapping })
      : setProvinceModel({ ...mapping });
  }, [screenState.tab]);

  const createNew = useCallback(() => {
    let inputRef = countryNameInputRef;
    if (screenState.tab === 1) {
      inputRef = provinceNameInputRef;
    }

    onCeateNew(resetForm, inputRef);
  }, [resetForm, screenState.tab]);

  const onDissmisDialog = useCallback(
    () => onModalClose(resetForm, screenDispatch),
    [resetForm]
  );

  const dialogButtons = useMemo(() => {
    const modalOk = () => {
      let table = "country";
      let id = countryModel.id.value;
      if (screenState.tab === 1) {
        table = "province";
        id = provinceModel.id.value;
      }

      onModalOk(worker, table, id, resetForm, screenDispatch);
    };

    return {
      cancel: {
        label: "No",
        press: () => onModalClose(resetForm, screenDispatch),
      },
      ok: { label: "Si", press: modalOk },
    };
  }, [
    resetForm,
    countryModel.id.value,
    provinceModel.id.value,
    screenState.tab,
    worker,
  ]);

  return (
    <>
      <TabsProvider defaultIndex={screenState.tab} onChangeIndex={() => {}}>
        <Tabs>
          <TabScreen
            label="Países"
            icon="earth"
            badge={state.country.data.length}
            onPress={() => screenDispatch({ type: "CHNAGE_TAB", payload: 0 })}
          >
            <>
              <TitleSection>Países</TitleSection>
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
            onPress={() => screenDispatch({ type: "CHNAGE_TAB", payload: 1 })}
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

      <RestElements
        createNew={createNew}
        screenState={screenState}
        screenDispatch={screenDispatch}
        dialogTitle="Borrar registro"
        dialogLabel="Está seguro que desea borrar el registro?"
        onDissmisDialog={onDissmisDialog}
        dialogButtons={dialogButtons}
      />
    </>
  );
};

export default Localization;
