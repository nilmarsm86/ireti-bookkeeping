import Form from "../component/Form/Form";
import Input from "../component/Form/Input";

const LiterarySubgenreForm = ({
  genreAttr,
  error,
  nameInputRef,
  onSaveForm,
}) => (
  <Form
    title="Datos de los géneros literarios:"
    buttons={{
      save: {
        label: "Salvar",
        press: onSaveForm,
        icon: "content-save",
      },
      //delete: { label: 'Eliminar', icon: 'delete', press: () => console.log('eliminar') },
    }}
  >
    <Input
      label="Nombre"
      icon="pencil"
      error={error.name}
      {...genreAttr.name}
      reference={nameInputRef}
    />
    <Input
      label="Número"
      icon="music-accidental-sharp"
      value={genreAttr.num.value}
      error={error.num}
      onChangeText={genreAttr.num.onChangeText}
    />
  </Form>
);

export default LiterarySubgenreForm;
