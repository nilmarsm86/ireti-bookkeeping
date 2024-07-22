import { DispatchContext } from "../context/app";
import {
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { screenReducer } from "../reducer/book";
import { book_mapping } from "../config/mapping";
import { reset } from "../hook/validator";
import { useFindAll, useManageData, useQuery } from "../hook/sqlite";
import {
  applyManageBook,
  formatPriceToCents,
  formatPriceFromCents,
  onCreateNew,
  onModalOk,
  findAutorsBook,
  onListDelete,
  findAuthors,
} from "../controller/book";
import { mappingToForm } from "../hook/form";
import { onModalClose, onRowDelete } from "../controller/controller";
import TitleSection from "../component/TitleSection";
import { View } from "react-native";
import styles from "../style/style";
import Table from "../import/Table/Table";
import { book_metadata } from "../config/metadata";
import RestElements from "../component/RestElements";
import { Modal, Portal } from "react-native-paper";
import BookForm from "../form/BookForm";
import { onSave } from "../controller/book";
import BookDetail from "../component/BookDetail";
import Alert from "../import/Dialog/Alert";

const Book = () => {
  //reducers
  const [state, dispatch, worker] = useContext(DispatchContext);
  const [screenState, screenDispatch] = useReducer(screenReducer, {
    showDismissAlert: false,
    showModalAlert: false,
    dismissMsg: "",
    showLoader: false,
    showModalForm: false,
    showDetail: false,
    showExistenceAlert: false,
    alertMsg: "",
  });

  console.log(state.book.data);

  const [model, setModel] = useState(book_mapping);
  const titleInputRef = useRef(null);
  const [writers, setWriters] = useState([]);

  const resetForm = () => {
    reset(book_mapping);
    setModel({ ...book_mapping });
  };

  useManageData(
    worker,
    applyManageBook(
      worker,
      dispatch,
      screenDispatch,
      resetForm,
      setModel,
      model,
      setWriters
    )
  );
  useFindAll(worker, "book", state.book.data.length);
  //buscar solo al mostrar el formulario?
  useQuery(
    worker,
    "allPublishings",
    "SELECT * FROM publishing",
    {},
    state.publishing.data.length
  );

  //buscar solo al mostrar el formulario?
  useQuery(
    worker,
    "allLiterarySubgenre",
    "SELECT * FROM literary_subgenre",
    {},
    state.literary_subgenre.data.length
  );

  useQuery(
    worker,
    "allSetting",
    "SELECT * FROM setting",
    {},
    state.setting.data.length
  );

  const tableActions = useCallback(
    (book) => {
      let model = mappingToForm(book_mapping, book);

      const literarySubgenre = state.literary_subgenre.data.find(
        (ls) => ls.name === book.literarySubgenre
      );
      const publishing = state.publishing.data.find(
        (p) => p.name === book.publishing
      );

      setModel({
        ...model,
        literarySubgenre: {
          ...model.literarySubgenre,
          value: literarySubgenre.id,
        },
        publishing: { ...model.publishing, value: publishing.id },
        editionYear: { ...model.editionYear, value: book.edition_year },
        editionNumber: { ...model.editionNumber, value: book.edition_number },
        marketingMegas: {
          ...model.marketingMegas,
          value: book.marketing_megas,
        },
        acquisitionPrice: {
          ...model.acquisitionPrice,
          value: Number(book.acquisition_price / 100).toFixed(2),
        },
        transportPrice: {
          ...model.acquisitionPrice,
          value: Number(book.transport_price / 100).toFixed(2),
        },
        difficultPrice: {
          ...model.difficultPrice,
          value: Number(book.difficult_price / 100).toFixed(2),
        },
      });

      findAutorsBook(worker, book.id);
    },
    [setModel, state.literary_subgenre.data, state.publishing.data, worker]
  );

  const tableActionsDetail = useCallback(
    (book) => {
      let model = mappingToForm(book_mapping, book);

      const literarySubgenre = state.literary_subgenre.data.find(
        (ls) => ls.name === book.literarySubgenre
      );
      const publishing = state.publishing.data.find(
        (p) => p.name === book.publishing
      );

      setModel({
        ...model,
        literarySubgenre: {
          ...model.literarySubgenre,
          value: literarySubgenre.name,
        },
        publishing: { ...model.publishing, value: publishing.name },
        editionYear: { ...model.editionYear, value: book.edition_year },
        editionNumber: { ...model.editionNumber, value: book.edition_number },
        marketingMegas: {
          ...model.marketingMegas,
          value: book.marketing_megas,
        },
        marketingPrice: {
          ...model.marketingPrice,
          value: Number(book.marketing_price / 100).toFixed(2),
        },
        acquisitionPrice: {
          ...model.acquisitionPrice,
          value: Number(book.acquisition_price / 100).toFixed(2),
        },
        transportPrice: {
          ...model.transportPrice,
          value: Number(book.transport_price / 100).toFixed(2),
        },
        difficultPrice: {
          ...model.difficultPrice,
          value: Number(book.difficult_price / 100).toFixed(2),
        },
      });

      findAutorsBook(worker, book.id);
    },
    [setModel, state.literary_subgenre.data, state.publishing.data, worker]
  );

  //transform province.country_id to name
  const dataForTable = (books, literary_subgenres, publishings) => {
    return books.map((book) => {
      const literarySubgenre = literary_subgenres.find(
        (ls) => ls.id === book.literary_subgenre_id
      );
      if (literarySubgenre) {
        book.literarySubgenre = literarySubgenre.name;
      }

      const publishing = publishings.find((p) => p.id === book.publishing_id);
      if (publishing) {
        book.publishing = publishing.name;
      }

      book.fullTitle = book.title + " ";
      book.acquisitionPrice = formatPriceFromCents(book.acquisition_price);
      book.transportPrice = formatPriceFromCents(book.transport_price);
      book.difficultPrice = formatPriceFromCents(book.difficult_price);
      return book;
    });
  };

  const onSaveForm = useCallback(
    (m) => {
      const megasToMoneySetting = state.setting.data.find(
        (s) => s.key === "megas_to_money"
      );

      let data = {
        title: m.title.value.trim(),
        tag: String(m.title.value.trim()).toLowerCase().replace(/ /g, "-"),
        edition_year: m.editionYear.value,
        edition_number: m.editionNumber.value,
        acquisition_price: formatPriceToCents(m.acquisitionPrice.value),
        transport_price: formatPriceToCents(m.transportPrice.value),
        marketing_megas: Number(m.marketingMegas.value),
        marketing_price:
          Number(m.marketingMegas.value) * Number(megasToMoneySetting.value),
        difficult_price: formatPriceToCents(m.difficultPrice.value),
        amount: Number(m.amount.value),
        literary_subgenre_id: m.literarySubgenre.value,
        publishing_id: m.publishing.value,
      };

      onSave(
        worker,
        m,
        setModel,
        state.book.data,
        screenDispatch,
        "book",
        data,
        state.setting.data
      );
    },
    [state.book.data, worker, state.setting.data]
  );

  const onSearch = useCallback(
    (value) =>
      state.book.data.filter(
        (item) =>
          value === item.title ||
          value === item.edition_year ||
          Number(value) * 100 >= Number(item.acquisition_price) ||
          //value === item.transportPrice ||
          //value === item.marketingMegas ||
          //value === item.dificultPrice ||
          value === item.literarySubgenre ||
          value === item.publishing
      ),
    [state.book.data]
  );

  const createNew = useCallback(() => {
    /*const transportPriceSetting = state.setting.data.find(
      (s) => s.key === "transport_price"
    );*/

    /*setModel({
      ...model,
      transportPrice: {
        ...model.transportPrice,
        value: Number(transportPriceSetting.value / 100).toFixed(2), //el valor del setting de transporte
      },
    });*/

    onCreateNew(resetForm, titleInputRef, screenDispatch);
    findAuthors(worker);
  }, [worker, state.setting.data]);

  /*************************************Dissmis**********************/

  const onDissmisDialog = useCallback(
    () => onModalClose(resetForm, screenDispatch),
    []
  );

  const onDismissModalForm = useCallback(() => {
    resetForm();
    screenDispatch({ type: "HIDE_MODAL_FORM" });
  }, []);

  /*************************************BUTTONS**********************/

  const tableButtons = useMemo(() => {
    return {
      detail: {
        icon: "file-document",
        press: (item) => {
          findAuthors(worker);
          tableActionsDetail(item);
          screenDispatch({ type: "SHOW_MODAL_DETAIL_AUTHOR" });
          //console.log(item);
        },
      },
      edit: {
        icon: "pencil",
        press: (item) => {
          screenDispatch({ type: "SHOW_MODAL_FORM" });
          findAuthors(worker);
          tableActions(item);
        },
      },
      delete: {
        icon: "delete",
        press: (item) => onRowDelete(screenDispatch, tableActions, item),
      },
    };
  }, [tableActions, screenDispatch, worker, tableActionsDetail]);

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
      <TitleSection>Libros</TitleSection>
      <View style={styles.container}>
        <View style={{ flex: "auto" }}>
          <Table
            metadata={book_metadata}
            data={dataForTable(
              state.book.data,
              state.literary_subgenre.data,
              state.publishing.data
            )}
            buttons={tableButtons}
            onSearch={onSearch}
          />
        </View>
      </View>
      {
        <Portal>
          <Modal
            visible={screenState.showModalForm}
            style={{
              width: "70%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            onDismiss={onDismissModalForm}
          >
            <BookForm
              model={model}
              titleInputRef={titleInputRef}
              onSave={onSaveForm}
              literarysSubgenres={state.literary_subgenre.data}
              publishings={state.publishing.data}
              onDismissModal={onDismissModalForm}
              onListDelete={onListDelete}
              worker={worker}
              writers={writers}
              settings={state.setting.data}
            />
          </Modal>
        </Portal>
      }
      <RestElements
        createNew={createNew}
        screenState={screenState}
        screenDispatch={screenDispatch}
        dialogTitle="Borrar registro"
        dialogLabel="Está seguro que desea borrar el registro?"
        onDissmisDialog={onDissmisDialog}
        dialogButtons={dialogButtons}
      />

      {screenState.showDetail && (
        <BookDetail
          book={model}
          visible={screenState.showDetail}
          setVisible={screenDispatch}
          settings={state.setting.data}
        />
      )}

      <Alert
        title="Alerta"
        label={screenState.alertMsg}
        visible={screenState.showExistenceAlert}
        button={{
          label: "Aceptar",
          press: () => screenDispatch({ type: "HIDE_ALERT" }),
        }}
      />
    </>
  );
};

export default Book;
