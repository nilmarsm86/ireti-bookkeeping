import { useContext, useReducer, useRef } from "react";
import { StyleSheet, View } from "react-native";
//components
import Table from "../component/Table/Table";
import DismissAlert from "../component/DismissAlert";
import Dialog from "../component/Dialog";

import { useNativeFormModel } from "../hook/form";
import { useFetchData, useFindAll } from "../hook/sqlite";

import { DispatchContext } from "../context/app";

import {
  onSave,
  onModalClose,
  onModalOk,
  applyManageSubgenre,
  onCeateNew,
} from "../controller/literary_subgenre";

import { screenReducer } from "../reducer/literary_subgenre";
import Loader from "../component/Loader";
import { FAB } from "react-native-paper";
import { onRowDelete } from "../controller/screen";
import TitleSection from "../component/TitleSection";
import LiterarySubgenreForm from "../form/LiterarySubgenreForm";
import { literary_subgenre_metadata } from "../config/metadata";

const LiterarySubgenre = () => {
  //reducers
  const [state, dispatch, worker] = useContext(DispatchContext);
  const [screenState, screenDispatch] = useReducer(screenReducer, {
    showDismissAlert: false,
    showModalAlert: false,
    dismissMsg: "",
    showLoader: false,
  });

  const initialData = {
    id: null,
    name: "",
    num: "",
  };

  const resetForm = () => {
    setNewGenreData({ ...initialData });
  };

  const nameInputRef = useRef(null);

  useFetchData(
    worker,
    applyManageSubgenre(dispatch, screenDispatch, resetForm)
  );
  useFindAll(
    worker,
    "allSubgenre",
    "literary_subgenre",
    state.literary_subgenre.data.length
  );

  const [genreAttr, newGenreData, setNewGenreData, error, setError] =
    useNativeFormModel({ ...initialData });

  const onSaveForm = () => {
    onSave(
      genreAttr,
      setError,
      worker,
      state.literary_subgenre.data,
      screenDispatch
    );
  };

  return (
    <>
      <TitleSection>Géneros literarios</TitleSection>
      <View style={styles.container}>
        <View style={{ flex: "auto", width: "59%", minWidth: "300px" }}>
          <Table
            metadata={literary_subgenre_metadata}
            data={[...state.literary_subgenre.data]}
            buttons={{
              edit: { icon: "pencil", press: setNewGenreData },
              delete: {
                icon: "delete",
                press: (item) =>
                  onRowDelete(screenDispatch, setNewGenreData, item),
              },
            }}
          />
        </View>
        <View style={{ flex: "auto", width: "39%" }}>
          <LiterarySubgenreForm
            genreAttr={genreAttr}
            error={error}
            nameInputRef={nameInputRef}
            onSaveForm={onSaveForm}
          />
        </View>
      </View>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => onCeateNew(resetForm, nameInputRef, setError)}
      />

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
          ok: {
            label: "Si",
            press: () =>
              onModalOk(worker, newGenreData, resetForm, screenDispatch),
          },
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

export default LiterarySubgenre;
