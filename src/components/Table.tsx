import { ReactNode } from "react";

interface TableProps {
  children: ReactNode; // children 타입 명시
}

export default function Table({ children }: TableProps) {
  return (
    <table className="table-auto border-collapse border border-gray-600 mt-8 w-full text-left">
      <thead className="bg-gray-200">
        <tr>
          <th className="border border-gray-300 px-4 py-2">아이템 이름</th>
          <th className="border border-gray-300 px-4 py-2">수량</th>
          <th className="border border-gray-300 px-4 py-2">남은 기간</th>
          <th className="border border-gray-300 px-4 py-2">가격</th>
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  )
}
