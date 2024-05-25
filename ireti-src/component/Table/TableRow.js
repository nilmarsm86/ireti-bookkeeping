import { DataTable, IconButton, Text } from "react-native-paper";

const TableRow = ({ data, metadata, buttons }) => {
  return data.length === 0 ? (
    <DataTable.Row>
      <DataTable.Cell
        style={{
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Text>No se encontraron registros.</Text>
      </DataTable.Cell>
    </DataTable.Row>
  ) : (
    data.map((item) => (
      <DataTable.Row key={JSON.stringify(item)}>
        {metadata.map((meta) => {
          return (
            meta.show && (
              <DataTable.Cell
                key={meta.name + item[meta.name]}
                numeric={meta.numeric}
              >
                {item[meta.name]}
              </DataTable.Cell>
            )
          );
        })}
        <DataTable.Cell numeric={true}>
          {Object.entries(buttons).map(([key, value]) => (
            <IconButton
              key={key}
              icon={value.icon}
              size={20}
              mode={key === "delete" ? "contained" : "outlined"}
              onPress={() => value.press(item)}
              style={
                key === "delete"
                  ? { backgroundColor: "red", marginRight: 0 }
                  : { marginRight: 0 }
              }
              iconColor={key === "delete" ? "white" : "#49454f"}
            />
          ))}
        </DataTable.Cell>
      </DataTable.Row>
    ))
  );
};

export default TableRow;
