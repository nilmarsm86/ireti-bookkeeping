import { DataTable, IconButton, Text } from "react-native-paper";

export default ({ data, metadata, onRowPress }) => {
    return data.length === 0 ?
        (<DataTable.Row>
            <DataTable.Cell style={{ alignItems: 'center', flexDirection: "column", justifyContent: 'center' }}>
                <Text>Cargando datos...</Text>
            </DataTable.Cell>
        </DataTable.Row>) :
        data.map((item) => (
            <DataTable.Row
                key={item['id']}
                
            >
                {metadata.map((meta) => {
                    return meta.show && (
                        <DataTable.Cell
                            key={meta.name + item[meta.name]}
                            numeric={meta.numeric}
                        >
                            {item[meta.name]}
                        </DataTable.Cell>
                    );
                })}
                <DataTable.Cell
                    numeric={true}
                >
                    <IconButton icon='delete' size={20} mode='contained' onPress={() => {}}/>
                    <IconButton icon='delete' size={20} mode='contained' onPress={() => {}} style={{backgroundColor:'red'}}/>
                </DataTable.Cell>                
            </DataTable.Row>
        ))

}
