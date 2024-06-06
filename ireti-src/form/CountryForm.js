import Form from "../component/Form/Form";
import Input from "../component/Form/Input";

const CountryForm = ({ countryAttr, error, nameInputRef, onSaveForm }) => (
  <Form
    title="Datos del país:"
    buttons={{
      save: {
        label: "Salvar",
        press: onSaveForm,
        icon: "content-save",
      },
    }}
  >
    <Input
      label="Nombre"
      icon="pencil"
      error={error.name}
      {...countryAttr.name}
      reference={nameInputRef}
    />
  </Form>
);

export default CountryForm;
