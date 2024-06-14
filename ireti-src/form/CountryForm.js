import Form from "../component/Form/Form";
import Input from "../component/Form/Input";

const CountryForm = ({ model, changeModel, nameInputRef, onSave }) => (
  <Form
    title="Datos del país:"
    buttons={{
      save: {
        label: "Salvar",
        press: onSave,
        icon: "content-save",
      },
    }}
  >
    <Input
      label="Nombre"
      icon="pencil"
      error={model.name.error}
      value={model.name.value}
      onChangeText={(value) => {
        changeModel({
          ...model,
          name: { ...model.name, value: value },
        });
      }}
      reference={nameInputRef}
    />
  </Form>
);

export default CountryForm;
