import { View } from "react-native";
import { Card } from "react-native-paper";

const PriceCard = ({ label, value, book }) => (
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

export default PriceCard;
