import { DispatchContext } from "../context/app";
import {
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { screenReducer } from "../reducer/author";
import { book_mapping } from "../config/mapping";
import { reset } from "../hook/validator";
import { useFindAll, useManageData, useQuery } from "../hook/sqlite";
import {
  applyManageBook,
  formatPriceToCents,
  formatPriceFromCents,
  onCeateNew,
  onModalOk,
} from "../controller/book";
import { mappingToForm } from "../hook/form";
import { onModalClose, onRowDelete } from "../controller/controller";
import TitleSection from "../component/TitleSection";
import { View } from "react-native";
import styles from "../style/style";
import Table from "../component/Table/Table";
import { book_metadata } from "../config/metadata";
import RestElements from "../component/RestElements";
import { Modal, Portal } from "react-native-paper";
import BookForm from "../form/BookForm";
import { onSave } from "../controller/book";

const Book = () => {
  //reducers
  const [state, dispatch, worker] = useContext(DispatchContext);
  const [screenState, screenDispatch] = useReducer(screenReducer, {
    showDismissAlert: false,
    showModalAlert: false,
    dismissMsg: "",
    showLoader: false,
    showModalForm: false,
  });

  const [model, setModel] = useState(book_mapping);
  const titleInputRef = useRef(null);

  const resetForm = () => {
    reset(book_mapping);
    setModel({ ...book_mapping });
  };

  useManageData(worker, applyManageBook(dispatch, screenDispatch, resetForm));
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
    },
    [setModel, state.literary_subgenre.data, state.publishing.data]
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
      //book.fullTitle = <Badge>{book.amount}</Badge>;

      book.acquisitionPrice = formatPriceFromCents(book.acquisition_price);
      book.transportPrice = formatPriceFromCents(book.transport_price);
      book.difficultPrice = formatPriceFromCents(book.difficult_price);

      return book;
    });
  };

  const onSaveForm = useCallback(
    (m) => {
      let data = {
        title: m.title.value.trim(),
        tag: String(m.title.value.trim()).toLowerCase().replace(/ /g, "-"),
        edition_year: m.editionYear.value,
        edition_number: m.editionNumber.value,
        acquisition_price: formatPriceToCents(m.acquisitionPrice.value),
        transport_price: formatPriceToCents(m.transportPrice.value),
        marketing_megas: Number(m.marketingMegas.value),
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
        data
      );
    },
    [state.book.data, worker]
  );

  const tableButtons = useMemo(() => {
    return {
      detail: {
        icon: "file-document",
        press: (item) => {
          //mostrar detalle del libro en un modal
          alert("Que hacer para mostrar el detalle");
        },
      },
      edit: {
        icon: "pencil",
        press: (item) => {
          screenDispatch({ type: "SHOW_MODAL_FORM" });
          tableActions(item);
        },
      },
      delete: {
        icon: "delete",
        press: (item) => onRowDelete(screenDispatch, tableActions, item),
      },
    };
  }, [tableActions, screenDispatch]);

  const onSearch = useCallback(
    (value) => {
      return state.book.data.filter((item) => {
        return (
          value === item.title ||
          value === item.edition_year ||
          Number(value) * 100 >= Number(item.acquisition_price) ||
          //value === item.transportPrice ||
          //value === item.marketingMegas ||
          //value === item.dificultPrice ||
          value === item.literarySubgenre ||
          value === item.publishing
        );
      });
    },
    [state.book.data]
  );

  const createNew = useCallback(
    () => onCeateNew(resetForm, titleInputRef, screenDispatch),
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
              /*height: "50%",
              marginTop: "auto",
              marginBottom: "auto",*/
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
    </>
  );
};

export default Book;
