import {
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { View } from "react-native";
//components
import Table from "../import/Table/Table";
import TitleSection from "../component/TitleSection";

import { useManageData, useFindAll } from "../hook/sqlite";
import { reset } from "../hook/validator";

import { DispatchContext } from "../context/app";

import {
  onModalOk,
  applyManagePublishing,
  onCeateNew,
} from "../controller/publishing";
import { onModalClose, onSave, onRowDelete } from "../controller/controller";

import { screenReducer } from "../reducer/publishing";

import PublishingForm from "../form/PublishingForm";

import { publishing_metadata } from "../config/metadata";
import { publishing_mapping } from "../config/mapping";
import RestElements from "../component/RestElements";
import styles from "../style/style";
import { mappingToForm } from "../hook/form";

const Publishing = () => {
  //reducers
  const [state, dispatch, worker] = useContext(DispatchContext);
  const [screenState, screenDispatch] = useReducer(screenReducer, {
    showDismissAlert: false,
    showModalAlert: false,
    dismissMsg: "",
    showLoader: false,
  });

  const [model, setModel] = useState(publishing_mapping);
  const nameInputRef = useRef(null);

  const resetForm = () => {
    reset(publishing_mapping);
    setModel({ ...publishing_mapping });
  };

  useManageData(
    worker,
    applyManagePublishing(dispatch, screenDispatch, resetForm)
  );

  useFindAll(worker, "publishing", state.publishing.data.length);

  const onSaveForm = useCallback(
    (m) => {
      onSave(
        worker,
        m,
        setModel,
        state.publishing.data,
        screenDispatch,
        "publishing",
        { name: m.name.value.trim() }
      );
    },
    [state.publishing.data, worker]
  );

  const dbToForm = useCallback((item) => {
    let m = mappingToForm(publishing_mapping, item);
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
    (value) => state.publishing.data.filter((item) => value === item.name),
    [state.publishing.data]
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
      <TitleSection>Editoriales</TitleSection>
      <View style={styles.container}>
        <View style={{ flex: "auto", width: "59%", minWidth: "300px" }}>
          <Table
            metadata={publishing_metadata}
            data={state.publishing.data}
            buttons={tableButtons}
            onSearch={onSearch}
          />
        </View>
        <View style={{ flex: "auto", width: "39%" }}>
          <PublishingForm
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

export default Publishing;
