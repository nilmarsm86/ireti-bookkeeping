import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
//components
import Table from "../component/Table/Table";
import Form from "../component/Form/Form";
import Input from "../component/Form/Input";
import DismissAlert from "../component/DismissAlert";
import Dialog from "../component/Dialog";

import { useNativeFormModel } from "../hook/form";
import { useFetchData, useFindAll } from "../hook/sqlite";

import { DispatchContext } from "../context/app";

import {
  onSave,
  onModalClose,
  onModalOk,
  applyManageAuthor,
  onCeateNew,
} from "../controller/author";

import { screenReducer } from "../reducer/author";
import Loader from "../component/Loader";
import { FAB } from "react-native-paper";
import Select from "../component/Form/Select";
import RadioGroup from "../component/Form/RadioGroup";
import { onRowDelete } from "../controller/screen";
import TitleSection from "../component/TitleSection";
import AuthorForm from "../form/AuthorForm";

const Author = () => {
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
    gender: "",
    country: "",
    province: "",
  };

  const resetForm = () => {
    setNewAuthorData({ ...initialData });
  };

  const nameInputRef = useRef(null);

  const [provinces, setProvinces] = useState([]);
  const [disabledProvinces, setDisabledProvinces] = useState(true);
  const sex = [
    { label: "Femenino", value: "f" },
    { label: "Masculino", value: "m" },
  ];

  useFetchData(
    worker,
    applyManageAuthor(
      worker,
      dispatch,
      screenDispatch,
      resetForm,
      setProvinces,
      setDisabledProvinces
    )
  );
  useFindAll(worker, "allCountries", "country", state.country.data.length);

  const metadata = [
    {
      name: "id",
      title: "ID",
      show: false,
      sortDirection: "descending",
      numeric: false,
    },
    {
      name: "name",
      title: "Nombre",
      show: true,
      sortDirection: "",
      numeric: false,
    },
    {
      name: "gender",
      title: "Género",
      show: true,
      sortDirection: "",
      numeric: false,
    },
    {
      name: "country",
      title: "País",
      show: true,
      sortDirection: "",
      numeric: false,
    },
    {
      name: "province",
      title: "Provincia",
      show: true,
      sortDirection: "",
      numeric: false,
    },
  ];

  const [authorAttr, newAuthorData, setNewAuthorData, error, setError] =
    useNativeFormModel({ ...initialData });

  const findProvinces = (value) => {
    authorAttr.country.onChangeText(value);
    const sql =
      "SELECT province.id AS id, province.name AS name FROM province, country WHERE province.country_id = :country_id AND province.country_id = country.id";
    worker.postMessage({
      action: "findProvincesByCountry",
      args: [sql, { country_id: value }],
    });
  };

  const onSaveForm = () => {
    onSave(authorAttr, setError, worker, state.author.data, screenDispatch);
  };

  return (
    <>
      <TitleSection>Autores</TitleSection>
      <View style={styles.container}>
        <View style={{ flex: "auto", width: "59%", minWidth: "300px" }}>
          <Table
            metadata={metadata}
            data={[...state.author.data]}
            buttons={{
              edit: { icon: "pencil", press: setNewAuthorData },
              delete: {
                icon: "delete",
                press: (item) =>
                  onRowDelete(screenDispatch, setNewAuthorData, item),
              },
            }}
          />
        </View>
        {/*TODO: poner el formulario en un modal*/}
        <View style={{ flex: "auto", width: "39%" }}>
          <AuthorForm
            authorAttr={authorAttr}
            error={error}
            nameInputRef={nameInputRef}
            onSaveForm={onSaveForm}
            sex={sex}
            countries={state.country.data}
            provinces={provinces}
            findProvinces={findProvinces}
            disabledProvinces={disabledProvinces}
          ></AuthorForm>
        </View>
      </View>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => onCeateNew(resetForm, nameInputRef)}
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
              onModalOk(worker, newAuthorData, resetForm, screenDispatch),
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

export default Author;
