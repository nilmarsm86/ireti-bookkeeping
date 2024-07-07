import { memo } from "react";
import { DataTable } from "react-native-paper";

const TableHeader = memo(({ metadata, buttons }) => (
  <DataTable.Header>
    {metadata.map((item) => {
      return (
        item.show && (
          <DataTable.Title
            key={item.name}
            numeric={item.numeric}
            sortDirection={item.sortDirection}
            style={item.style}
          >
            {item.title}
          </DataTable.Title>
        )
      );
    })}
    <DataTable.Title
      numeric={true}
      style={{ maxWidth: Object.entries(buttons).length * 42 + "px" }}
    ></DataTable.Title>
  </DataTable.Header>
));

export default TableHeader;
