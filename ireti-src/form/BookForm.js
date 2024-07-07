import { useEffect, useState } from "react";
import Form from "../import/Form/Form";
import Confirm from "../import/Dialog";
import Input from "../import/Form/Input";
import Select from "../import/Form/Select";
import { useDataField } from "../hook/form";
import PriceInput from "../import/Form/PriceInput";
import { ScrollView, View } from "react-native";
import styles from "../style/style";
import { List, TextInput } from "react-native-paper";
import ManageableList from "../import/Form/ManageableList/ManageableList";
import Alert from "../import/Dialog/Alert";
import DialogCheckGroup from "../import/Form/DialogCheckGroup";

const BookForm = ({
  model,
  titleInputRef,
  onSave,
  literarysSubgenres,
  publishings,
  onDismissModal,
  onListDelete,
  worker,
  writers,
}) => {
  const [showAlertDeleteAuthor, setShowAlertDeleteAuthor] = useState(false);
  const [showConfirmDeleteAuthor, setShowConfirmDeleteAuthor] = useState(false);
  const [showDialogAddAuthor, setshowDialogAddAuthor] = useState(false);
  const [authorToManage, setAuthorToManage] = useState(null);
  const [writersToManage, setWritersToManage] = useState([]);

  const [title, setTitle] = useDataField(model.title.value);
  const [editionYear, setEditionYear] = useDataField(model.editionYear.value);
  const [editionNumber, setEditionNumber] = useDataField(
    model.editionNumber.value
  );
  const [acquisitionPrice, setAcquisitionPrice] = useDataField(
    model.acquisitionPrice.value
  );
  const [transportPrice, setTransportPrice] = useDataField(
    model.transportPrice.value
  );
  const [marketingMegas, setMarketingMegas] = useDataField(
    model.marketingMegas.value
  );
  const [difficultPrice, setDifficultPrice] = useDataField(
    model.difficultPrice.value
  );
  const [amount, setAmount] = useDataField(model.amount.value);
  const [literarySubgenre, setLiterarySubgenre] = useDataField(
    model.literarySubgenre.value
  );
  const [publishing, setPublishing] = useDataField(model.publishing.value);
  const [authors, setAuthors] = useDataField(model?.authors?.value);

  useEffect(() => {
    setTitle(model.title.value);
    setEditionYear(model.editionYear.value);
    setEditionNumber(model.editionNumber.value);
    setAcquisitionPrice(model.acquisitionPrice.value);
    setTransportPrice(model.transportPrice.value);
    setMarketingMegas(model.marketingMegas.value);
    setDifficultPrice(model.difficultPrice.value);
    setAmount(model.amount.value);
    setLiterarySubgenre(model.literarySubgenre.value);
    setPublishing(model.publishing.value);
    setAuthors(model.authors.value);

    /*if (model.id.value === null) {
      setEditionNumber(1);
      setAmount(1);

      setAcquisitionPrice("0.00");
      setTransportPrice("70.00");
      setDifficultPrice("0.00");
      setMarketingMegas("0");
    }*/
  }, [
    model,
    setTitle,
    setEditionYear,
    setEditionNumber,
    setAcquisitionPrice,
    setTransportPrice,
    setMarketingMegas,
    setDifficultPrice,
    setAmount,
    setLiterarySubgenre,
    setPublishing,
    setAuthors,
  ]);

  const onFormSend = () => {
    const newModel = {
      ...model,
      title: { ...model.title, value: title },
      editionYear: { ...model.editionYear, value: editionYear },
      editionNumber: { ...model.editionNumber, value: editionNumber },
      acquisitionPrice: { ...model.acquisitionPrice, value: acquisitionPrice },
      transportPrice: { ...model.transportPrice, value: transportPrice },
      marketingMegas: { ...model.marketingMegas, value: marketingMegas },
      difficultPrice: { ...model.difficultPrice, value: difficultPrice },
      amount: { ...model.amount, value: amount },
      literarySubgenre: { ...model.literarySubgenre, value: literarySubgenre },
      publishing: { ...model.publishing, value: publishing },
      authors: { ...model.authors, value: authors },
    };

    onSave(newModel);
  };

  function mapped(data) {
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  const years = [];
  for (let i = 2024; i >= 1800; i--) {
    years.push({ label: i, value: i });
  }

  const editions = [];
  for (let i = 1; i <= 10; i++) {
    editions.push({ label: i, value: i });
  }

  const amounts = [];
  for (let i = 0; i <= 10; i++) {
    amounts.push({ label: String(i), value: Number(i) });
  }

  function mapped2(data) {
    return data.map((item) => ({
      label: item.name + " (" + item.country + ")",
      value: item,
    }));
  }

  function filterWriters(writers, authors) {
    let options = writers.filter((item) =>
      authors.every((author) => item.id !== author.id)
    );

    return options.map((item) => {
      item.label = item.name + " (" + item.country + ")";
      item.value = item;
      return item;
    });
  }

  return (
    <>
      <Form
        title="Datos del libro:"
        buttons={{
          save: {
            label: "Salvar",
            press: onFormSend,
            icon: "content-save",
          },
          cancel: {
            label: "Cancelar",
            press: onDismissModal,
            icon: "close",
          },
        }}
      >
        <ScrollView style={{ height: 500 }}>
          <Input
            label="Título"
            icon="pencil"
            error={model.title.error}
            value={title}
            onChangeText={setTitle}
            reference={titleInputRef}
            style={{ marginBottom: 10 }}
          />
          <View
            style={{ ...styles.container, columnGap: 15, marginBottom: 10 }}
          >
            <View style={{ flex: "auto", width: "45%", gap: 10 }}>
              <Select
                label="Año de edición"
                data={years}
                error={model.editionYear.error}
                value={editionYear}
                onChangeText={setEditionYear}
              />

              <Select
                label="Edición"
                data={editions}
                error={model.editionNumber.error}
                value={editionNumber}
                onChangeText={setEditionNumber}
              />

              <Select
                label="Cantidad"
                data={amounts}
                error={model.amount.error}
                value={amount}
                onChangeText={setAmount}
              />

              <Select
                label="Géneros literarios"
                data={mapped(literarysSubgenres)}
                error={model.literarySubgenre.error}
                value={literarySubgenre}
                onChangeText={setLiterarySubgenre}
              />

              <Select
                label="Editoriales"
                data={mapped(publishings)}
                error={model.publishing.error}
                value={publishing}
                onChangeText={setPublishing}
              />
            </View>

            <View style={{ flex: "auto", width: "45%", gap: 10 }}>
              <Input
                label="Megas en marketing"
                icon="wifi"
                error={model.marketingMegas.error}
                value={marketingMegas}
                onChangeText={setMarketingMegas}
                right={<TextInput.Affix text="Mb" />}
              />

              <PriceInput
                label="Precio de adquisición"
                error={model.acquisitionPrice.error}
                value={acquisitionPrice}
                onChangeText={setAcquisitionPrice}
              />

              <PriceInput
                label="Precio de transportación"
                error={model.transportPrice.error}
                value={transportPrice}
                onChangeText={setTransportPrice}
              />

              <PriceInput
                label="Precio de dificultad"
                error={model.difficultPrice.error}
                value={difficultPrice}
                onChangeText={setDifficultPrice}
              />
            </View>
          </View>

          <ManageableList
            label="Autores"
            buttons={{
              add: {
                label: "Agregar autor",
                icon: "plus",
                press: () => {
                  setAuthorToManage(null);
                  setWritersToManage([]);
                  setshowDialogAddAuthor(true);
                },
              },
            }}
            values={mapped2(authors)}
            action={(value) => {
              if (authors.length <= 1) {
                setShowAlertDeleteAuthor(true);
              } else {
                if (value.author_id) {
                  setAuthorToManage(value);
                  setShowConfirmDeleteAuthor(true);
                } else {
                  let removeData = [...authors].filter(
                    (item) => value.id !== item.id
                  );
                  setAuthors(removeData);
                }
              }
            }}
            error={model.authors.error}
            icon={<List.Icon icon="human-male" color={null} />}
            actionIcon={<List.Icon icon="close" color="red" />}
          />
        </ScrollView>

        <DialogCheckGroup
          label="Autores"
          data={filterWriters(writers, authors)}
          value={writersToManage}
          onChange={setWritersToManage}
          visible={showDialogAddAuthor}
          setVisible={setshowDialogAddAuthor}
          buttons={{
            cancel: {
              label: "Cancelar",
              press: () => {
                setshowDialogAddAuthor(false);
                setWritersToManage([]);
              },
            },
            save: {
              label: "Salvar",
              press: () => {
                if (filterWriters(writers, authors).length > 0) {
                  setAuthors([...authors, ...writersToManage]);
                }
                setshowDialogAddAuthor(false);
                setWritersToManage([]);
              },
            },
          }}
        />

        <Alert
          title="Alerta"
          label="Un libro debe tener al menos un autor."
          visible={showAlertDeleteAuthor}
          button={{
            label: "Aceptar",
            press: () => setShowAlertDeleteAuthor(false),
          }}
        />
      </Form>

      <Confirm
        title="Borrar registro"
        label="Está seguro que desea borrar el registro?"
        visible={showConfirmDeleteAuthor}
        onDismiss={() => setShowConfirmDeleteAuthor(false)}
        buttons={{
          cancel: {
            label: "No",
            press: () => setShowConfirmDeleteAuthor(false),
          },
          ok: {
            label: "Si",
            press: () => {
              onListDelete(authorToManage, worker);
              setShowConfirmDeleteAuthor(false);
            },
          },
        }}
      />
    </>
  );
};
export default BookForm;
