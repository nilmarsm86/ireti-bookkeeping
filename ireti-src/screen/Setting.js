import {
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import TitleSection from "../component/TitleSection";
import { DispatchContext } from "../context/app";
import { screenReducer } from "../reducer/setting";
import { setting_mapping } from "../config/mapping";
import { reset } from "../hook/validator";
import { useFindAll, useManageData } from "../hook/sqlite";
import { applyManageSetting } from "../controller/setting";
import { onSave } from "../controller/controller";
import { mappingToForm } from "../hook/form";
import { View } from "react-native";
import styles from "../style/style";
import Table from "../import/Table/Table";
import { setting_metadata } from "../config/metadata";
import RestElements from "../component/RestElements";

const Setting = () => {
  //reducers
  const [state, dispatch, worker] = useContext(DispatchContext);
  const [screenState, screenDispatch] = useReducer(screenReducer, {
    showDismissAlert: false,
    showModalAlert: false,
    dismissMsg: "",
    showLoader: false,
  });

  const [model, setModel] = useState(setting_mapping);
  const keyInputRef = useRef(null);

  const resetForm = () => {
    reset(setting_mapping);
    setModel({ ...setting_mapping });
  };

  useManageData(
    worker,
    applyManageSetting(dispatch, screenDispatch, resetForm)
  );

  useFindAll(worker, "setting", state.setting.data.length);

  const onSaveForm = useCallback(
    (m) => {
      onSave(
        worker,
        m,
        setModel,
        state.setting.data,
        screenDispatch,
        "setting",
        { key: m.key.value, value: m.value.value }
      );
    },
    [state.setting.data, worker]
  );

  const dbToForm = useCallback((item) => {
    let m = mappingToForm(setting_mapping, item);
    setModel(m);
  }, []);

  const tableButtons = useMemo(() => {
    return {
      edit: { icon: "pencil", press: dbToForm },
    };
  }, [dbToForm]);

  const mapData = (settings) => {
    return settings.map((setting) => {
      if (setting.key === "number_books_purchased") {
        setting.label = "Cantidad de libros comprados";
        setting.valueTransform = setting.value;
      }

      if (setting.key === "number_books_sold") {
        setting.label = "Cantidad de libros vendidos";
        setting.valueTransform = setting.value;
      }

      if (setting.key === "transport_price") {
        setting.label = "Precio del transporte";
        setting.valueTransform = "$ " + Number(setting.value / 100).toFixed(2);
      }

      if (setting.key === "megas_to_money") {
        setting.label = "Un mega son";
        setting.valueTransform = "$ " + Number(setting.value / 100).toFixed(2);
      }

      return setting;
    });
  };

  return (
    <>
      <TitleSection>Configuración</TitleSection>
      <View style={styles.container}>
        <View style={{ flex: "auto", width: "59%", minWidth: "300px" }}>
          <Table
            metadata={setting_metadata}
            data={mapData(state.setting.data)}
            buttons={tableButtons}
          />
        </View>

        <View style={{ flex: "auto", width: "39%" }}>
          {/*<LiterarySubgenreForm
            model={model}
            nameInputRef={nameInputRef}
            onSave={onSaveForm}
          />*/}
        </View>
      </View>

      <RestElements screenState={screenState} screenDispatch={screenDispatch} />
    </>
  );
};

export default Setting;
