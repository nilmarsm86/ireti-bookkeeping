import { useEffect } from "react";
import Form from "../component/Form/Form";
import Input from "../component/Form/Input";
import Select from "../component/Form/Select";
import { useDataField } from "../hook/form";
import PriceInput from "../component/Form/PriceInput";
import { View } from "react-native";
import styles from "../style/style";
import { TextInput } from "react-native-paper";

const BookForm = ({
  model,
  titleInputRef,
  onSave,
  literarysSubgenres,
  publishings,
  onDismissModal,
}) => {
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

    if (model.id.value === null) {
      setEditionNumber(1);
      setAmount(1);

      setAcquisitionPrice("0.00");
      setTransportPrice("0.00");
      setDifficultPrice("0.00");
      setMarketingMegas("0");
    }
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
  for (let i = 1; i <= 10; i++) {
    amounts.push({ label: i, value: i });
  }

  return (
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
      <Input
        label="Título"
        icon="pencil"
        error={model.title.error}
        value={title}
        onChangeText={setTitle}
        reference={titleInputRef}
      />
      <View style={{ ...styles.container, columnGap: 15 }}>
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
            label="Precio de transporte"
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
    </Form>
  );
};
export default BookForm;
