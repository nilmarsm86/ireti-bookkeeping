import { memo } from "react";
import {
  Badge,
  DataTable,
  IconButton,
  Text,
  Tooltip,
} from "react-native-paper";

const TableRow = memo(({ data, metadata, buttons }) => {
  const itemValue = (name, value) => {
    return typeof name === "function" ? name(value) : name;
  };

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
        {metadata.map(
          (meta) =>
            meta.show && (
              <DataTable.Cell
                style={meta.style}
                key={meta.name + item[meta.name]}
                numeric={meta.numeric}
              >
                {meta.tooltip ? (
                  <Tooltip title={item[meta.name]} leaveTouchDelay={250}>
                    <Text>
                      {itemValue(item[meta.name], item[meta.value])}
                      {meta.badge && (
                        <Badge size={25}>{item[meta.badge]}</Badge>
                      )}
                    </Text>
                  </Tooltip>
                ) : (
                  <Text>
                    {itemValue(item[meta.name], item[meta.value])}
                    {meta.badge && <Badge size={25}>{item[meta.badge]}</Badge>}
                  </Text>
                )}
              </DataTable.Cell>
            )
        )}

        <DataTable.Cell
          numeric={true}
          style={{
            maxWidth: Object.entries(buttons).length * 42 + "px",
            width: "auto",
            minWidth: "auto",
          }}
        >
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
});

export default TableRow;
