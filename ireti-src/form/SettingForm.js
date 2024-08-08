import { memo, useEffect } from "react";
import Form from "../import/Form/Form";
import Input from "../import/Form/Input";
import { useDataField } from "../hook/form";

const SettingForm = memo(({ model, onSave }) => {
  const [key, setKey] = useDataField(model.key.value);
  const [value, setValue] = useDataField(model.value.value);

  //necesario para el reset del formulario
  useEffect(() => {
    setKey(model.key.value);
    setValue(model.value.value);
  }, [model, setKey, setValue]);

  const onFormSend = () => {
    const newModel = {
      ...model,
      key: { ...model.key, value: key },
      value: { ...model.value, value: value },
    };

    onSave(newModel);
  };

  return (
    <Form
      title="Configuración:"
      buttons={{
        save: {
          label: "Salvar",
          press: onFormSend,
          icon: "content-save",
        },
      }}
    >
      <Input
        label="Clave"
        icon="pencil"
        error={model.key.error}
        value={key}
        onChangeText={setKey}
        editable={false}
      />
      <Input
        label="Valor"
        icon="music-accidental-sharp"
        value={value}
        error={model.value.error}
        onChangeText={setValue}
      />
    </Form>
  );
});

export default SettingForm;
