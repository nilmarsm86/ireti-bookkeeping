import { useCallback, useContext, useMemo, useReducer, useState } from "react";
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
import SettingForm from "../form/SettingForm";
import Alert from "../import/Dialog/Alert";
import { Text } from "react-native-paper";

const Setting = () => {
  //reducers
  const [state, dispatch, worker] = useContext(DispatchContext);
  const [screenState, screenDispatch] = useReducer(screenReducer, {
    showDismissAlert: false,
    showModalAlert: false,
    dismissMsg: "",
    showLoader: false,
    showModificationAlert: false,
  });

  const [model, setModel] = useState(setting_mapping);

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
    if (
      item.key === "number_books_purchased" ||
      item.key === "number_books_sold"
    ) {
      screenDispatch({ type: "SHOW_MODIFICATION_ALERT" });
      return;
    }

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
        setting.label = "* Cantidad de libros comprados";
        setting.valueTransform = setting.value;
      }

      if (setting.key === "number_books_sold") {
        setting.label = "* Cantidad de libros vendidos";
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

          <Text variant="bodySmall" style={{ marginTop: 20 }}>
            * Valores de configuración no modificables.
          </Text>
        </View>

        <View style={{ flex: "auto", width: "39%" }}>
          <SettingForm model={model} onSave={onSaveForm} />
        </View>
      </View>

      <Alert
        title="Alerta"
        label="Esta configuración no es modificable."
        visible={screenState.showModificationAlert}
        button={{
          label: "Aceptar",
          press: () => screenDispatch({ type: "HIDE_MODIFICATION_ALERT" }),
        }}
      />
    </>
  );
};

export default Setting;
