import { DataTable } from "react-native-paper";

export default ({ data, metadata, onRowPress }) => {
    return data.length === 0 ?
        (<DataTable.Row><DataTable.Cell>Cargando datos...</DataTable.Cell></DataTable.Row>) :
        data.map((item) => (
            <DataTable.Row
                key={item[metadata[0]['name']]}
                onPress={onRowPress}
            >
                {metadata.map((meta) => {
                    return meta.show && (
                        <DataTable.Cell
                            key={item[meta.name]}
                            numeric={meta.numeric}
                        >
                            {item[meta.name]}
                        </DataTable.Cell>
                    );
                })}
            </DataTable.Row>
        ))

}
