import {
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";
//components
import Table from "../component/Table/Table";
import TitleSection from "../component/TitleSection";

import { useManageData, useFindAll } from "../hook/sqlite";
import { reset } from "../hook/validator";

import { DispatchContext } from "../context/app";

import {
  onModalOk,
  applyManageSubgenre,
  onCeateNew,
} from "../controller/literary_subgenre";
import { onModalClose, onSave, onRowDelete } from "../controller/controller";

import { screenReducer } from "../reducer/literary_subgenre";

import LiterarySubgenreForm from "../form/LiterarySubgenreForm";

import { literary_subgenre_metadata } from "../config/metadata";
import { literary_subgenre_mapping } from "../config/mapping";
import RestElements from "../component/RestElements";

const LiterarySubgenre = () => {
  //reducers
  const [state, dispatch, worker] = useContext(DispatchContext);
  const [screenState, screenDispatch] = useReducer(screenReducer, {
    showDismissAlert: false,
    showModalAlert: false,
    dismissMsg: "",
    showLoader: false,
  });

  const [model, setModel] = useState(literary_subgenre_mapping);
  const nameInputRef = useRef(null);

  const resetForm = () => {
    reset(literary_subgenre_mapping);
    setModel({ ...literary_subgenre_mapping });
  };

  useManageData(
    worker,
    applyManageSubgenre(dispatch, screenDispatch, resetForm)
  );

  useFindAll(worker, "literary_subgenre", state.literary_subgenre.data.length);

  const onSaveForm = (m) => {
    onSave(
      worker,
      m,
      setModel,
      state.literary_subgenre.data,
      screenDispatch,
      "literary_subgenre",
      { name: m.name.value, num: Number(m.num.value) }
    );
  };

  const dbToForm = useCallback((item) => {
    let m = { ...literary_subgenre_mapping };
    for (const [key, value] of Object.entries(item)) {
      m[key] = { ...m[key], value: value };
    }
    setModel(m);
  }, []);

  const tableButtons = useMemo(() => {
    return {
      edit: { icon: "pencil", press: dbToForm },
      delete: {
        icon: "delete",
        press: (item) => onRowDelete(screenDispatch, dbToForm, item),
      },
    };
  }, [dbToForm]);

  const onSearch = useCallback(
    (value) => {
      return state.literary_subgenre.data.filter(
        (item) => value === item.name || Number(value) === Number(item.num)
      );
    },
    [state.literary_subgenre.data]
  );

  const createNew = useCallback(() => onCeateNew(resetForm, nameInputRef), []);

  const onDissmisDialog = useCallback(
    () => onModalClose(resetForm, screenDispatch),
    []
  );

  const dialogButtons = useMemo(() => {
    return {
      cancel: {
        label: "No",
        press: () => onModalClose(resetForm, screenDispatch),
      },
      ok: {
        label: "Si",
        press: () =>
          onModalOk(worker, model.id.value, resetForm, screenDispatch),
      },
    };
  }, [model.id.value, worker]);

  return (
    <>
      <TitleSection>Géneros literarios</TitleSection>
      <View style={styles.container}>
        <View style={{ flex: "auto", width: "59%", minWidth: "300px" }}>
          <Table
            metadata={literary_subgenre_metadata}
            data={state.literary_subgenre.data}
            buttons={tableButtons}
            onSearch={onSearch}
          />
        </View>
        <View style={{ flex: "auto", width: "39%" }}>
          <LiterarySubgenreForm
            model={model}
            nameInputRef={nameInputRef}
            onSave={onSaveForm}
          />
        </View>
      </View>

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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 10,
  },
});

export default LiterarySubgenre;
