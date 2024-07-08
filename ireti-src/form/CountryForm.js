import { memo, useEffect } from "react";
import Form from "../import/Form/Form";
import Input from "../import/Form/Input";
import { useDataField } from "../hook/form";

const CountryForm = memo(({ model, nameInputRef, onSave }) => {
  const [name, setName] = useDataField(model.name.value);

  useEffect(() => {
    setName(model.name.value);
  }, [model, setName]);

  const onFormSend = () => {
    const newModel = {
      ...model,
      name: { ...model.name, value: name },
    };

    onSave(newModel);
  };

  return (
    <Form
      title="Datos del país:"
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
    </Form>
  );
});
export default CountryForm;
