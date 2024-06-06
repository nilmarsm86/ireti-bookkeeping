import Form from "../component/Form/Form";
import Input from "../component/Form/Input";
import RadioGroup from "../component/Form/RadioGroup";
import Select from "../component/Form/Select";

const AuthorForm = ({
  authorAttr,
  error,
  nameInputRef,
  onSaveForm,
  sex,
  countries,
  provinces,
  findProvinces,
  disabledProvinces,
}) => (
  <Form
    title="Datos del autor:"
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
      {...authorAttr.name}
      reference={nameInputRef}
    />

    <RadioGroup
      label="Sexo"
      error={error.gender}
      {...authorAttr.gender}
      data={sex}
    />

    <Select
      label="Países"
      data={countries.map((item) => ({
        label: item.name,
        value: item.id,
      }))}
      error={error.country}
      {...authorAttr.country}
      onChangeText={findProvinces}
    />
    <Select
      label="Provincias"
      data={provinces.map((item) => ({
        label: item.name,
        value: item.id,
      }))}
      disabled={disabledProvinces}
      error={error.province}
      {...authorAttr.province}
    />
  </Form>
);

export default AuthorForm;
