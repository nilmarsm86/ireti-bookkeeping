import { memo, useState } from "react";
import { View } from "react-native";
import { Searchbar, SegmentedButtons, Text } from "react-native-paper";

const TableFilter = memo(({ data, setFilterData, onSearch }) => {
  const [actionButton, setActionButton] = useState("");
  const [search, setSearch] = useState("");

  const find = (value) => {
    if (value.length === 0) {
      setFilterData(data);
    } else {
      setFilterData(onSearch(value));
    }
    setSearch(value);
  };

  /*const wrapperActionButtons = (value) => {
    console.log(value);
    if (actionButton === "") {
      find("");
    }
    setActionButton(value);
  };*/

  return (
    <>
      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
        <SegmentedButtons
          value={actionButton}
          onValueChange={setActionButton}
          buttons={[
            {
              value: "search",
              icon: "text-search",
            },
            {
              value: "filter",
              icon: "filter",
            },
            {
              value: "",
              icon: "eye-off",
              disabled: search.length > 0,
            },
          ]}
          density="small"
        />
      </View>

      {actionButton === "search" && (
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
          <View style={{ flex: "auto" }}>
            <Text variant="titleMedium">Buscar:</Text>
          </View>
          <View style={{ flex: "auto" }}>
            <Searchbar
              value={search}
              onChangeText={find}
              placeholder="Search"
              inputStyle={{
                minHeight: 36,
              }}
              style={{ height: 36 }}
            />
          </View>
        </View>
      )}
    </>
  );
});

export default TableFilter;
