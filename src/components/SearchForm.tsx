import { useState } from "react";
import { AUCTION_CATEGORY } from "../constants/category";
import { useInput } from "../hooks";
import { toast } from "react-toastify";
import { auctionAPI } from "../lib/auction";
import { mabi_items } from "../App";

interface SearchFormProps {
  handleSortOrderChange: () => void;
  sortOrder: 'asc' | 'desc';
  sortItems: (itemsToSort: mabi_items[]) => mabi_items[];
  setItems: (items: mabi_items[]) => void;
  setCurrentPage: (value: number) => void;
  setPageGroup: (value: number) => void;
  filterInput: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; };
}

export default function SearchForm({
  handleSortOrderChange,
  sortOrder,
  sortItems,
  setItems,
  setCurrentPage,
  setPageGroup,
  filterInput
}: SearchFormProps) {
  const itemNameInput = useInput('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (itemNameInput.value === '' && selectedCategory === '') {
      toast.warn('카테고리 또는 아이템 이름을 입력하세요.');
      return;
    }
    try {
      let query = `?`;
      if (selectedCategory !== '') {
        query += `auction_item_category=${selectedCategory}&`;
      }
      if (itemNameInput.value !== '') {
        query += `item_name=${itemNameInput.value}&`;
      }
      const { data } = await auctionAPI.search(query);

      const sortedItems = sortItems(data.auction_item); // 검색된 결과 정렬
      setItems(sortedItems);
      setCurrentPage(1); // 새로운 검색 결과가 나왔을 때 페이지를 초기화
      setPageGroup(0); // 페이지 그룹 초기화
      toast.success("데이터 검색 성공!!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.data.error.message);
      setItems([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h1 className="font-bold text-3xl mb-6 text-center">경매장 물품 검색기</h1>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <label htmlFor="category" className="mr-4 font-medium">카테고리: </label>
          <select
            name="category"
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>전체 카테고리</option>
            {AUCTION_CATEGORY?.map((category, index) => (
              <option key={index} value={category}>{category === "" ? "--" : category}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleSortOrderChange}
            className="ml-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            가격순 {sortOrder === 'asc' ? '오름차순' : '내림차순'}
          </button>
        </div>

        <div className="flex items-center">
          <label htmlFor="itemName" className="mr-4 font-medium">아이템 이름: </label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={itemNameInput.value}
            onChange={itemNameInput.onChange}
            placeholder="아이템 이름"
            className="p-2 border border-gray-300 rounded-md flex-1"
          />
        </div>
        {/* 필터 입력 필드 */}
        <div className="my-4">
          <label htmlFor="itemName" className="mr-4 font-medium">검색 필터: </label>
          <input
            type="text"
            value={filterInput.value}
            onChange={filterInput.onChange}
            placeholder="포함된 아이템만 보기"
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            검색
          </button>

        </div>
      </div>
    </form>
  )
}
