import { useEffect, useState } from "react";
import { Card, DataTable } from "react-native-paper";
import TableHeader from "./TableHeader";
import TablePagination from "./TablePagination";
import TableRow from "./TableRow";

export default ({ metadata, data, onRowPress }) => {
    const [page, setPage] = useState(0);
    const numberOfItemsPerPageList = [2, 3, 4];
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
                <TableRow data={data.slice(from, to)} metadata={metadata} onRowPress={onRowPress}/>
                <TablePagination
                    dataLength={data.length}
                    page={page}
                    setPage={setPage}
                    itemsPerPage={itemsPerPage}                    
                    label={`del ${from + 1} al ${to}, total ${data.length}`}
                    numberOfItemsPerPageList={numberOfItemsPerPageList}                    
                    onItemsPerPageChange={onItemsPerPageChange}
                />
            </DataTable>
        </Card>
    );
}
