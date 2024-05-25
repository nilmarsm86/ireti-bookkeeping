import { DataTable } from "react-native-paper";

const TableHeader = ({ metadata }) => (
  <DataTable.Header>
    {metadata.map((item) => {
      return (
        item.show && (
          <DataTable.Title
            key={item.name}
            numeric={item.numeric}
            sortDirection={item.sortDirection}
          >
            {item.title}
          </DataTable.Title>
        )
      );
    })}
    <DataTable.Title numeric={true}></DataTable.Title>
  </DataTable.Header>
);

export default TableHeader;
