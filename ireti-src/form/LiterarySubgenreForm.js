import { memo, useEffect } from "react";
import Form from "../import/Form/Form";
import Input from "../import/Form/Input";
import { useDataField } from "../hook/form";

const LiterarySubgenreForm = memo(({ model, nameInputRef, onSave }) => {
  const [name, setName] = useDataField(model.name.value);
  const [num, setNum] = useDataField(model.num.value);

  //necesario para el reset del formulario
  useEffect(() => {
    setName(model.name.value);
    setNum(model.num.value);
  }, [model, setName, setNum]);

  const onFormSend = () => {
    const newModel = {
      ...model,
      name: { ...model.name, value: name },
      num: { ...model.num, value: num },
    };

    onSave(newModel);
  };

  return (
    <Form
      title="Datos de los géneros literarios:"
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
      <Input
        label="Número"
        icon="music-accidental-sharp"
        value={num}
        error={model.num.error}
        onChangeText={setNum}
      />
    </Form>
  );
});

export default LiterarySubgenreForm;
