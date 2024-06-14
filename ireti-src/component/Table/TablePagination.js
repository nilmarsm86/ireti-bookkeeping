import { DataTable } from "react-native-paper";

const TablePagination = ({
  dataLength,
  page,
  setPage,
  itemsPerPage,
  label,
  numberOfItemsPerPageList,
  onItemsPerPageChange,
  selectPageDropdownLabel,
}) => (
  <DataTable.Pagination
    page={page}
    numberOfPages={Math.ceil(dataLength / itemsPerPage)}
    onPageChange={(page) => setPage(page)}
    label={label}
    numberOfItemsPerPageList={numberOfItemsPerPageList}
    numberOfItemsPerPage={itemsPerPage}
    onItemsPerPageChange={onItemsPerPageChange}
    showFastPaginationControls
    selectPageDropdownLabel={
      selectPageDropdownLabel ? selectPageDropdownLabel : "Registros por página"
    }
  />
);

export default TablePagination;
