import { useEffect } from "react";
import Form from "../component/Form/Form";
import Input from "../component/Form/Input";
import Select from "../component/Form/Select";
import { useDataField } from "../hook/form";

const ProvinceForm = ({ model, nameInputRef, onSave, countries }) => {
  const [name, setName] = useDataField(model.name.value);
  const [country, setCountry] = useDataField(model.country.value);

  useEffect(() => {
    setName(model.name.value);
    setCountry(model.country.value);
  }, [model, setName, setCountry]);

  const onFormSend = () => {
    const newModel = {
      ...model,
      name: { ...model.name, value: name },
      country: { ...model.country, value: country },
    };

    onSave(newModel);
  };

  return (
    <Form
      title="Datos de la provincia:"
      buttons={{
        save: {
          label: "Salvar",
          press: onFormSend,
          icon: "content-save",
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

      <Select
        label="Países"
        data={countries.map((item) => ({
          label: item.name,
          value: item.id,
        }))}
        error={model.country.error}
        value={country}
        onChangeText={setCountry}
      />
    </Form>
  );
};
export default ProvinceForm;
