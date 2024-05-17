import { useEffect, useState } from "react";
import { Card, DataTable } from "react-native-paper";
import TableHeader from "./TableHeader";
import TablePagination from "./TablePagination";
import TableRow from "./TableRow";

export default ({ metadata, data, buttons }) => {    
    const [page, setPage] = useState(0);
    const numberOfItemsPerPageList = [5, 10, 15, 20, 50, 100];
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, data.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <Card>
            <DataTable>
                <TableHeader metadata={metadata} />
                <TableRow data={data.slice(from, to)} metadata={metadata} buttons={buttons}/>
                <TablePagination
                    dataLength={data.length}
                    page={page}
                    setPage={setPage}
                    itemsPerPage={itemsPerPage}                    
                    label={(data.length) ? `del ${from + 1} al ${to}, total ${data.length}` : 'No se encontraron registros.'}
                    numberOfItemsPerPageList={numberOfItemsPerPageList}                    
                    onItemsPerPageChange={onItemsPerPageChange}
                />
            </DataTable>
        </Card>
    );
}
