import dayjs from "dayjs";
import { useState } from "react";
import { SearchForm, TimeSetter, Table, TableItem, Pagination } from "./components";
import { ITEM_PER_PAGE } from "./constants/itemsPerPage";
import { useInput, useSort } from "./hooks";

export interface ItemOption {
  option_type: string;
  option_value: string;
  option_value2?: string;
  option_sub_type?: string;
  option_desc?: string;
}

export interface mabi_items {
  auction_price_per_unit: number;
  date_auction_expire: string;
  item_count: number;
  item_display_name: string;
  item_name: string;
  item_option: ItemOption[];
}

export default function App() {
  const [items, setItems] = useState<mabi_items[]>([]);
  const [now, setNow] = useState(dayjs());
  const { sortOrder, sortItems, handleSortOrderChange } = useSort(setItems);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 추가
  const [pageGroup, setPageGroup] = useState(0); // 현재 페이지 그룹 (10개씩)
  const filterInput = useInput('');

  const filteredItems = items.filter(item =>
    item.item_display_name.includes(filterInput.value) // 필터 적용
  );

  // 현재 페이지에 해당하는 아이템만 표시
  const indexOfLastItem = currentPage * ITEM_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEM_PER_PAGE;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / ITEM_PER_PAGE);
  const pagesPerGroup = 10; // 한 번에 표시할 페이지 번호 수
  const totalGroups = Math.ceil(totalPages / pagesPerGroup); // 페이지 그룹 수

  const currentGroupPages = Array.from(
    { length: Math.min(pagesPerGroup, totalPages - pageGroup * pagesPerGroup) },
    (_, index) => pageGroup * pagesPerGroup + index + 1
  );

  const handleNextGroup = () => {
    if (pageGroup < totalGroups - 1) {
      setPageGroup(pageGroup + 1);
      setCurrentPage(pageGroup * pagesPerGroup + 1);
    }
  };

  const handlePreviousGroup = () => {
    if (pageGroup > 0) {
      setPageGroup(pageGroup - 1);
      setCurrentPage((pageGroup - 1) * pagesPerGroup + 1);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber); // 해당 페이지로 이동
  };

  return (
    <>
      <SearchForm
        setCurrentPage={setCurrentPage}
        setPageGroup={setPageGroup}
        setItems={setItems}
        sortItems={sortItems}
        handleSortOrderChange={handleSortOrderChange}
        sortOrder={sortOrder}
        filterInput={filterInput}
      />

      {items.length > 0 && (
        <div>
          {/* 검색 결과가 있을 때만 현재 시간을 업데이트함 */}
          <TimeSetter setNow={setNow} />
          <Table>
            <TableItem
              items={currentItems}
              now={now}
            />
          </Table>

          {/* 페이지네이션 버튼 */}
          <Pagination
            handlePreviousGroup={handlePreviousGroup}
            pageGroup={pageGroup}
            currentGroupPages={currentGroupPages}
            handlePageChange={handlePageChange}
            handleNextGroup={handleNextGroup}
            currentPage={currentPage}
            totalGroups={totalGroups}
          />
        </div>
      )}
      <hr className="mt-10" />
      <div className="text-center p-10 text-gray-600">
        <p>Data based on NEXON Open API.</p>
        <p>created by <a href="https://github.com/Hira-Yuki" target="_blank" rel="noopener noreferrer">Yukihira.</a></p>
        <span>visit <a href="https://github.com/Hira-Yuki/mabi_ana" target="_blank" rel="noopener noreferrer" className="text-blue-600">github repository</a></span>
      </div>
    </>
  );
}
