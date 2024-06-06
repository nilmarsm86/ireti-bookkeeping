import Form from "../component/Form/Form";
import Input from "../component/Form/Input";
import Select from "../component/Form/Select";

const ProvinceForm = ({
  provinceAttr,
  error,
  nameInputRef,
  onSaveForm,
  countries,
}) => (
  <Form
    title="Datos de la provincia:"
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
      {...provinceAttr.name}
      reference={nameInputRef}
    />

    <Select
      label="Países"
      data={countries.map((item) => ({
        label: item.name,
        value: item.id,
      }))}
      error={error.country}
      {...provinceAttr.country}
    />
  </Form>
);

export default ProvinceForm;
