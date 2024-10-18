import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import ModalComponents from "./ModalComponents";

interface ItemOption {
  option_type: string;
  option_value: string;
  option_value2?: string;
  option_sub_type?: string;
  option_desc?: string;
}

interface Item {
  item_display_name: string;
  item_count: number;
  auction_price_per_unit: number;
  date_auction_expire: string;
  item_option: ItemOption[];
}

interface TableItemProps {
  items: Item[];   // Item 배열
  now: Dayjs;      // 현재 시간 (dayjs 객체)
}

export default function TableItem({ items, now }: TableItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ItemOption[]>([]);

  const openModal = (contents: ItemOption[]) => {
    setIsOpen(true)
    setModalContent(contents)
  }

  const getTimeRemaining = (expireDate: string) => {
    const expireTime = dayjs(expireDate);
    const diff = expireTime.diff(now);

    if (diff <= 0) {
      return '만료됨';
    }

    const days = expireTime.diff(now, 'day');
    const hours = expireTime.diff(now, 'hour') % 24;
    const minutes = expireTime.diff(now, 'minute') % 60;
    const seconds = expireTime.diff(now, 'second') % 60;

    if (days > 0 && hours > 0) return `${days}일 ${hours}시간`;
    if (days > 0) return `${days}일`;
    if (hours > 0) return `${hours}시간 ${minutes}분`;
    if (minutes > 0) return `${minutes}분 ${seconds}초`;
    return `${seconds}초`;
  };

  return (
    <>
      {items.map((item, index) => (
        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} >
          <td className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={() => openModal(item.item_option)}>{item.item_display_name}</td>
          <td className="border border-gray-300 px-4 py-2">{item.item_count}</td>
          <td className="border border-gray-300 px-4 py-2">
            {getTimeRemaining(item.date_auction_expire)}
          </td>
          <td className="border border-gray-300 px-4 py-2">
            <p>{item.auction_price_per_unit.toLocaleString() + ' 골드'}</p>
            {item.item_count > 1 && (
              <p className="text-sm text-gray-500">
                총: {(item.auction_price_per_unit * item.item_count).toLocaleString()} 골드
              </p>
            )}
          </td>
        </tr>
      ))}
      <ModalComponents isOpen={isOpen} modalContents={modalContent} close={() => setIsOpen(false)} />
    </>
  )
}
