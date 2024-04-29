import { DataTable } from "react-native-paper";

export default ({ metadata }) => (
    <DataTable.Header>
        {metadata.map((item) => {
            return item.show && (
                <DataTable.Title
                    key={item.name}
                    numeric={item.numeric}
                    sortDirection={item.sortDirection}
                >
                    {item.title}
                </DataTable.Title>
            );
        })}
    </DataTable.Header>
);