import Form from "../component/Form/Form";
import Input from "../component/Form/Input";
import Select from "../component/Form/Select";

const ProvinceForm = ({
  model,
  changeModel,
  nameInputRef,
  onSave,
  countries,
}) => (
  <Form
    title="Datos de la provincia:"
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

    <Select
      label="Países"
      data={countries.map((item) => ({
        label: item.name,
        value: item.id,
      }))}
      error={model.country.error}
      value={model.country.value}
      onChangeText={(value) => {
        changeModel({
          ...model,
          country: { ...model.country, value: value },
        });
      }}
    />
  </Form>
);

export default ProvinceForm;
