interface PaginationPropsType {
  handlePreviousGroup: () => void;
  pageGroup: number;
  currentGroupPages: number[];
  handlePageChange: (pageNumber: number) => void;
  handleNextGroup: () => void;
  currentPage: number;
  totalGroups: number;
}

export default function Pagination({
  handlePreviousGroup,
  pageGroup,
  currentGroupPages,
  handlePageChange,
  handleNextGroup,
  currentPage,
  totalGroups }: PaginationPropsType) {

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      <button
        onClick={handlePreviousGroup}
        disabled={pageGroup === 0}
        className={`px-4 py-2 border rounded-md ${pageGroup === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      >
        이전
      </button>

      {currentGroupPages?.map((pageNumber: number) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`px-4 py-2 border rounded-md ${pageNumber === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={handleNextGroup}
        disabled={pageGroup >= totalGroups - 1}
        className={`px-4 py-2 border rounded-md ${pageGroup >= totalGroups - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
      >
        다음
      </button>
    </div>
  )
}
