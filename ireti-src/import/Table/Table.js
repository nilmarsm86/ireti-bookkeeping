import { memo, useEffect, useMemo, useState } from "react";
import { Card, DataTable } from "react-native-paper";
import TableHeader from "./TableHeader";
import TablePagination from "./TablePagination";
import TableRow from "./TableRow";
import TableFilter from "./TableFilter";

const Table = memo(({ metadata, data, buttons = {}, onSearch = () => {} }) => {
  const [filterData, setFilterData] = useState(data);
  const [page, setPage] = useState(0);
  const numberOfItemsPerPageList = [5, 10, 15, 20, 50, 100];
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, filterData.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    setFilterData([...data]);
  }, [data]);

  const paginateData = useMemo(
    () => filterData.slice(from, to),
    [from, to, filterData]
  );

  return (
    <>
      <TableFilter
        data={data}
        setFilterData={setFilterData}
        onSearch={onSearch}
      />
      <Card>
        <DataTable>
          <TableHeader metadata={metadata} buttons={buttons} />
          <TableRow data={paginateData} metadata={metadata} buttons={buttons} />
          <TablePagination
            dataLength={filterData.length}
            page={page}
            setPage={setPage}
            itemsPerPage={itemsPerPage}
            label={
              data.length
                ? `del ${from + 1} al ${to}, total ${filterData.length}`
                : "No se encontraron registros."
            }
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </DataTable>
      </Card>
    </>
  );
});

export default Table;
