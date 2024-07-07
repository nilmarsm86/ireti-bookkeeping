import { StyleSheet, View } from "react-native";
import { Button, Card, Dialog, Portal, Text } from "react-native-paper";

const OWNER_BENEFIT = 50;
const LITTLE_BOX_BENEFIT = 30;
const BENEFIT = 80; //% de ganancia (50% de ganancia vendedora y 30% para la caja chica)
//fondo de la libreria es el 20%?
const ONAT = 15; //%

function Info({ label, content }) {
  return (
    <View style={styles.view}>
      <Text variant="titleMedium" style={styles.label}>
        {label}:
      </Text>

      <Text variant="bodyMedium" style={styles.content}>
        {content}
      </Text>
    </View>
  );
}

function PriceCard({ label, value, book }) {
  return (
    <View style={{ flex: "auto", width: "20%", gap: 10 }}>
      <Card mode="elevated">
        <Card.Title
          subtitleStyle={
            book.amount.value > 0 ? { color: "green" } : { color: "red" }
          }
          title={String(label + ":").toUpperCase()}
          subtitle={"$ " + Number(value / 100).toFixed(2)}
        />
      </Card>
    </View>
  );
}

const BookDetail = ({ book, visible, setVisible }) => {
  console.log(book);
  /**
   * 15%
   * @returns
   */
  function getOnatBenefit(book) {
    return (ONAT * totalAcquisitionCost(book)) / 100;
  }

  /**
   * 80%
   * @returns
   */
  function getTotalBenefit(book) {
    return (BENEFIT * totalAcquisitionCost(book)) / 100;
  }

  function getOwnerBenefit(book) {
    return (OWNER_BENEFIT * totalAcquisitionCost(book)) / 100;
  }

  function getLittleBoxBenefit(book) {
    return (LITTLE_BOX_BENEFIT * totalAcquisitionCost(book)) / 100;
  }

  /**
   * de toda la sumatoria sacar el 80 %, sumarcelo a la sumatoria y ese es el precio de venta
   * @returns Number
   */
  function salePrice(book) {
    return (
      totalAcquisitionCost(book) + getTotalBenefit(book) + getOnatBenefit(book)
    );
  }

  /**
   * acquisitionPrice + transportPrice + marketingMegas + difficultPrice
   * @returns Number
   */
  function totalAcquisitionCost(book) {
    if (book.amount.value === 0) {
      return 0;
    }

    return (
      book.acquisition_price.value +
      book.transport_price.value +
      /*this.#megasToMoney()*/ 0 +
      book.difficult_price.value
    );
  }

  /**
   * TODO
   * @returns Number
   */
  function megasToMoney(book) {
    //TODO: definir como transformar los megas en dinero
    return book.marketing_megas.value;
  }

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={() => {}}
        style={{ width: "70%", marginLeft: "auto", marginRight: "auto" }}
      >
        <Dialog.Title>{book.title.value}</Dialog.Title>
        <Dialog.Content>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <PriceCard label="Vender" value={salePrice(book)} book={book} />

            <PriceCard
              label="Ganancia"
              value={getOwnerBenefit(book)}
              book={book}
            />

            <PriceCard label="onat" value={getOnatBenefit(book)} book={book} />

            <PriceCard
              label="caja"
              value={getLittleBoxBenefit(book)}
              book={book}
            />
          </View>

          <Card
            style={{ padding: 15, backgroundColor: "#fff" }}
            mode="contained"
          >
            <Card.Content>
              <Info label="Año de edición" content={book.editionYear.value} />
              <Info
                label="Número de edición"
                content={book.editionNumber.value}
              />
              <Info label="Cantidad" content={book.amount.value} />
              <Info
                label="Género literario"
                content={book.literarySubgenre.value}
              />
              <Info label="Editorial" content={book.publishing.value} />
              <Info
                label="Megas en marketing"
                content={book.marketingMegas.value}
              />
              <Info
                label="Precio de adquisición"
                content={"$ " + book.acquisitionPrice.value}
              />
              <Info
                label="Precio de transportación"
                content={"$ " + book.transportPrice.value}
              />
              <Info
                label="Precio por dificultad"
                content={"$ " + book.difficultPrice.value}
              />
              <View style={styles.view}>
                <View style={styles.label}>
                  <Text variant="titleMedium">Autores:</Text>
                </View>

                <View style={styles.content}>
                  {book.authors.value.map((author) => (
                    <Text variant="bodyMedium" key={author.id}>
                      {"- " + author.name}
                    </Text>
                  ))}
                </View>
              </View>
            </Card.Content>
          </Card>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => setVisible({ type: "HIDE_MODAL_DETAIL_AUTHOR" })}
          >
            Cerrar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: { width: "70%", marginLeft: "auto", marginRight: "auto" },
  view: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 10,
    columnGap: 15,
    marginTop: 10,
  },
  label: {
    flex: "auto",
    width: "35%",
    gap: 10,
  },
  content: {
    flex: "auto",
    width: "50%",
    gap: 10,
    textAlign: "left",
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});

export default BookDetail;
