import { useState } from "react";
import { DataTable } from "react-native-paper";

export default ({ dataLength, page, setPage, itemsPerPage, label, numberOfItemsPerPageList, onItemsPerPageChange, selectPageDropdownLabel }) => {
    const [numberOfItemsPerPage] = useState(numberOfItemsPerPageList);

    return (
        <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(dataLength / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={label}
            numberOfItemsPerPageList={numberOfItemsPerPage}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={selectPageDropdownLabel ? selectPageDropdownLabel : 'Registros por página'} />
    );
}
