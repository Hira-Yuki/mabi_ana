import { useState } from "react";
import { mabi_items } from "../App";

export default function useSort(
  setter: React.Dispatch<React.SetStateAction<mabi_items[]>>
) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // 정렬 순서 추가

  const sortItems = (itemsToSort: mabi_items[]) => {
    return itemsToSort.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.auction_price_per_unit - b.auction_price_per_unit;
      } else {
        return b.auction_price_per_unit - a.auction_price_per_unit;
      }
    });
  };

  const handleSortOrderChange = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setter((prevItems) => sortItems([...prevItems])); // 현재 items를 다시 정렬
  };

  return { sortOrder, sortItems, handleSortOrderChange };
}
