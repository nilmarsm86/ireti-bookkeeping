import { memo, useEffect } from "react";
import Form from "../component/Form/Form";
import Input from "../component/Form/Input";
import { useDataField } from "../hook/form";

const PublishingForm = memo(({ model, nameInputRef, onSave }) => {
  const [name, setName] = useDataField(model.name.value);

  //necesario para el reset del formulario
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
      title="Datos de las editoriales:"
      buttons={{
        save: {
          label: "Salvar",
          press: onFormSend,
          icon: "content-save",
        },
        //delete: { label: 'Eliminar', icon: 'delete', press: () => console.log('eliminar') },
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

export default PublishingForm;
