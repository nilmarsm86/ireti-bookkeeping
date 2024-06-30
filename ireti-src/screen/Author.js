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
import Table from "../component/Table/Table";
import TitleSection from "../component/TitleSection";
import RestElements from "../component/RestElements";

import { mappingToForm } from "../hook/form";
import { useFindAll, useManageData, useQuery } from "../hook/sqlite";

import { DispatchContext } from "../context/app";

import { onModalOk, applyManageAuthor, onCeateNew } from "../controller/author";

import { screenReducer } from "../reducer/author";
import { Icon, Modal, Portal } from "react-native-paper";
import { onRowDelete } from "../controller/controller";

import AuthorForm from "../form/AuthorForm";
import { author_metadata } from "../config/metadata";
import { onModalClose, onSave } from "../controller/controller";
import { author_mapping } from "../config/mapping";
import { reset } from "../hook/validator";

import styles from "../style/style";

const Author = () => {
  //reducers
  const [state, dispatch, worker] = useContext(DispatchContext);
  const [screenState, screenDispatch] = useReducer(screenReducer, {
    showDismissAlert: false,
    showModalAlert: false,
    dismissMsg: "",
    showLoader: false,
    showModalForm: false,
  });

  const [model, setModel] = useState(author_mapping);
  const nameInputRef = useRef(null);

  const resetForm = () => {
    reset(author_mapping);
    setModel({ ...author_mapping });
  };

  const [provinces, setProvinces] = useState([]);

  useManageData(
    worker,
    applyManageAuthor(dispatch, screenDispatch, resetForm, setProvinces)
  );

  useFindAll(worker, "author", state.author.data.length);
  useQuery(
    worker,
    "allCountries",
    "SELECT * FROM country",
    {},
    state.country.data.length
  );

  useQuery(
    worker,
    "allProvinces",
    "SELECT * FROM province",
    {},
    state.province.data.length
  );

  const onSelectCountryChange = useCallback(
    (value) => {
      const sql =
        "SELECT province.id AS id, province.name AS name FROM province, country WHERE province.country_id = :country_id AND province.country_id = country.id";
      worker.postMessage({
        action: "findProvincesByCountry",
        args: [sql, { country_id: value }],
      });
    },
    [worker]
  );

  //transform data for select (country name to id)
  const fromIdToNameCountry = useCallback(
    (author) => {
      let model = mappingToForm(author_mapping, author);

      const country = state.country.data.find((c) => c.name === author.country);
      //buscar solo las provincias de el pais encontrado
      //me evito la busqueda global de provincias?
      const province = state.province.data.find(
        (p) => p.name === author.province
      );

      let provinceValue = province ? province.id : "";

      setModel({
        ...model,
        country: { ...model.country, value: country.id },
        province: { ...model.province, value: provinceValue },
      });

      onSelectCountryChange(country.id);
    },
    [setModel, state.country.data, state.province.data, onSelectCountryChange]
  );

  //transform province.country_id to name
  const fromIdToNameAuthorCountry = (authors, countries, provinces) => {
    return authors.map((author) => {
      const country = countries.find((c) => c.id === author.country_id);
      const province = provinces.find((p) => p.id === author.province_id);
      if (country) {
        author.country = country.name;
      }

      if (province) {
        author.province = province.name;
      }

      author.sex = (value) => {
        if (value === "m") {
          return <Icon source="human-male" size={20} />;
        }

        if (value === "f") {
          return <Icon source="human-female" size={20} />;
        }
      };

      return author;
    });
  };

  const onSaveForm = useCallback(
    (m) => {
      let data = {
        name: m.name.value.trim(),
        gender: m.gender.value,
        country_id: m.country.value,
      };

      data["province_id"] = m.province.value ? m.province.value : null;

      onSave(
        worker,
        m,
        setModel,
        state.author.data,
        screenDispatch,
        "author",
        data
      );
    },
    [state.author.data, worker]
  );

  const tableButtons = useMemo(() => {
    return {
      edit: {
        icon: "pencil",
        press: (item) => {
          screenDispatch({ type: "SHOW_MODAL_FORM" });
          fromIdToNameCountry(item);
        },
      },
      delete: {
        icon: "delete",
        press: (item) => onRowDelete(screenDispatch, fromIdToNameCountry, item),
      },
    };
  }, [fromIdToNameCountry, screenDispatch]);

  const onSearch = useCallback(
    (value) =>
      state.author.data.filter(
        (item) =>
          value === item.name ||
          value === item.country ||
          value === item.province
      ),
    [state.author.data]
  );

  const createNew = useCallback(
    () => onCeateNew(resetForm, nameInputRef, screenDispatch),
    []
  );

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

  const onDismissModalForm = () => {
    resetForm();
    screenDispatch({ type: "HIDE_MODAL_FORM" });
  };

  return (
    <>
      <TitleSection>Autores</TitleSection>
      <View style={styles.container}>
        <View style={{ flex: "auto" }}>
          <Table
            metadata={author_metadata}
            data={fromIdToNameAuthorCountry(
              state.author.data,
              state.country.data,
              state.province.data
            )}
            buttons={tableButtons}
            onSearch={onSearch}
          />
        </View>
      </View>

      <Portal>
        <Modal
          visible={screenState.showModalForm}
          style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}
          onDismiss={onDismissModalForm}
        >
          <AuthorForm
            model={model}
            nameInputRef={nameInputRef}
            onSave={onSaveForm}
            countries={state.country.data}
            provinces={provinces}
            onDismissModal={onDismissModalForm}
            onSelectCountryChange={onSelectCountryChange}
          />
        </Modal>
      </Portal>

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

export default Author;
