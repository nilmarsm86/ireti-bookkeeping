import { useEffect } from "react";
import Form from "../component/Form/Form";
import Input from "../component/Form/Input";
import RadioGroup from "../component/Form/RadioGroup";
import Select from "../component/Form/Select";
import { useDataField } from "../hook/form";

const AuthorForm = ({
  model,
  nameInputRef,
  onSave,
  countries,
  provinces,
  onDismissModal,
  onSelectCountryChange,
}) => {
  const [name, setName] = useDataField(model.name.value);
  const [gender, setGender] = useDataField(model.gender.value);
  const [country, setCountry] = useDataField(model.country.value);
  const [province, setProvince] = useDataField(model.province.value);

  useEffect(() => {
    setName(model.name.value);
    setGender(model.gender.value);
    setCountry(model.country.value);
    setProvince(model.province.value);
  }, [model, setName, setGender, setCountry, setProvince]);

  const onFormSend = () => {
    const newModel = {
      ...model,
      name: { ...model.name, value: name },
      gender: { ...model.gender, value: gender },
      country: { ...model.country, value: country },
      province: { ...model.province, value: province },
    };

    onSave(newModel);
  };

  function mapped(data) {
    return data.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  const onCountryChange = (value) => {
    onSelectCountryChange(value);
    setCountry(value);
    setProvince("");
  };

  const sex = [
    { label: "Femenino", value: "f" },
    { label: "Masculino", value: "m" },
  ];

  return (
    <Form
      title="Datos del autor:"
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
        label="Nombre"
        icon="pencil"
        error={model.name.error}
        value={name}
        onChangeText={setName}
        reference={nameInputRef}
      />

      <RadioGroup
        label="Sexo"
        error={model.gender.error}
        value={gender}
        onChangeText={setGender}
        data={sex}
      />

      <Select
        label="Países"
        data={mapped(countries)}
        error={model.country.error}
        value={country}
        onChangeText={onCountryChange}
      />

      <Select
        label="Provincias"
        data={mapped(provinces)}
        disabled={mapped(provinces).length === 0 ? true : false}
        error={model.province.error}
        value={province}
        onChangeText={setProvince}
      />
    </Form>
  );
};
export default AuthorForm;
